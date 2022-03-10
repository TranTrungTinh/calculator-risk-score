export const setDefaultPatientBodyFat = (patientInfo) => {
  const PatientInfo = {}
  PatientInfo.lastName = patientInfo.aFullName

  const relatedFactors = {}
  relatedFactors.age = patientInfo.aAge
  relatedFactors.sex = patientInfo.aGender
  relatedFactors.weight = patientInfo.aWeight
  relatedFactors.height = patientInfo.aHeight
  relatedFactors.neck = patientInfo.aNeck
  relatedFactors.waist = patientInfo.aWaist
  relatedFactors.hip = patientInfo.aHip
  PatientInfo.relatedFactors = relatedFactors

  return PatientInfo
}

/* getRecommendBodyFatByAge (FRS)
  * @params
  * @returns {[male, female]} // [0] mean male, [1] female
*/
const getRecommendBodyFatByAge = (age) => {
  if (age > 0 /* 17 */ && age < 22) {
    return [22, 33]
  }
  if (age > 21 && age <= 30) {
    return [23, 34]
  }
  if (age > 30 && age <= 40) {
    return [24, 35]
  }
  if (age > 40) {
    return [26, 36]
  }
}

export const computeBodyFatEstimated = ({ relatedFactors: patientInfo }) => {
  let predictSum = 0
  const isFemale = patientInfo.sex === 'female'
  if (!isFemale) {
    predictSum = (1.0324 - 0.19077 * Math.log10(patientInfo.waist - patientInfo.neck) + 0.15456 * Math.log10(patientInfo.height))
  } else {
    predictSum = (1.29579 - 0.35004 * Math.log10(patientInfo.waist + patientInfo.hip - patientInfo.neck) + 0.22100 * Math.log10(patientInfo.height))
  }
  // * Estimate
  const estimateScore = (495 / predictSum) - 450
  const riskEstimate = estimateScore.toFixed(0)
  const thresHold = getRecommendBodyFatByAge(patientInfo.age)?.[Number(isFemale)]
  return {
    riskEstimate,
    gauge: {
      thresHold,
      maxGauge: thresHold * 2
    },
    range: {
      text: riskEstimate > thresHold ? 'Bad' : 'Good',
      class: riskEstimate > thresHold ? 'red' : 'green'
    },
    patient: {
      age: {
        value: patientInfo.age,
        className: parseAgeType(patientInfo.age)
      },
      weight: {
        value: patientInfo.weight,
        className: 'progress-green'
      },
      height: {
        value: patientInfo.height,
        className: 'progress-green'
      },
      neck: {
        value: patientInfo.neck,
        className: 'progress-green'
      },
      waist: {
        value: patientInfo.waist,
        className: 'progress-green'
      },
      hip: {
        value: patientInfo.hip,
        className: 'progress-green'
      }
    }
  }
}

const parseAgeType = (number, prefix = 'progress') => {
  if (number < 40) { return `${prefix}-green` }
  if (number >= 40 && number <= 60) { return `${prefix}-orange` }
  if (number > 60) { return `${prefix}-red` }
}

export const computeFFMIEstimated = ({ relatedFactors: patientInfo }) => {
  const parseRange = (number) => {
    if (number < 18) { return { text: 'Below average', class: 'red' } }
    if (number >= 18 && number < 20) { return { text: 'Average', class: 'yellow' } }
    if (number >= 20 && number < 22) { return { text: 'Above average', class: 'orange' } }
    if (number >= 22 && number <= 23) { return { text: 'Excellent', class: 'green' } }
    if (number > 23 && number <= 26) { return { text: 'Superior', class: 'blue' } }
    if (number > 26 && number <= 28) { return { text: 'Suspicion of steroid use', class: 'bronze' } }
    if (number > 28) { return { text: 'Steroid usage likely', class: 'brow' } }
  }
  const { riskEstimate: bodyFat } = computeBodyFatEstimated({ relatedFactors: patientInfo })
  const fatFreeMass = patientInfo.weight * (1 - (bodyFat / 100))
  const ffmi = fatFreeMass / ((patientInfo.height / 100) ** 2)
  const riskEstimate = ffmi.toFixed(0)

  return {
    riskEstimate,
    range: parseRange(riskEstimate),
    patient: {
      age: {
        value: patientInfo.age,
        className: parseAgeType(patientInfo.age)
      },
      weight: {
        value: patientInfo.weight,
        className: 'progress-green'
      },
      height: {
        value: patientInfo.height,
        className: 'progress-green'
      },
      neck: {
        value: patientInfo.neck,
        className: 'progress-green'
      },
      waist: {
        value: patientInfo.waist,
        className: 'progress-green'
      },
      hip: {
        value: patientInfo.hip,
        className: 'progress-green'
      }
    }
  }
}

export const missingFieldsBodyFat = (patientInfo) => {
  const needInput = []
  const isFemale = patientInfo.sex === 'female'

  if (patientInfo.relatedFactors.weight === undefined) {
    needInput.push({
      code: 'weight',
      text: 'Thiếu thông tin Cân nặng'
    })
  }
  if (patientInfo.relatedFactors.height === undefined) {
    needInput.push({
      code: 'height',
      text: 'Thiếu thông tin Chiều cao'
    })
  }
  if (patientInfo.relatedFactors.neck === undefined) {
    needInput.push({
      code: 'neck',
      text: 'Thiếu thông tin Vòng cổ'
    })
  }
  if (patientInfo.relatedFactors.waist === undefined) {
    needInput.push({
      code: 'waist',
      text: 'Thiếu thông tin Vòng eo'
    })
  }
  if (isFemale && patientInfo.relatedFactors.hip === undefined) {
    needInput.push({
      code: 'hip',
      text: 'Thiếu thông tin Vòng hông'
    })
  }
  return needInput
}
