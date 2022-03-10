import qDiaMaleA from './qdiabetes-2018/maleA'
import qDiaMaleB from './qdiabetes-2018/maleB'
import qDiaMaleC from './qdiabetes-2018/maleC'
import qDiaFemaleA from './qdiabetes-2018/femaleA'
import qDiaFemaleB from './qdiabetes-2018/femaleB'
import qDiaFemaleC from './qdiabetes-2018/femaleC'

/**
 *
export type CommonQDiabetesInput = {
  // Age at study entry (baseline)
  age: number,

  // Second generation “atypical” antipsychotic use (including amisulpride, aripiprazole, clozapine, lurasidone,
  // olanzapine, paliperidone, quetiapine, risperidone, sertindole, or zotepine)
  atypicalAntipsychotics: boolean,

  // Corticosteroid use (British National Formulary (BNF) chapter 6.3.2 including oral or parenteral prednisolone,
  // betamethasone, cortisone, depo-medrone, dexamethasone, deflazacort, efcortesol, hydrocortisone,
  // methylprednisolone, or triamcinolone)
  corticosteroids: boolean,

  // Treated hypertension (diagnosis of hypertension and treatment with at least one antihypertensive drug)
  treatedForHypertension: boolean,

  // Body-mass index
  bmi: number,

  // Ethnic origin
  // 0: White or not stated
  // 1: White or not stated
  // 2: Indian
  // 3: Pakistani
  // 4: Bangladeshi
  // 5: Other Asian
  // 6: Black Caribbean
  // 7: Black African
  // 8: Chinese
  // 9: Other ethnic group
  ethnicity: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,

  // Family history of diabetes in a first degree relative
  familyDiabetes: boolean,

  // Diagnosis coronary heart disease in a first degree relative aged less than 60 years
  cardioVascularDisease: boolean,

  // Smoking status (0: non-smoker, 1: former smoker, 2: light smoker (1-9/day), 3: moderate smoker (10-19/day), or 4: heavy smoker (≥20/day))
  smokerCategory: 0 | 1 | 2 | 3 | 4,

  // Diagnosis of schizophrenia or bipolar affective disorder
  schizophreniaOrBipolar: boolean,

  // Learning disabilities
  learningDisabilities: boolean,

  // Prescribed statins
  prescribedStatins: boolean,

  // Fasting blood glucose level (optional - preferred)
  fastingBloodGlucoseLevel?: number

  // Glycated haemoglobin (HBA1c) value (optional - used if fastingBloodGlucoseLevel unavailable)
  hba1c?: number

  // Glycated haemoglobin (HBA1c) as an IFCC value (optional - used if fastingBloodGlucoseLevel unavailable)
  hba1cIfcc?: number

  // as measured by the Townsend score, where higher values indicate higher levels of material deprivation
  townsendDeprivation: number
}

export type MaleQDiabetesInput = CommonQDiabetesInput & {
  sex: 'm'
}

export type FemaleQDiabetesInput = CommonQDiabetesInput & {
  sex: 'f'

  // (Females only) Diagnosis of gestational diabetes
  gestationalDiabetes: boolean,

  // (Females only) Diagnosis of polycystic ovary syndrome
  polycysticOvarySyndrome: boolean,
}

export type QDiabetesInput = MaleQDiabetesInput | FemaleQDiabetesInput;
 */

const getBMI = (value) => {
  if (value < 20) { return 20 }
  if (value > 40) { return 40 }
  return value
}

export const setDefaultPatientDiabetes = (patientInfo) => {
  const PatientInfo = {}
  PatientInfo.lastName = patientInfo.aFullName

  const relatedFactors = {}
  relatedFactors.age = patientInfo.aAge
  relatedFactors.sex = patientInfo.aGender
  relatedFactors.bmi = getBMI(patientInfo.aBmi)
  relatedFactors.atypicalAntipsychotics = patientInfo.aAtypicalantipsy
  relatedFactors.corticosteroids = patientInfo.aCorticosteroids
  relatedFactors.treatedForHypertension = patientInfo.aTreatmentHypertensionStatus
  relatedFactors.ethnicity = patientInfo.aEthnicity
  relatedFactors.familyDiabetes = patientInfo.aFamilyDiabetes
  relatedFactors.cardioVascularDisease = patientInfo.aCvd
  relatedFactors.smokerCategory = patientInfo.aSmokerCategory
  relatedFactors.schizophreniaOrBipolar = patientInfo.aSchizophreniaOrBipolar
  relatedFactors.learningDisabilities = patientInfo.aLearningDifficulty
  relatedFactors.prescribedStatins = patientInfo.aStatin
  relatedFactors.fastingBloodGlucoseLevel = patientInfo.aFastingBloodGlucose
  relatedFactors.hba1c = patientInfo.aHba1c
  relatedFactors.gestationalDiabetes = patientInfo.aGestdiab
  relatedFactors.polycysticOvarySyndrome = patientInfo.aPos
  relatedFactors.townsendDeprivation = 0
  PatientInfo.relatedFactors = relatedFactors
  return PatientInfo
}

function hba1cIFCCtoDCCT (ifcc) {
  return (ifcc / 10.929) + 2.15
}

export const computeDiabetesEstimated = ({ relatedFactors: patientInfo }) => {
  const parseRange = (number) => {
    if (number < 5.6) { return { text: 'Low', class: 'green' } }
    if (number >= 5.6) { return { text: 'High', class: 'red' } }
  }

  const parseAgeType = (number, prefix = 'progress') => {
    if (number < 40) { return `${prefix}-green` }
    if (number >= 40 && number <= 60) { return `${prefix}-orange` }
    if (number > 60) { return `${prefix}-red` }
  }

  const parserSmokingCategory = (number, prefix = 'progress') => {
    const smokeStatus = {
      0: 'green',
      1: 'green',
      2: 'orange',
      3: 'orange',
      4: 'red'
    }
    return `${prefix}-${smokeStatus[number]}`
  }

  const parseActive = value => value ? 'progress-red' : 'progress-green'

  const parseBloodGlucose = (number, prefix = 'progress') => {
    if (number < 5.6) { return `${prefix}-green` }
    if (number >= 5.6) { return `${prefix}-red` }
  }

  const parseHba1c = (number, prefix = 'progress') => {
    if (number < 42) { return `${prefix}-green` }
    if (number >= 42) { return `${prefix}-red` }
  }

  const parseBmi = (number, prefix = 'progress') => {
    if (number >= 20 && number <= 25) { return `${prefix}-green` }
    if (number > 25 && number <= 35) { return `${prefix}-orange` }
    if (number > 35) { return `${prefix}-red` }
  }

  const riskScore = calculatorDiabetes(patientInfo)
  const riskEstimate = Math.round((riskScore) * 100) / 100
  return {
    riskEstimate,
    range: parseRange(Number(riskScore).toFixed(1)),
    patient: {
      age: {
        value: patientInfo.age,
        className: parseAgeType(patientInfo.age)
      },
      gender: {
        value: patientInfo.sex,
        className: patientInfo.sex === 'male' ? 'progress-red' : 'progress-green'
      },
      bmi: {
        value: Number(patientInfo.bmi).toFixed(2),
        className: parseBmi(patientInfo.bmi)
      },
      currentSmoker: {
        value: patientInfo.smokerCategory,
        className: parserSmokingCategory(patientInfo.smokerCategory)
      },
      familyDiabetes: {
        value: patientInfo.familyDiabetes,
        className: parseActive(patientInfo.familyDiabetes)
      },
      cardioVascularDisease: {
        value: patientInfo.cardioVascularDisease,
        className: parseActive(patientInfo.cardioVascularDisease)
      },
      atypicalAntipsychotics: {
        value: patientInfo.atypicalAntipsychotics,
        className: parseActive(patientInfo.atypicalAntipsychotics)
      },
      corticosteroids: {
        value: patientInfo.corticosteroids,
        className: parseActive(patientInfo.corticosteroids)
      },
      treatedForHypertension: {
        value: patientInfo.treatedForHypertension,
        className: parseActive(patientInfo.treatedForHypertension)
      },
      schizophreniaOrBipolar: {
        value: patientInfo.schizophreniaOrBipolar,
        className: parseActive(patientInfo.schizophreniaOrBipolar)
      },
      learningDisabilities: {
        value: patientInfo.learningDisabilities,
        className: parseActive(patientInfo.learningDisabilities)
      },
      prescribedStatins: {
        value: patientInfo.prescribedStatins,
        className: parseActive(patientInfo.prescribedStatins)
      },
      fastingBloodGlucoseLevel: {
        value: patientInfo.fastingBloodGlucoseLevel,
        className: parseBloodGlucose(patientInfo.fastingBloodGlucoseLevel)
      },
      hba1c: {
        value: Number(patientInfo.hba1c).toFixed(2),
        className: parseHba1c(patientInfo.hba1c)
      },
      gestationalDiabetes: {
        value: patientInfo.gestationalDiabetes,
        className: parseActive(patientInfo.gestationalDiabetes)
      },
      polycysticOvarySyndrome: {
        value: patientInfo.polycysticOvarySyndrome,
        className: parseActive(patientInfo.polycysticOvarySyndrome)
      }
    }
  }
}

const calculatorDiabetes = (i) => {
  if (i.hba1cIfcc) {
    i.hba1c = hba1cIFCCtoDCCT(i.hba1cIfcc)
  }

  if (i.sex === 'male') {
    // B is the best model where fasting blood glucose is available
    if (i.fastingBloodGlucoseLevel) {
      return qDiaMaleB(i.age,
        i.atypicalAntipsychotics ? 1 : 0,
        i.corticosteroids ? 1 : 0,
        i.cardioVascularDisease ? 1 : 0,
        i.learningDisabilities ? 1 : 0,
        i.schizophreniaOrBipolar ? 1 : 0,
        i.prescribedStatins ? 1 : 0,
        i.treatedForHypertension ? 1 : 0,
        i.bmi,
        i.ethnicity,
        i.fastingBloodGlucoseLevel,
        i.familyDiabetes ? 1 : 0,
        i.smokerCategory,
        10,
        i.townsendDeprivation)
    }

    if (i.hba1c) {
      return qDiaMaleC(i.age,
        i.atypicalAntipsychotics ? 1 : 0,
        i.corticosteroids ? 1 : 0,
        i.cardioVascularDisease ? 1 : 0,
        i.learningDisabilities ? 1 : 0,
        i.schizophreniaOrBipolar ? 1 : 0,
        i.prescribedStatins ? 1 : 0,
        i.treatedForHypertension ? 1 : 0,
        i.bmi,
        i.ethnicity,
        i.familyDiabetes ? 1 : 0,
        i.hba1c,
        i.smokerCategory,
        10,
        i.townsendDeprivation)
    }

    return qDiaMaleA(i.age,
      i.atypicalAntipsychotics ? 1 : 0,
      i.corticosteroids ? 1 : 0,
      i.cardioVascularDisease ? 1 : 0,
      i.learningDisabilities ? 1 : 0,
      i.schizophreniaOrBipolar ? 1 : 0,
      i.prescribedStatins ? 1 : 0,
      i.treatedForHypertension ? 1 : 0,
      i.bmi,
      i.ethnicity,
      i.familyDiabetes ? 1 : 0,
      i.smokerCategory,
      10,
      i.townsendDeprivation)
  } else {
    if (i.fastingBloodGlucoseLevel) {
      return qDiaFemaleB(i.age,
        i.atypicalAntipsychotics ? 1 : 0,
        i.corticosteroids ? 1 : 0,
        i.cardioVascularDisease ? 1 : 0,
        i.gestationalDiabetes ? 1 : 0,
        i.learningDisabilities ? 1 : 0,
        i.schizophreniaOrBipolar ? 1 : 0,
        i.polycysticOvarySyndrome ? 1 : 0,
        i.prescribedStatins ? 1 : 0,
        i.treatedForHypertension ? 1 : 0,
        i.bmi,
        i.ethnicity,
        i.fastingBloodGlucoseLevel,
        i.familyDiabetes ? 1 : 0,
        i.smokerCategory,
        10,
        i.townsendDeprivation)
    }

    if (i.hba1c) {
      return qDiaFemaleC(i.age,
        i.atypicalAntipsychotics ? 1 : 0,
        i.corticosteroids ? 1 : 0,
        i.cardioVascularDisease ? 1 : 0,
        i.gestationalDiabetes ? 1 : 0,
        i.learningDisabilities ? 1 : 0,
        i.schizophreniaOrBipolar ? 1 : 0,
        i.polycysticOvarySyndrome ? 1 : 0,
        i.prescribedStatins ? 1 : 0,
        i.treatedForHypertension ? 1 : 0,
        i.bmi,
        i.ethnicity,
        i.familyDiabetes ? 1 : 0,
        i.hba1c,
        i.smokerCategory,
        10,
        i.townsendDeprivation)
    }

    return qDiaFemaleA(i.age,
      i.atypicalAntipsychotics ? 1 : 0,
      i.corticosteroids ? 1 : 0,
      i.cardioVascularDisease ? 1 : 0,
      i.gestationalDiabetes ? 1 : 0,
      i.learningDisabilities ? 1 : 0,
      i.schizophreniaOrBipolar ? 1 : 0,
      i.polycysticOvarySyndrome ? 1 : 0,
      i.prescribedStatins ? 1 : 0,
      i.treatedForHypertension ? 1 : 0,
      i.bmi,
      i.ethnicity,
      i.familyDiabetes ? 1 : 0,
      i.smokerCategory,
      10,
      i.townsendDeprivation)
  }
}

const isValidAge = (currentVal, min = 20, max = 79) => {
  if (!isNaN(currentVal) && currentVal !== undefined && currentVal >= min && currentVal <= max) {
    return true
  }
  return false
}
const getRangeAge = (currentVal) => {
  return (isNaN(currentVal) || currentVal !== undefined || currentVal < 25) ? 25 : 84
}
const isValidHBA1c = (currentVal) => {
  if ((!isNaN(currentVal) && currentVal >= 15.0 && currentVal <= 47.99) || !currentVal) {
    return true
  }
  return false
}
const getRangeHBA1c = (currentVal) => {
  return (isNaN(currentVal) || currentVal !== undefined || currentVal < 15) ? 15 : 47.99
}

const isValidFpg = (currentVal) => {
  if ((!isNaN(currentVal) && currentVal >= 2 && currentVal < 7) || !currentVal) {
    return true
  }
  return false
}
const getRangeFpg = (currentVal) => {
  return (isNaN(currentVal) || currentVal < 2) ? 2 : 7
}
/**
   * Checks for missing user information to calculate a risk score and displays
   * an appropriate message containing missing fields
   * @returns {*} Message containing missing information to calculate a valid risk score
   */
export const missingFieldsDiabetes = (patientInfo) => {
  const needInput = []
  if (!isValidAge(patientInfo.relatedFactors.age, 25, 84)) {
    needInput.push({
      code: 'formAge',
      text: 'Tuổi nằm trong 25 - 84',
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

  if (!patientInfo.relatedFactors.fastingBloodGlucoseLevel && !isValidHBA1c(patientInfo.relatedFactors.hba1c)) {
    needInput.push({
      code: 'formPolycysticOvarySyndrome',
      text: 'Chỉ số HBA1c không hợp lệ. Chỉ số HBA1c hợp lệ là từ (15.0 ~ 47.99) mmol/mol',
      currentValue: patientInfo.relatedFactors.hba1c,
      rangeValue: getRangeHBA1c(patientInfo.relatedFactors.hba1c)
    })
  }

  if (!isValidFpg(patientInfo.relatedFactors.fastingBloodGlucoseLevel)) {
    needInput.push({
      code: 'fastingBloodGlucoseLevel',
      text: 'Chỉ số đường đói không hợp lệ. Chỉ số đường đói hợp lệ là từ (2.0 ~ <= 7.0) mmol/L',
      currentValue: patientInfo.relatedFactors.fastingBloodGlucoseLevel,
      rangeValue: getRangeFpg(patientInfo.relatedFactors.fastingBloodGlucoseLevel)
    })
  }

  if (patientInfo.relatedFactors.smokerCategory === undefined) {
    needInput.push({
      code: 'formSmoker',
      text: 'Thiếu thông tin Bệnh sử hút thuốc (Smoker)'
    })
  }

  if (patientInfo.relatedFactors.atypicalAntipsychotics === undefined) {
    needInput.push({
      code: 'formAtypicalAntipsychotics',
      text: 'Thiếu thông tin Tình trạng đang sử dụng thuốc an thần'
    })
  }

  if (patientInfo.relatedFactors.corticosteroids === undefined) {
    needInput.push({
      code: 'formCorticosteroids',
      text: 'Thiếu thông tin Tình trạng đang sử dụng thuốc steroid'
    })
  }

  if (patientInfo.relatedFactors.familyDiabetes === undefined) {
    needInput.push({
      code: 'formFamilyDiabetes',
      text: 'Thiếu thông tin Tiền sử mắc bệnh tiểu đường ở người thân'
    })
  }

  if (patientInfo.relatedFactors.cardioVascularDisease === undefined) {
    needInput.push({
      code: 'formCardioVascularDisease',
      text: 'Thiếu thông tin Tình trạng bệnh về tim mạch'
    })
  }

  if (patientInfo.relatedFactors.treatedForHypertension === undefined) {
    needInput.push({
      code: 'formCardioVascularDisease',
      text: 'Thiếu thông tin ình trạng huyết áp'
    })
  }

  if (patientInfo.relatedFactors.schizophreniaOrBipolar === undefined) {
    needInput.push({
      code: 'formSchizophreniaOrBipolar',
      text: 'Thiếu thông tin Tình trạng tiền sử trầm cảm và tâm thần phân liệt'
    })
  }

  if (patientInfo.relatedFactors.learningDisabilities === undefined) {
    needInput.push({
      code: 'formLearningDisabilities',
      text: 'Thiếu thông tin Tình trạng chứng khó học'
    })
  }

  if (patientInfo.relatedFactors.gender === 'female' && patientInfo.relatedFactors.gestationalDiabetes === undefined) {
    needInput.push({
      code: 'formGestationalDiabetes',
      text: 'Thiếu thông tin Tình trạng tiền sử đái tháo đường thai kỳ'
    })
  }

  if (patientInfo.relatedFactors.gender === 'female' && patientInfo.relatedFactors.polycysticOvarySyndrome === undefined) {
    needInput.push({
      code: 'formPolycysticOvarySyndrome',
      text: 'Thiếu thông tin Tình trạng tiền sử buồng trứng đa nang'
    })
  }

  return needInput
}
