import qCancerMale from './qcancer/male'
import qCancerFemale from './qcancer/female'

const getBMI = (value) => {
  if (value < 20) { return 20 }
  if (value > 40) { return 40 }
  return value
}

export const setDefaultPatientQCancer = (patientInfo) => {
  const PatientInfo = {}
  PatientInfo.lastName = patientInfo.aFullName

  const relatedFactors = {}
  relatedFactors.age = patientInfo.aAge
  relatedFactors.sex = patientInfo.aGender
  relatedFactors.bmi = getBMI(patientInfo.aBmi)
  relatedFactors.fhgicancer = patientInfo.fhgicancer
  relatedFactors.fhprostate = patientInfo.fhprostate
  relatedFactors.fhbreast = patientInfo.fhbreast
  relatedFactors.fhovarian = patientInfo.fhovarian
  relatedFactors.type2 = patientInfo.type2
  relatedFactors.chronicpan = patientInfo.chronicpan
  relatedFactors.copd = patientInfo.copd
  relatedFactors.endometrial = patientInfo.endometrial
  relatedFactors.curAppetiteloss = patientInfo.curAppetiteloss
  relatedFactors.curWeightloss = patientInfo.curWeightloss
  relatedFactors.curAbdopain = patientInfo.curAbdopain
  relatedFactors.curAbdodist = patientInfo.curAbdodist
  relatedFactors.curDysphagia = patientInfo.curDysphagia
  relatedFactors.curHeartburn = patientInfo.curHeartburn
  relatedFactors.curIndigestion = patientInfo.curIndigestion
  relatedFactors.curRectalbleed = patientInfo.curRectalbleed
  relatedFactors.curGibleed = patientInfo.curGibleed
  relatedFactors.curHaemoptysis = patientInfo.curHaemoptysis
  relatedFactors.curHaematuria = patientInfo.curHaematuria
  relatedFactors.curTesticularlump = patientInfo.curTesticularlump
  relatedFactors.curTestespain = patientInfo.curTestespain
  relatedFactors.curHaecklump = patientInfo.curHaecklump
  relatedFactors.curNightsweats = patientInfo.curNightsweats
  relatedFactors.curVte = patientInfo.curVte
  relatedFactors.curPmb = patientInfo.curPmb
  relatedFactors.curImb = patientInfo.curImb
  relatedFactors.curPostoical = patientInfo.curPostoical
  relatedFactors.curBreastlump = patientInfo.curBreastlump
  relatedFactors.curBreastskin = patientInfo.curBreastskin
  relatedFactors.curBreastpain = patientInfo.curBreastpain
  relatedFactors.lyBowelchange = patientInfo.lyBowelchange
  relatedFactors.lyConstipation = patientInfo.lyConstipation
  relatedFactors.lyCough = patientInfo.lyCough
  relatedFactors.lyBruising = patientInfo.lyBruising
  relatedFactors.lyHb = patientInfo.lyHb
  relatedFactors.lyUrinaryretention = patientInfo.lyUrinaryretention
  relatedFactors.lyUrinaryfreq = patientInfo.lyUrinaryfreq
  relatedFactors.lyNocturia = patientInfo.lyNocturia
  relatedFactors.lyImpotence = patientInfo.lyImpotence
  relatedFactors.smokerCategory = patientInfo.smokerCategory
  relatedFactors.alcoholCategory = patientInfo.alcoholCategory
  relatedFactors.townsendDeprivation = 0
  PatientInfo.relatedFactors = relatedFactors
  return PatientInfo
}

export const computeQCancerEstimated = ({ relatedFactors: patientInfo }) => {
  const isMale = patientInfo.sex === 'male'

  const rangeMapping = {
    bloodCancer: (number) => {
      if (isMale) {
        if (number <= 0.27) { return { text: 'Low', class: 'green' } }
        if (number > 0.27) { return { text: 'High', class: 'red' } }
      } else {
        if (number <= 0.22) { return { text: 'Low', class: 'green' } }
        if (number > 0.22) { return { text: 'High', class: 'red' } }
      }
    },
    colorectalCancer: (number) => {
      if (isMale) {
        if (number <= 0.45) { return { text: 'Low', class: 'green' } }
        if (number > 0.45) { return { text: 'High', class: 'red' } }
      } else {
        if (number <= 0.35) { return { text: 'Low', class: 'green' } }
        if (number > 0.35) { return { text: 'High', class: 'red' } }
      }
    },
    gastroOesophagealCancer: (number) => {
      if (isMale) {
        if (number <= 0.29) { return { text: 'Low', class: 'green' } }
        if (number > 0.29) { return { text: 'High', class: 'red' } }
      } else {
        if (number <= 0.14) { return { text: 'Low', class: 'green' } }
        if (number > 0.14) { return { text: 'High', class: 'red' } }
      }
    },
    lungCancer: (number) => {
      if (isMale) {
        if (number <= 0.67) { return { text: 'Low', class: 'green' } }
        if (number > 0.67) { return { text: 'High', class: 'red' } }
      } else {
        if (number <= 0.38) { return { text: 'Low', class: 'green' } }
        if (number > 0.38) { return { text: 'High', class: 'red' } }
      }
    },
    otherCancer: (number) => {
      if (isMale) {
        if (number <= 0.66) { return { text: 'Low', class: 'green' } }
        if (number > 0.66) { return { text: 'High', class: 'red' } }
      } else {
        if (number <= 0.55) { return { text: 'Low', class: 'green' } }
        if (number > 0.55) { return { text: 'High', class: 'red' } }
      }
    },
    pancreaticCancer: (number) => {
      if (number < 0.1) { return { text: 'Low', class: 'green' } }
      if (number >= 0.1) { return { text: 'High', class: 'red' } }
    },
    prostateCancer: (number) => {
      if (number <= 1.3) { return { text: 'Low', class: 'green' } }
      if (number > 1.3) { return { text: 'High', class: 'red' } }
    },
    renalTractCancer: (number) => {
      if (number < 0.2) { return { text: 'Low', class: 'green' } }
      if (number >= 0.2) { return { text: 'High', class: 'red' } }
    },
    testicularCancer: (number) => {
      if (number <= 0.02) { return { text: 'Low', class: 'green' } }
      if (number > 0.02) { return { text: 'High', class: 'red' } }
    },
    breastCancer: (number) => {
      if (number <= 0.72) { return { text: 'Low', class: 'green' } }
      if (number > 0.72) { return { text: 'High', class: 'red' } }
    },
    cervicalCancer: (number) => {
      if (number <= 0.05) { return { text: 'Low', class: 'green' } }
      if (number > 0.05) { return { text: 'High', class: 'red' } }
    },
    ovarianCancer: (number) => {
      if (number <= 0.18) { return { text: 'Low', class: 'green' } }
      if (number > 0.18) { return { text: 'High', class: 'red' } }
    },
    uterineCancer: (number) => {
      if (number <= 0.1) { return { text: 'Low', class: 'green' } }
      if (number > 0.1) { return { text: 'High', class: 'red' } }
    }
  }

  const ageCancerRange = {
    bloodCancer: (number) => {
      // ! Male or Female is same
      if (number < 61) { return 'progress-green' }
      if (number >= 61 && number <= 80) { return 'progress-orange' }
      if (number > 80) { return 'progress-red' }
    },
    colorectalCancer: (number) => {
      // ! Male or Female is same
      if (number < 61) { return 'progress-green' }
      if (number >= 61 && number <= 80) { return 'progress-orange' }
      if (number > 80) { return 'progress-red' }
    },
    gastroOesophagealCancer: (number) => {
      if (isMale) {
        if (number < 61) { return 'progress-green' }
        if ((number >= 61 && number <= 74) || (number >= 86 && number <= 100)) { return 'progress-orange' }
        if ((number >= 75 && number <= 85)) { return 'progress-red' }
      } else {
        if (number < 61) { return 'progress-green' }
        if (number >= 61 && number <= 80) { return 'progress-orange' }
        if (number > 80) { return 'progress-red' }
      }
    },
    lungCancer: (number) => {
      if (isMale) {
        if (number <= 61) { return 'progress-green' }
        if ((number >= 62 && number <= 74) || (number >= 86 && number <= 100)) { return 'progress-orange' }
        if ((number >= 75 && number <= 85)) { return 'progress-red' }
      } else {
        if (number < 61) { return 'progress-green' }
        if (number >= 61 && number <= 80) { return 'progress-orange' }
        if (number > 80) { return 'progress-red' }
      }
    },
    otherCancer: (number) => {
      // ! Male or Female is same
      if (number <= 61) { return 'progress-green' }
      if (number >= 61 && number <= 80) { return 'progress-orange' }
      if (number > 80) { return 'progress-red' }
    },
    pancreaticCancer: (number) => {
      if (isMale) {
        if (number <= 61) { return 'progress-green' }
        if ((number >= 62 && number <= 74) || (number >= 86 && number <= 100)) { return 'progress-orange' }
        if ((number >= 75 && number <= 85)) { return 'progress-red' }
      } else {
        if (number < 61) { return 'progress-green' }
        if (number >= 61 && number <= 80) { return 'progress-orange' }
        if (number > 80) { return 'progress-red' }
      }
    },
    prostateCancer: (number) => {
      if (number <= 61) { return 'progress-green' }
      if ((number >= 62 && number <= 74) || (number >= 86 && number <= 100)) { return 'progress-orange' }
      if ((number >= 75 && number <= 85)) { return 'progress-red' }
    },
    renalTractCancer: (number) => {
      // ! Male or Female is same
      if (number < 61) { return 'progress-green' }
      if (number >= 61 && number <= 80) { return 'progress-orange' }
      if (number > 80) { return 'progress-red' }
    },
    testicularCancer: (number) => {
      if ((number > 30 && number < 40)) { return 'progress-red' }
      if ((number >= 25 && number <= 30) || (number >= 40 && number <= 45)) { return 'progress-orange' }
      if (number > 45) { return 'progress-green' }
    },
    breastCancer: (number) => {
      if (number < 61) { return 'progress-green' }
      if (number >= 61 && number <= 80) { return 'progress-orange' }
      if (number > 80) { return 'progress-red' }
    },
    cervicalCancer: (number) => {
      if (number < 61) { return 'progress-green' }
      if (number >= 61 && number <= 80) { return 'progress-orange' }
      if (number > 80) { return 'progress-red' }
    },
    ovarianCancer: (number) => {
      if (number < 61) { return 'progress-green' }
      if (number >= 61 && number <= 80) { return 'progress-orange' }
      if (number > 80) { return 'progress-red' }
    },
    uterineCancer: (number) => {
      if (number < 61) { return 'progress-green' }
      if (number >= 61 && number <= 80) { return 'progress-orange' }
      if (number > 80) { return 'progress-red' }
    }
  }

  const bmiCancerRange = {
    bloodCancer: (number) => {
      // ! Male or Female is same
      if (number < 25) { return 'progress-green' }
      if (number >= 25 && number <= 35) { return 'progress-orange' }
      if (number > 35) { return 'progress-red' }
    },
    colorectalCancer: (number) => {
      if (isMale) {
        if (number < 25) { return 'progress-green' }
        if (number >= 25 && number <= 35) { return 'progress-orange' }
        if (number > 35) { return 'progress-red' }
      } else {
        if (number > 23) { return 'progress-green' }
        if (number < 18 || (number > 21 && number <= 23)) { return 'progress-orange' }
        if ((number >= 18 && number <= 21)) { return 'progress-red' }
      }
    },
    gastroOesophagealCancer: (number) => {
      if (isMale) {
        if (number < 25) { return 'progress-green' }
        if (number >= 25 && number <= 35) { return 'progress-orange' }
        if (number > 35) { return 'progress-red' }
      } else {
        if (number > 25) { return 'progress-green' }
        if (number >= 20 && number <= 25) { return 'progress-orange' }
        if (number < 20) { return 'progress-red' }
      }
    },
    lungCancer: (number) => {
      // ! Male or Female is same
      if (number > 25) { return 'progress-green' }
      if (number >= 20 && number <= 25) { return 'progress-orange' }
      if (number < 20) { return 'progress-red' }
    },
    otherCancer: (number) => {
      // ! Male or Female is same
      if (number > 25) { return 'progress-green' }
      if (number >= 20 && number <= 25) { return 'progress-orange' }
      if (number < 20) { return 'progress-red' }
    },
    pancreaticCancer: (number) => {
      // ! Male or Female is same
      if (number > 25) { return 'progress-green' }
      if (number >= 20 && number <= 25) { return 'progress-orange' }
      if (number < 20) { return 'progress-red' }
    },
    prostateCancer: (number) => {
      if (number < 23 || number > 27) { return 'progress-green' }
      if ((number >= 23 && number < 24) || (number > 26 && number <= 27)) { return 'progress-orange' }
      if ((number >= 24 && number <= 26)) { return 'progress-red' }
    },
    renalTractCancer: (number) => {
      // ! Male or Female is same
      if (isMale) {
        if (number < 25) { return 'progress-green' }
        if ((number >= 25 && number < 33) || (number > 37)) { return 'progress-orange' }
        if ((number >= 33 && number <= 37)) { return 'progress-red' }
      } else {
        if (number < 25) { return 'progress-green' }
        if (number >= 25 && number <= 35) { return 'progress-orange' }
        if (number > 35) { return 'progress-red' }
      }
    },
    testicularCancer: (number) => {
      if (number > 25) { return 'progress-green' }
      if (number >= 20 && number <= 25) { return 'progress-orange' }
      if (number < 20) { return 'progress-red' }
    },
    breastCancer: (number) => {
      if (number < 25) { return 'progress-green' }
      if (number >= 25 && number <= 35) { return 'progress-orange' }
      if (number > 35) { return 'progress-red' }
    },
    cervicalCancer: (number) => {
      if (number < 25) { return 'progress-green' }
      if (number >= 25 && number <= 35) { return 'progress-orange' }
      if (number > 35) { return 'progress-red' }
    },
    ovarianCancer: (number) => {
      if (number < 25) { return 'progress-green' }
      if ((number >= 25 && number < 30) || number > 34) { return 'progress-orange' }
      if (number >= 30 && number <= 34) { return 'progress-red' }
    },
    uterineCancer: (number) => {
      if (number < 25) { return 'progress-green' }
      if (number >= 25 && number <= 35) { return 'progress-orange' }
      if (number > 35) { return 'progress-red' }
    }
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

  const parserAlcoholCategory = (number, prefix = 'progress') => {
    const smokeStatus = {
      0: 'green',
      1: 'orange',
      2: 'orange',
      3: 'red',
      4: 'red'
    }
    return `${prefix}-${smokeStatus[number]}`
  }

  const parseActive = value => value ? 'progress-red' : 'progress-green'

  const riskScore = calculatorQCancer(patientInfo)
  return {
    ...Object.entries(riskScore).reduce((accumulator, [key, value]) => {
      // const riskEstimate = Math.ceil((value + Number.EPSILON) * 100) / 100
      const range = rangeMapping?.[key]?.(value) ?? { text: 'Low', class: 'progress-green' }
      const ageClassType = ageCancerRange?.[key]?.(patientInfo.age) ?? 'progress-green'
      const bmiClassType = bmiCancerRange?.[key]?.(patientInfo.bmi) ?? 'progress-green'
      return {
        ...accumulator,
        [key]: {
          riskEstimate: value,
          range,
          patient: {
            age: {
              value: patientInfo.age,
              className: ageClassType
            },
            bmi: {
              value: patientInfo.bmi.toFixed(2),
              className: bmiClassType
            }
          }
        }
      }
    }, {}),
    patient: {
      // age: {
      //   value: patientInfo.age,
      //   className: parseAgeType(patientInfo.age)
      // },
      gender: {
        value: patientInfo.sex,
        className: isMale ? 'progress-red' : 'progress-green'
      },
      // bmi: {
      //   value: patientInfo.bmi.toFixed(2),
      //   className: parseBmi(patientInfo.bmi)
      // },
      currentSmoker: {
        value: patientInfo.smokerCategory,
        className: parserSmokingCategory(patientInfo.smokerCategory)
      },
      alcoholCategory: {
        value: patientInfo.alcoholCategory,
        className: parserAlcoholCategory(patientInfo.alcoholCategory)
      },
      fhgicancer: {
        value: patientInfo.fhgicancer,
        className: parseActive(patientInfo.fhgicancer)
      },
      fhprostate: {
        value: patientInfo.fhprostate,
        className: parseActive(patientInfo.fhprostate)
      },
      fhbreast: {
        value: patientInfo.fhbreast,
        className: parseActive(patientInfo.fhbreast)
      },
      fhovarian: {
        value: patientInfo.fhovarian,
        className: parseActive(patientInfo.fhovarian)
      },
      type2: {
        value: patientInfo.type2,
        className: parseActive(patientInfo.type2)
      },
      chronicpan: {
        value: patientInfo.chronicpan,
        className: parseActive(patientInfo.chronicpan)
      },
      copd: {
        value: patientInfo.copd,
        className: parseActive(patientInfo.copd)
      },
      endometrial: {
        value: patientInfo.endometrial,
        className: parseActive(patientInfo.endometrial)
      },
      curAppetiteloss: {
        value: patientInfo.curAppetiteloss,
        className: parseActive(patientInfo.curAppetiteloss)
      },
      curWeightloss: {
        value: patientInfo.curWeightloss,
        className: parseActive(patientInfo.curWeightloss)
      },
      curAbdopain: {
        value: patientInfo.curAbdopain,
        className: parseActive(patientInfo.curAbdopain)
      },
      curAbdodist: {
        value: patientInfo.curAbdodist,
        className: parseActive(patientInfo.curAbdodist)
      },
      curDysphagia: {
        value: patientInfo.curDysphagia,
        className: parseActive(patientInfo.curDysphagia)
      },
      curHeartburn: {
        value: patientInfo.curHeartburn,
        className: parseActive(patientInfo.curHeartburn)
      },
      curIndigestion: {
        value: patientInfo.curIndigestion,
        className: parseActive(patientInfo.curIndigestion)
      },
      curRectalbleed: {
        value: patientInfo.curRectalbleed,
        className: parseActive(patientInfo.curRectalbleed)
      },
      curGibleed: {
        value: patientInfo.curGibleed,
        className: parseActive(patientInfo.curGibleed)
      },
      curHaemoptysis: {
        value: patientInfo.curHaemoptysis,
        className: parseActive(patientInfo.curHaemoptysis)
      },
      curHaematuria: {
        value: patientInfo.curHaematuria,
        className: parseActive(patientInfo.curHaematuria)
      },
      curTesticularlump: {
        value: patientInfo.curTesticularlump,
        className: parseActive(patientInfo.curTesticularlump)
      },
      curTestespain: {
        value: patientInfo.curTestespain,
        className: parseActive(patientInfo.curTestespain)
      },
      curHaecklump: {
        value: patientInfo.curHaecklump,
        className: parseActive(patientInfo.curHaecklump)
      },
      curNightsweats: {
        value: patientInfo.curNightsweats,
        className: parseActive(patientInfo.curNightsweats)
      },
      curVte: {
        value: patientInfo.curVte,
        className: parseActive(patientInfo.curVte)
      },
      curPmb: {
        value: patientInfo.curPmb,
        className: parseActive(patientInfo.curPmb)
      },
      curImb: {
        value: patientInfo.curImb,
        className: parseActive(patientInfo.curImb)
      },
      curPostoical: {
        value: patientInfo.curPostoical,
        className: parseActive(patientInfo.curPostoical)
      },
      curBreastlump: {
        value: patientInfo.curBreastlump,
        className: parseActive(patientInfo.curBreastlump)
      },
      curBreastskin: {
        value: patientInfo.curBreastskin,
        className: parseActive(patientInfo.curBreastskin)
      },
      curBreastpain: {
        value: patientInfo.curBreastpain,
        className: parseActive(patientInfo.curBreastpain)
      },
      lyBowelchange: {
        value: patientInfo.lyBowelchange,
        className: parseActive(patientInfo.lyBowelchange)
      },
      lyConstipation: {
        value: patientInfo.lyConstipation,
        className: parseActive(patientInfo.lyConstipation)
      },
      lyCough: {
        value: patientInfo.lyCough,
        className: parseActive(patientInfo.lyCough)
      },
      lyBruising: {
        value: patientInfo.lyBruising,
        className: parseActive(patientInfo.lyBruising)
      },
      lyHb: {
        value: patientInfo.lyHb,
        className: parseActive(patientInfo.lyHb)
      },
      lyUrinaryretention: {
        value: patientInfo.lyUrinaryretention,
        className: parseActive(patientInfo.lyUrinaryretention)
      },
      lyUrinaryfreq: {
        value: patientInfo.lyUrinaryfreq,
        className: parseActive(patientInfo.lyUrinaryfreq)
      },
      lyNocturia: {
        value: patientInfo.lyNocturia,
        className: parseActive(patientInfo.lyNocturia)
      },
      lyImpotence: {
        value: patientInfo.lyImpotence,
        className: parseActive(patientInfo.lyImpotence)
      }
    }
  }
}

const calculatorQCancer = (i) => {
  if (i.sex === 'male') {
    return qCancerMale(
      i.age,
      i.alcoholCategory,
      Number(!!i.chronicpan),
      Number(!!i.copd),
      Number(!!i.type2),
      i.bmi,
      Number(!!i.lyHb),
      Number(!!i.fhgicancer),
      Number(!!i.fhprostate),
      Number(!!i.curAbdodist),
      Number(!!i.curAbdopain),
      Number(!!i.curAppetiteloss),
      Number(!!i.curDysphagia),
      Number(!!i.curGibleed),
      Number(!!i.curHaematuria),
      Number(!!i.curHaemoptysis),
      Number(!!i.curHeartburn),
      Number(!!i.curIndigestion),
      Number(!!i.curHaecklump),
      Number(!!i.curNightsweats),
      Number(!!i.curRectalbleed),
      Number(!!i.curTestespain),
      Number(!!i.curTesticularlump),
      Number(!!i.curVte),
      Number(!!i.curWeightloss),
      Number(!!i.lyBowelchange),
      Number(!!i.lyConstipation),
      Number(!!i.lyCough),
      Number(!!i.lyImpotence),
      Number(!!i.lyNocturia),
      Number(!!i.lyUrinaryfreq),
      Number(!!i.lyUrinaryretention),
      i.smokerCategory,
      i.townsendDeprivation)
  } else {
    return qCancerFemale(
      i.age,
      i.alcoholCategory,
      Number(!!i.chronicpan),
      Number(!!i.copd),
      Number(!!i.endometrial),
      Number(!!i.type2),
      i.bmi,
      Number(!!i.lyHb),
      Number(!!i.fhbreast),
      Number(!!i.fhgicancer),
      Number(!!i.fhovarian),
      Number(!!i.curAbdodist),
      Number(!!i.curAbdopain),
      Number(!!i.curAppetiteloss),
      Number(!!i.curBreastlump),
      Number(!!i.curBreastpain),
      Number(!!i.curBreastskin),
      Number(!!i.curDysphagia),
      Number(!!i.curGibleed),
      Number(!!i.curHaematuria),
      Number(!!i.curHaemoptysis),
      Number(!!i.curHeartburn),
      Number(!!i.curImb),
      Number(!!i.curIndigestion),
      Number(!!i.curHaecklump),
      Number(!!i.curNightsweats),
      Number(!!i.curPmb),
      Number(!!i.curPostoical),
      Number(!!i.curRectalbleed),
      Number(!!i.curVte),
      Number(!!i.curWeightloss),
      Number(!!i.lyBowelchange),
      Number(!!i.lyBruising),
      Number(!!i.lyConstipation),
      Number(!!i.lyCough),
      i.smokerCategory,
      i.townsendDeprivation)
  }
}

// const isValidAge = (currentVal, min = 20, max = 89) => {
//   if (!isNaN(currentVal) && currentVal !== undefined && currentVal >= min && currentVal <= max) {
//     return true
//   }
//   return false
// }

export const missingFieldsQCancer = (patientInfo) => {
  const needInput = []
  // if (!isValidAge(patientInfo.relatedFactors.age, 25, 84)) {
  //   needInput.push({
  //     code: 'formAge',
  //     text: 'Tuổi nằm trong 25 - 84'
  //   })
  // }

  if (patientInfo.relatedFactors.sex === undefined) {
    needInput.push({
      code: 'formSex',
      text: 'Thiếu thông tin giới tính'
    })
  }

  // if (patientInfo.relatedFactors.smokerCategory === undefined) {
  //   needInput.push({
  //     code: 'formSmoker',
  //     text: 'Thiếu thông tin Nguy cơ do hút thuốc'
  //   })
  // }

  // if (patientInfo.relatedFactors.alcoholCategory === undefined) {
  //   needInput.push({
  //     code: 'formAlcohol',
  //     text: 'Thiếu thông tin Nguy cơ do uống rượu'
  //   })
  // }

  return needInput
}
