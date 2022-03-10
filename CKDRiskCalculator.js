export const setDefaultPatientCKD = (patientInfo) => {
  const PatientInfo = {}
  PatientInfo.lastName = patientInfo.aFullName

  const relatedFactors = {}
  relatedFactors.age = patientInfo.aAge
  relatedFactors.sex = patientInfo.aGender
  relatedFactors.anemia = patientInfo.aAnemia
  relatedFactors.diabetic = patientInfo.aDiabetesStatus
  relatedFactors.cardioVascularDisease = patientInfo.aCvd
  relatedFactors.treatedForHypertension = patientInfo.aTreatmentHypertensionStatus
  relatedFactors.congestiveHeartFailure = patientInfo.aCongestiveHeartFailure
  relatedFactors.peripheralVascularDisease = patientInfo.aPeripheralVascularDisease
  relatedFactors.albuminuria = patientInfo.aAlbuminuria
  PatientInfo.relatedFactors = relatedFactors
  return PatientInfo
}

const getCoefficientByAge = (age) => {
  if (age >= 20 && age < 50) { return 0 }
  if (age >= 50 && age < 60) { return 1.55 }
  if (age >= 60 && age < 70) { return 2.31 }
  if (age > 70) { return 3.23 }
}

export const computeCKDEstimated = ({ relatedFactors: patientInfo }) => {
  const parseRange = (number) => {
    if (number < 15.4) { return { text: 'Low', class: 'green' } }
    if (number >= 15.4) { return { text: 'High', class: 'red' } }
  }

  const parseAgeType = (number, prefix = 'progress') => {
    if (number < 40) { return `${prefix}-green` }
    if (number >= 40 && number <= 60) { return `${prefix}-orange` }
    if (number > 60) { return `${prefix}-red` }
  }

  const parseActive = value => value ? 'progress-red' : 'progress-green'

  const ageCoefficient = getCoefficientByAge(patientInfo.age)
  const isFemale = patientInfo.sex === 'female'
  const predictSum = -5.4 + (ageCoefficient) +
    (0.29 * Number(isFemale)) +
    (0.93 * Number(patientInfo.anemia)) +
    (0.45 * Number(patientInfo.treatedForHypertension)) +
    (0.44 * Number(patientInfo.diabetic)) +
    (0.59 * Number(patientInfo.cardioVascularDisease)) +
    (0.45 * Number(patientInfo.congestiveHeartFailure)) +
    (0.74 * Number(patientInfo.peripheralVascularDisease)) +
    (0.83 * Number(patientInfo.albuminuria))
  // * Risk estimate
  const riskScore = 1 - (1 / (1 + Math.exp(predictSum)))
  const riskEstimate = Math.round((riskScore * 100) * 100) / 100
  return {
    riskEstimate,
    range: parseRange(riskEstimate),
    patient: {
      age: {
        value: patientInfo.age,
        className: parseAgeType(patientInfo.age)
      },
      gender: {
        value: patientInfo.sex,
        className: patientInfo.sex === 'male' ? 'progress-red' : 'progress-green'
      },
      anemia: {
        value: patientInfo.anemia,
        className: parseActive(patientInfo.anemia)
      },
      diabetic: {
        value: patientInfo.diabetic,
        className: parseActive(patientInfo.diabetic)
      },
      cardioVascularDisease: {
        value: patientInfo.cardioVascularDisease,
        className: parseActive(patientInfo.cardioVascularDisease)
      },
      treatedForHypertension: {
        value: patientInfo.treatedForHypertension,
        className: parseActive(patientInfo.treatedForHypertension)
      },
      congestiveHeartFailure: {
        value: patientInfo.congestiveHeartFailure,
        className: parseActive(patientInfo.congestiveHeartFailure)
      },
      peripheralVascularDisease: {
        value: patientInfo.peripheralVascularDisease,
        className: parseActive(patientInfo.peripheralVascularDisease)
      },
      albuminuria: {
        value: patientInfo.albuminuria,
        className: parseActive(patientInfo.albuminuria)
      }
    }
  }
}

const isValidAge = (currentVal, min = 20, max = 200) => {
  if (!isNaN(currentVal) && currentVal !== undefined && currentVal >= min && currentVal <= max) {
    return true
  }
  return false
}
const getRangeAge = (currentVal) => {
  return (isNaN(currentVal) || currentVal === undefined || currentVal < 20) ? 20 : 200
}
/**
   * Checks for missing user information to calculate a risk score and displays
   * an appropriate message containing missing fields
   * @returns {*} Message containing missing information to calculate a valid risk score
   */
export const missingFieldsCKD = (patientInfo) => {
  const needInput = []
  if (!isValidAge(patientInfo.relatedFactors.age, 20, 200)) {
    needInput.push({
      code: 'formAge',
      text: 'Tuổi phải từ 20 trở lên',
      currentValue: patientInfo.relatedFactors.age,
      rangeValue: getRangeAge(patientInfo.relatedFactors.age)
    })
  }

  if (patientInfo.relatedFactors.sex === undefined) {
    needInput.push({
      code: 'formSex',
      text: 'Thiếu thông tin giới tính'
    })
  }

  if (patientInfo.relatedFactors.anemia === undefined) {
    needInput.push({
      code: 'anemia',
      text: 'Thiếu thông tin tình trạng thiếu máu'
    })
  }

  if (patientInfo.relatedFactors.diabetic === undefined) {
    needInput.push({
      code: 'diabetic',
      text: 'Thiếu thông tin Tiền sử mắc bệnh tiểu đường'
    })
  }

  if (patientInfo.relatedFactors.cardioVascularDisease === undefined) {
    needInput.push({
      code: 'formCardioVascularDisease',
      text: 'Thiếu thông tin tình trạng bệnh về tim mạch'
    })
  }

  if (patientInfo.relatedFactors.treatedForHypertension === undefined) {
    needInput.push({
      code: 'formCardioVascularDisease',
      text: 'Thiếu thông tin tình trạng huyết áp'
    })
  }

  if (patientInfo.relatedFactors.congestiveHeartFailure === undefined) {
    needInput.push({
      code: 'congestiveHeartFailure',
      text: 'Thiếu thông tin tình trạng suy tim sung huyết'
    })
  }

  if (patientInfo.relatedFactors.peripheralVascularDisease === undefined) {
    needInput.push({
      code: 'peripheralVascularDisease',
      text: 'Thiếu thông tin tình trạng bệnh lý gây ra do hẹp tắc lòng động mạch'
    })
  }

  if (patientInfo.relatedFactors.albuminuria === undefined) {
    needInput.push({
      code: 'albuminuria',
      text: 'Thiếu thông tin Protein niệu'
    })
  }

  return needInput
}
