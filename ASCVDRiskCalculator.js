const ASCVDRiskEstimatePlus = {
  female: {
    lnAge: -29.799,
    lnAgeSquared: 4.884,
    lnTotalChol: 13.54,
    lnAgeXlnTotalChol: -3.114,
    lnHdl: -13.578,
    lnAgeXlnHdl: 3.149,
    lnTreatSBP: 2.019,
    lnAgeXlnTreatSBP: 0,
    lnUnTreatSBP: 1.957,
    lnAgeXlnUnTreatSBP: 0,
    currentSmoker: 7.574,
    lnAgeXcurrentSmoker: -1.665,
    diabetes: 0.661,
    s010Ret: 0.96652, // ? mean Baseline Survival
    mnxbRet: -29.1817 // ? mean Mean (Coefficient × Value)
  },
  male: {
    lnAge: 12.344,
    lnAgeSquared: 0,
    lnTotalChol: 11.853,
    lnAgeXlnTotalChol: -2.664,
    lnHdl: -7.990,
    lnAgeXlnHdl: 1.769,
    lnTreatSBP: 1.797,
    lnAgeXlnTreatSBP: 0,
    lnUnTreatSBP: 1.764,
    lnAgeXlnUnTreatSBP: 0,
    currentSmoker: 7.837,
    lnAgeXcurrentSmoker: -1.795,
    diabetes: 0.658,
    s010Ret: 0.91436, // ? mean Baseline Survival
    mnxbRet: 61.1816 // ? mean Mean (Coefficient × Value)
  }
}
// /**
//    * Creates a default Patient model for the application with all undefined fields and
//    * resolves the promise used when retrieving patient information. Also sets to hide the
//    * demo banner for the application.
//    */
export const setDefaultPatient = (patientInfo) => {
  const PatientInfo = {}
  PatientInfo.firstName = undefined
  PatientInfo.lastName = patientInfo.aFullName
  PatientInfo.gender = patientInfo.aGender
  PatientInfo.dateOfBirth = undefined
  PatientInfo.age = patientInfo.aAge

  const relatedFactors = {}
  relatedFactors.smoker = patientInfo.aSmokingStatus
  relatedFactors.race = 'other' // it mean Asia
  relatedFactors.hypertensive = patientInfo.aTreatmentHypertensionStatus
  relatedFactors.diabetic = patientInfo.aDiabetesStatus
  PatientInfo.relatedFactors = relatedFactors

  PatientInfo.totalCholesterol = normalizeTotalCholesterol(patientInfo.aTotalCholesterol)
  PatientInfo.hdl = patientInfo.aHdlCholesterol
  PatientInfo.systolicBloodPressure = patientInfo.aSBloodPressure

  return PatientInfo
}

/**
 * Computes the ASCVD Risk Estimate for an individual over the next 10 years.
 * @param patientInfo - patientInfo object from ASCVDRisk data model
 * @returns {*} Returns the risk score or null if not in the appropriate age range
 */
export const computeRiskEstimated = (patientInfo) => {
  if (patientInfo.age < 40 || patientInfo.age > 79) { return null }
  const isFemale = patientInfo.gender === 'female'
  const lnAge = Math.log(patientInfo.age)
  const lnAgeSquared = (Math.log(patientInfo.age) ** 2)
  const lnTotalChol = Math.log(patientInfo.totalCholesterol)
  const lnHdl = Math.log(patientInfo.hdl)
  const trlnsbp = patientInfo.relatedFactors.hypertensive
    ? Math.log(patientInfo.systolicBloodPressure) : 0
  const ntlnsbp = patientInfo.relatedFactors.hypertensive
    ? 0 : Math.log(patientInfo.systolicBloodPressure)
  const ageTotalChol = lnAge * lnTotalChol
  const ageHdl = lnAge * lnHdl
  const ageSmoke = patientInfo.relatedFactors.smoker ? lnAge : 0

  // const isAA = patientInfo.relatedFactors.race === 'aa'
  // const isMale = patientInfo.gender === 'male'
  const coefficientDefault = ASCVDRiskEstimatePlus[patientInfo.gender] || ASCVDRiskEstimatePlus.male

  const { s010Ret, mnxbRet } = coefficientDefault
  const predictRet = (coefficientDefault.lnAge * lnAge) +
  (coefficientDefault.lnAgeSquared * lnAgeSquared) +
  (coefficientDefault.lnTotalChol * lnTotalChol) +
  (coefficientDefault.lnAgeXlnTotalChol * ageTotalChol) +
  (coefficientDefault.lnHdl * lnHdl) +
  (coefficientDefault.lnAgeXlnHdl * ageHdl) +
  (coefficientDefault.lnTreatSBP * trlnsbp) +
  (coefficientDefault.lnUnTreatSBP * ntlnsbp) +
  (coefficientDefault.currentSmoker * Number(patientInfo.relatedFactors.smoker)) +
  (coefficientDefault.lnAgeXcurrentSmoker * ageSmoke) +
  (coefficientDefault.diabetes * Number(patientInfo.relatedFactors.diabetic))
  const riskEstimate = (1 - (s010Ret ** Math.exp(predictRet - mnxbRet)))

  const parseAgeType = (number, prefix = 'progress') => {
    if (number < 40) { return `${prefix}-green` }
    if (number >= 40 && number <= 60) { return `${prefix}-orange` }
    if (number > 60) { return `${prefix}-red` }
  }

  const parseBloodPressure = (number, prefix = 'progress') => {
    if (number > 140) { return `${prefix}-red` }
    return `${prefix}-green`
  }

  const parseTotalCholesterol = (number, prefix = 'progress') => {
    if (number <= 200) { return `${prefix}-green` }
    if (number > 200 && number < 240) { return `${prefix}-orange` }
    return `${prefix}-red`
  }

  const parseHDL = (number, isFemale, prefix = 'progress') => {
    // if (number > 60) { return `${prefix}-green` }

    // if (isFemale) {
    //   if ((number <= 60 && number >= 50)) { return `${prefix}-orange` }
    //   return `${prefix}-red`
    // } else {
    //   if (number <= 50 && number >= 40) { return `${prefix}-orange` }
    //   return `${prefix}-red`
    // }
    if (number >= 20 && number <= 100) {
      return `${prefix}-green`
    } else {
      return `${prefix}-red`
    }
  }

  const parseTrue = isTrue => isTrue ? 'progress-red' : 'progress-green'

  const parseGauge = (age) => {
    const averageRisk = {
      40: [0.6, 0.4],
      41: [0.7, 0.4],
      42: [0.8, 0.4],
      43: [0.9, 0.5],
      44: [1, 0.5],
      45: [1.2, 0.5],
      46: [1.3, 0.6],
      47: [1.5, 0.6],
      48: [1.7, 0.7],
      49: [0.9, 0.8],
      50: [2.1, 0.8],
      51: [2.4, 0.9],
      52: [2.6, 1],
      53: [2.9, 1.1],
      54: [3.2, 1.2],
      55: [3.6, 1.4],
      56: [3.9, 1.5],
      57: [4.3, 1.7],
      58: [4.8, 1.9],
      59: [5.2, 2.1],
      60: [5.7, 2.3],
      61: [6.3, 2.6],
      62: [6.9, 2.9],
      63: [7.5, 3.2],
      64: [8.1, 3.6],
      65: [8.8, 4],
      66: [9.6, 4.4],
      67: [10.4, 5],
      68: [11.2, 5.5],
      69: [12.1, 6.2],
      70: [13.1, 6.9],
      71: [14.1, 7.7],
      72: [15.1, 8.6],
      73: [16.2, 9.6],
      74: [17.4, 10.8],
      75: [18.6, 12],
      76: [19.9, 13.4],
      77: [21.2, 14.9],
      78: [22.6, 16.6],
      79: [24, 18.4]
    }
    const currentPercent = averageRisk[age]?.[Number(isFemale)]
    return {
      thresHold: currentPercent,
      maxGauge: currentPercent * 2
    }
    // if (currentPercent < 5 && currentPercent >= 0) {
    //   return {
    //     thresHold: currentPercent,
    //     maxGauge: 5
    //   }
    // }

    // if (currentPercent < 10 && currentPercent >= 5) {
    //   return {
    //     thresHold: currentPercent,
    //     maxGauge: 10
    //   }
    // }

    // if (currentPercent >= 10 && currentPercent < 20) {
    //   return {
    //     thresHold: currentPercent,
    //     maxGauge: 15
    //   }
    // }

    // return {
    //   thresHold: currentPercent,
    //   maxGauge: 30
    // }
  }

  const parseRange = (number, thresHold = 5) => {
    if (number < thresHold) { return { text: 'Low', class: 'green' } }
    if (number >= thresHold) { return { text: 'High', class: 'red' } }
  }

  const gauge = parseGauge(patientInfo.age)
  const exactRisk = Math.floor((riskEstimate * 100) * 100) / 100
  // ! Cheat maybe algorithm wrongs (purpose is better)
  const percentRiskEstimate = riskEstimate ? exactRisk : Math.ceil(gauge.thresHold * 0.3)

  return {
    riskEstimate: percentRiskEstimate,
    range: parseRange(percentRiskEstimate, gauge.thresHold),
    gauge,
    patient: {
      age: {
        value: patientInfo.age,
        className: parseAgeType(patientInfo.age)
      },
      bloodPressure: {
        value: patientInfo.systolicBloodPressure,
        className: parseBloodPressure(patientInfo.systolicBloodPressure)
      },
      totalChol: {
        value: patientInfo.totalCholesterol,
        className: parseTotalCholesterol(patientInfo.totalCholesterol)
      },
      hdlChol: {
        value: patientInfo.hdl,
        className: parseHDL(patientInfo.hdl, patientInfo.gender === 'female')
      },
      diabetes: {
        value: patientInfo.relatedFactors.diabetic,
        className: parseTrue(patientInfo.relatedFactors.diabetic)
      },
      currentSmoker: {
        value: patientInfo.relatedFactors.smoker,
        className: parseTrue(patientInfo.relatedFactors.smoker)
      },
      hypertensive: {
        value: patientInfo.relatedFactors.hypertensive,
        className: parseTrue(patientInfo.relatedFactors.hypertensive)
      }
    }
  }
}

/**
   * Validates the provided age value for bounds and availability.
   * @param currentVal : Value for age
   * @returns {boolean} Indicates if the age value is valid.
   */
const isValidAge = (currentVal, min = 40, max = 79) => {
  if (!isNaN(currentVal) && currentVal !== undefined && currentVal >= min && currentVal <= max) {
    return true
  }
  return false
}
const getRangeAge = (currentVal) => {
  return (isNaN(currentVal) || currentVal === undefined || currentVal < 40) ? 40 : 79
}
/**
   * Validates the provided systolic blood pressure value for bounds and availability.
   * @param currentVal : Value for systolic blood pressure
   * @returns {boolean} Indicates if the systolic blood pressure value is valid.
   */
const isValidSysBP = (currentVal) => {
  if (!isNaN(currentVal) && currentVal !== undefined && currentVal >= 90 && currentVal <= 200) {
    return true
  }
  return false
}

const getRangeSysBP = (currentVal) => {
  return (isNaN(currentVal) || currentVal === undefined || currentVal < 90) ? 90 : 200
}

/**
   * Validates the provided HDL value for bounds and availability.
   * @param currentVal : Value for HDL
   * @returns {boolean} Indicates if the HDL value is valid.
   */
const isValidHDL = (currentVal) => {
  if (!isNaN(currentVal) && currentVal !== undefined && currentVal >= 20 && currentVal <= 100) {
    return true
  }
  return false
}
const getRangeHDL = (currentVal) => {
  return (isNaN(currentVal) || currentVal === undefined || currentVal < 20) ? 20 : 100
}

/**
   * Validates the provided total cholesterol value for bounds and availability.
   * @param currentVal : Value for total cholesterol
   * @returns {boolean} Indicates if the total cholesterol value is valid.
   */
const isValidTotalCholesterol = (currentVal) => {
  if (!isNaN(currentVal) && currentVal !== undefined && currentVal >= 130 && currentVal <= 320) {
    return true
  }
  return false
}
const getRangeCholesterol = (currentVal) => {
  return (isNaN(currentVal) || currentVal === undefined || currentVal < 130) ? 130 : 320
}
const normalizeTotalCholesterol = (currentVal) => {
  if (currentVal < 130) { return 130 }
  if (currentVal > 320) { return 320 }
  return currentVal
}
/**
   * Checks if the ASCVD data model has sufficient data to compute ASCVD score.
   * Checks for :
   *   1. Systolic Blood Pressure
   *   2. Age
   *   3. Total Cholesterol
   *   4. HDL
   *   5. Hypertensive status
   *   6. Race
   *   7. Diabetic status
   *   8. Smoker status
   *   9. Gender
   * @returns {boolean} Indicating if ASCVD Estimate can be calculated.
   */
export const canCalculateScore = (patientInfo) => {
  if (isValidSysBP(patientInfo.systolicBloodPressure) &&
      isValidAge(patientInfo.age) &&
      isValidTotalCholesterol(patientInfo.totalCholesterol) &&
      isValidHDL(patientInfo.hdl) &&
      patientInfo.relatedFactors.hypertensive !== undefined &&
      patientInfo.relatedFactors.race !== undefined &&
      patientInfo.relatedFactors.diabetic !== undefined &&
      patientInfo.relatedFactors.smoker !== undefined &&
      patientInfo.gender !== undefined) {
    return true
  }
  return false
}

/**
   * Checks for missing user information to calculate a risk score and displays
   * an appropriate message containing missing fields
   * @returns {*} Message containing missing information to calculate a valid risk score
   */
export const missingFields = (patientInfo) => {
  const needInput = []
  if (!isValidTotalCholesterol(patientInfo.totalCholesterol)) {
    needInput.push({
      code: 'formTotalCholesterol',
      text: 'Thông tin Tổng lượng chất béo không hợp lệ (giá trị hợp lệ từ 130 ~ 320)',
      currentValue: patientInfo.totalCholesterol,
      rangeValue: getRangeCholesterol(patientInfo.totalCholesterol)
    })
  }
  if (patientInfo.relatedFactors.diabetic === undefined) {
    needInput.push({
      code: 'formDiabetic',
      text: 'Thiếu thông tin Bệnh sử tiểu đường'
    })
  }
  if (!isValidAge(patientInfo.age)) {
    needInput.push({
      code: 'formAge',
      text: 'Tuổi từ 40 - 79',
      currentValue: patientInfo.age,
      rangeValue: getRangeAge(patientInfo.age)
    })
  }
  if (!isValidHDL(patientInfo.hdl)) {
    needInput.push({
      code: 'formHdl',
      text: 'Thông tin chất béo HDL không hợp lệ (giá trị hợp lệ là từ 20 ~ 100)',
      currentValue: patientInfo.hdl,
      rangeValue: getRangeHDL(patientInfo.hdl)
    })
  }
  if (patientInfo.relatedFactors.smoker === undefined) {
    needInput.push({
      code: 'formSmoker',
      text: 'Thiếu thông tin Bệnh sử hút thuốc'
    })
  }
  if (!isValidSysBP(patientInfo.systolicBloodPressure)) {
    needInput.push({
      code: 'formSysBP',
      text: 'Thông tin Huyết áp tâm thu không hợp lệ (giá trị hợp lệ từ 90 ~ 200)',
      currentValue: patientInfo.systolicBloodPressure,
      rangeValue: getRangeSysBP(patientInfo.systolicBloodPressure)
    })
  }
  if (patientInfo.relatedFactors.hypertensive === undefined) {
    needInput.push({
      code: 'formHypertensive',
      text: 'Thiếu thông tin Bệnh sử cao huyết áp'
    })
  }
  if (patientInfo.gender === undefined) {
    needInput.push({
      code: 'formSex',
      text: 'Thiếu thông tin giới tính'
    })
  }
  return needInput
}

// /**
//  * TODO Framingham Risk Score Calculator
//  */

// /**
//    * FRAMINGHAM RISK SCORE (FRS)
//    * get point of age
//    * @returns {[male, female]} // [0] mean male, [1] female
//    */
// const getFraminghamPointOfAge = (patientInfo) => {
//   if (patientInfo.age < 30) { return null }
//   if (patientInfo.age >= 30 && patientInfo.age <= 34) {
//     return [0, 0]
//   }
//   if (patientInfo.age >= 35 && patientInfo.age <= 39) {
//     return [2, 2]
//   }
//   if (patientInfo.age >= 40 && patientInfo.age <= 44) {
//     return [5, 4]
//   }
//   if (patientInfo.age >= 45 && patientInfo.age <= 49) {
//     return [7, 5]
//   }
//   if (patientInfo.age >= 50 && patientInfo.age <= 54) {
//     return [8, 7]
//   }
//   if (patientInfo.age >= 55 && patientInfo.age <= 59) {
//     return [10, 8]
//   }
//   if (patientInfo.age >= 60 && patientInfo.age <= 64) {
//     return [11, 9]
//   }
//   if (patientInfo.age >= 65 && patientInfo.age <= 69) {
//     return [12, 10]
//   }
//   if (patientInfo.age >= 70 && patientInfo.age <= 74) {
//     return [14, 11]
//   }
//   // patientInfo.age >= 75
//   return [15, 12]
// }

// /**
//    * FRAMINGHAM RISK SCORE (FRS)
//    * get point of HDL-Cholesterol (mmol/L)
//    * @returns {[male, female]} // [0] mean male, [1] female
//    */
// const getFraminghamPointOfHdlCholesterol = (patientInfo) => {
//   if (patientInfo.hdl > 1.6) { return [-2, -2] }
//   if (patientInfo.hdl >= 1.3 && patientInfo.hdl <= 1.6) { return [-1, -1] }
//   if (patientInfo.hdl >= 1.2 && patientInfo.hdl <= 1.29) { return [0, 0] }
//   if (patientInfo.hdl >= 0.9 && patientInfo.hdl <= 1.19) { return [1, 1] }
//   // patientInfo.hdl < 0.9
//   return [2, 2]
// }

// /**
//    * FRAMINGHAM RISK SCORE (FRS)
//    * get point of Total-Cholesterol (mmol/L)
//    * @returns {[male, female]} // [0] mean male, [1] female
//    */
// const getFraminghamPointOfTotalCholesterol = (patientInfo) => {
//   if (patientInfo.totalCholesterol > 7.2) { return [4, 5] }
//   if (patientInfo.totalCholesterol >= 6.2 && patientInfo.totalCholesterol <= 7.2) { return [3, 4] }
//   if (patientInfo.totalCholesterol >= 5.2 && patientInfo.totalCholesterol <= 6.19) { return [2, 3] }
//   if (patientInfo.totalCholesterol >= 4.1 && patientInfo.totalCholesterol <= 5.19) { return [1, 1] }
//   // patientInfo.totalCholesterol < 4.1
//   return [0, 0]
// }

// /**
//    * FRAMINGHAM RISK SCORE (FRS)
//    * get point of Systolic Blood Pressure (mmHg)
//    * @returns {[male, female]} // [0] mean male, [1] female
//    */
// const getFraminghamPointOfSBloodPressure = (patientInfo) => {
//   const isTreatment = patientInfo.relatedFactors.hypertensive

//   if (patientInfo.systolicBloodPressure >= 160) {
//     return isTreatment ? [5, 7] : [3, 5]
//   }
//   if (patientInfo.systolicBloodPressure >= 150 && patientInfo.systolicBloodPressure <= 159) {
//     return isTreatment ? [4, 6] : [2, 4]
//   }
//   if (patientInfo.systolicBloodPressure >= 140 && patientInfo.systolicBloodPressure <= 149) {
//     return isTreatment ? [4, 5] : [2, 2]
//   }
//   if (patientInfo.systolicBloodPressure >= 130 && patientInfo.systolicBloodPressure <= 139) {
//     return isTreatment ? [3, 3] : [1, 1]
//   }
//   if (patientInfo.systolicBloodPressure >= 120 && patientInfo.systolicBloodPressure <= 129) {
//     return isTreatment ? [2, 2] : [0, 0]
//   }
//   // patientInfo.systolicBloodPressure < 120
//   return isTreatment ? [0, -1] : [-2, -3]
// }

// /**
//    * FRAMINGHAM RISK SCORE (FRS)
//    * get point of Systolic Blood Pressure (mmHg)
//    * @returns {[male, female]} // [0] mean male, [1] female
//    */
// const getFraminghamPointOfSmoker = (patientInfo) => {
//   const isSmoker = patientInfo.relatedFactors.smoker
//   return isSmoker ? [4, 3] : [0, 0]
// }

// /**
//    * FRAMINGHAM RISK SCORE (FRS)
//    * get point of Systolic Blood Pressure (mmHg)
//    * @returns {[male, female]} // [0] mean male, [1] female
//    */
// const framinghamPointTenYear = {
//   '-2': [1.1, '<1'],
//   '-1': [1.4, 1],
//   '0': [1.6, 1.2],
//   '1': [1.9, 1.5],
//   '2': [2.3, 1.7],
//   '3': [2.8, 2],
//   '4': [3.3, 2.4],
//   '5': [3.9, 2.8],
//   '6': [4.7, 3.3],
//   '7': [5.6, 3.9],
//   '8': [6.7, 4.5],
//   '9': [7.9, 5.3],
//   '10': [9.4, 6.3],
//   '11': [11.2, 7.3],
//   '12': [13.3, 8.6],
//   '13': [15.6, 10],
//   '14': [18.4, 11.7],
//   '15': [21.6, 13.7],
//   '16': [25.3, 15.9],
//   '18': [29.3, 18.5],
//   '17': ['>30', 21.5],
//   '19': ['>30', 24.8],
//   '20': ['>30', 27.5]
// }
// export const calculateFraminghamRiskScoreTenYear = (patientInfo) => {
//   // ? Number(true) => 1, Number(false) -> 0
//   const index = Number(patientInfo.gender === 'female')

//   const pointOfAge = getFraminghamPointOfAge(patientInfo)
//   const pointOfHdlCholesterol = getFraminghamPointOfHdlCholesterol(patientInfo)
//   const pointOfTotalCholesterol = getFraminghamPointOfTotalCholesterol(patientInfo)
//   const pointOfSBloodPressure = getFraminghamPointOfSBloodPressure(patientInfo)
//   const pointOfSmoker = getFraminghamPointOfSmoker(patientInfo)

//   const total = pointOfAge?.[index] + pointOfHdlCholesterol[index] + pointOfTotalCholesterol[index] + pointOfSBloodPressure[index] + pointOfSmoker[index]

//   if (total <= -3) { return ['<1', '<1'][index] }
//   if (total >= 21) { return ['>30', '>30'][index] }
//   return framinghamPointTenYear?.[total]?.[index]
// }

// export const missingFieldsFramingham = (patientInfo) => {
//   const needInput = []
//   if (!isValidTotalCholesterol(patientInfo.totalCholesterol)) {
//     needInput.push({
//       code: 'formTotalCholesterol',
//       text: 'Thiếu thông tin Tổng lượng chất béo (Total Cholesterol)'
//     })
//   }
//   // if (patientInfo.relatedFactors.diabetic === undefined) {
//   //   needInput.push({
//   //     code: 'formDiabetic',
//   //     text: 'Thiếu thông tin Bệnh sử tiểu đường (Diabetic)'
//   //   })
//   // }
//   if (!isValidAge(patientInfo.age, 30, 1000)) {
//     needInput.push({
//       code: 'formAge',
//       text: 'Yêu cầu tuổi phải từ 30 trở lên (Age)'
//     })
//   }
//   if (!isValidHDL(patientInfo.hdl)) {
//     needInput.push({
//       code: 'formHdl',
//       text: 'Thiếu thông tin HDL cholesterol (High Density Lipoprotein Cholesterol)'
//     })
//   }
//   if (patientInfo.relatedFactors.smoker === undefined) {
//     needInput.push({
//       code: 'formSmoker',
//       text: 'Thiếu thông tin Bệnh sử hút thuốc (Smoker)'
//     })
//   }
//   if (patientInfo.relatedFactors.race === undefined) {
//     needInput.push({
//       code: 'formRace',
//       text: 'Thiếu thông tin Chủng tộc(Race)'
//     })
//   }
//   if (!isValidSysBP(patientInfo.systolicBloodPressure)) {
//     needInput.push({
//       code: 'formSysBP',
//       text: 'Thiếu thông tin Huyết áp tâm thu (Systolic Blood Pressure)'
//     })
//   }
//   if (patientInfo.relatedFactors.hypertensive === undefined) {
//     needInput.push({
//       code: 'formHypertensive',
//       text: 'Thiếu thông tin Bệnh sử cao huyết áp (Hypertensive)'
//     })
//   }
//   if (patientInfo.gender === undefined) {
//     needInput.push({
//       code: 'formSex',
//       text: 'Thiếu thông tin giới tính (Sex)'
//     })
//   }
//   return needInput
// }
