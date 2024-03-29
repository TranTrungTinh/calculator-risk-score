/* eslint-disable camelcase */
/*
 * Copyright 2017 ClinRisk Ltd.
 *
 * This file is part of QDiabetes-2018 (https://qdiabetes.org).
 *
 * QDiabetes-2018 is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * QDiabetes-2018 is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with QDiabetes-2018.  If not, see http://www.gnu.org/licenses/.
 *
 * Additional terms
 *
 * The following disclaimer must be held together with any risk score score generated by this code.
 * If the score is displayed, then this disclaimer must be displayed or otherwise be made easily accessible, e.g. by a prominent link alongside it.
 *   The initial version of this file, to be found at http://qdiabetes.org, faithfully implements QDiabetes-2018.
 *   ClinRisk Ltd. have released this code under the GNU Affero General Public License to enable others to implement the algorithm faithfully.
 *   However, the nature of the GNU Affero General Public License is such that we cannot prevent, for example, someone accidentally
 *   altering the coefficients, getting the inputs wrong, or just poor programming.
 *   ClinRisk Ltd. stress, therefore, that it is the responsibility of the end user to check that the source that they receive produces the same
 *   results as the original code found at http://qdiabetes.org.
 *   Inaccurate implementations of risk scores can lead to wrong patients being given the wrong treatment.
 *
 * End of additional terms
 *
 */

// Model C

export default function (
  age, b_atypicalantipsy, b_corticosteroids, b_cvd, b_learning, b_manicschiz, b_statin, b_treatedhyp, bmi, ethrisk, fh_diab, hba1c, smoke_cat, surv, town
) {
  surv = 10
  const survivor = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0.981181740760803
  ]

  /* The conditional arrays */

  const Iethrisk = [
    0,
    0,
    0.6757120705498780300000000,
    0.8314732504966345600000000,
    1.0969133802228563000000000,
    0.7682244636456048200000000,
    0.2089752925910850200000000,
    0.3809159378197057900000000,
    0.3423583679661269500000000,
    0.2204647785343308300000000
  ]
  const Ismoke = [
    0,
    0.1159289120687865100000000,
    0.1462418263763327100000000,
    0.1078142411249314200000000,
    0.1984862916366847400000000
  ]

  /* Applying the fractional polynomial transforms */
  /* (which includes scaling)                      */

  let dage = age
  dage = dage / 10
  let age_1 = Math.log(dage)
  let age_2 = dage ** 3
  let dbmi = bmi
  dbmi = dbmi / 10
  let bmi_1 = dbmi ** 2
  let bmi_2 = dbmi ** 3
  let dhba1c = hba1c
  dhba1c = dhba1c / 10
  let hba1c_1 = dhba1c ** 0.5
  let hba1c_2 = dhba1c

  /* Centring the continuous variables */

  age_1 = age_1 - 1.496392488479614
  age_2 = age_2 - 89.048171997070313
  bmi_1 = bmi_1 - 6.817805767059326
  bmi_2 = bmi_2 - 17.801923751831055
  hba1c_1 = hba1c_1 - 1.900265336036682
  hba1c_2 = hba1c_2 - 3.611008167266846
  town = town - 0.515986680984497

  /* Start of Sum */
  let a = 0

  /* The conditional sums */

  a += Iethrisk[ethrisk]
  a += Ismoke[smoke_cat]

  /* Sum from continuous values */

  a += age_1 * 4.0193435623978031000000000
  a += age_2 * -0.0048396442306278238000000
  a += bmi_1 * 0.8182916890534932500000000
  a += bmi_2 * -0.1255880870135964200000000
  a += hba1c_1 * 8.0511642238857934000000000
  a += hba1c_2 * -0.1465234689391449500000000
  a += town * 0.0252299651849007270000000

  /* Sum from boolean values */

  a += b_atypicalantipsy * 0.4554152522017330100000000
  a += b_corticosteroids * 0.1381618768682392200000000
  a += b_cvd * 0.1454698889623951800000000
  a += b_learning * 0.2596046658040857000000000
  a += b_manicschiz * 0.2852378849058589400000000
  a += b_statin * 0.4255195190118552500000000
  a += b_treatedhyp * 0.3316943000645931100000000
  a += fh_diab * 0.5661232594368061900000000

  /* Sum from interaction terms */

  a += age_1 * b_atypicalantipsy * -1.0013331909079835000000000
  a += age_1 * b_learning * -0.8916465737221592700000000
  a += age_1 * b_statin * -1.7074561167819817000000000
  a += age_1 * bmi_1 * 0.4507452747267244300000000
  a += age_1 * bmi_2 * -0.1085185980916560100000000
  a += age_1 * fh_diab * -0.6141009388709716100000000
  a += age_1 * hba1c_1 * 27.6705938271465650000000000
  a += age_1 * hba1c_2 * -7.4006134846785434000000000
  a += age_2 * b_atypicalantipsy * 0.0002245597398574240700000
  a += age_2 * b_learning * 0.0006604436076569648200000
  a += age_2 * b_statin * 0.0013873509357389619000000
  a += age_2 * bmi_1 * -0.0012224736160287865000000
  a += age_2 * bmi_2 * 0.0002266731010346126000000
  a += age_2 * fh_diab * 0.0005060258289477209100000
  a += age_2 * hba1c_1 * -0.0592014581247543300000000
  a += age_2 * hba1c_2 * 0.0155920894851499880000000

  /* Calculate the score itself */
  const score = 100.0 * (1 - (survivor[surv]) ** Math.exp(a))
  return score
}
