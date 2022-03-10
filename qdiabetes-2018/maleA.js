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

// Model A

export default function (
  age, b_atypicalantipsy, b_corticosteroids, b_cvd, b_learning, b_manicschiz, b_statin, b_treatedhyp, bmi, ethrisk, fh_diab, smoke_cat, surv, town
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
    0.978732228279114
  ]

  /* The conditional arrays */

  const Iethrisk = [
    0,
    0,
    1.1000230829124793000000000,
    1.2903840126147210000000000,
    1.6740908848727458000000000,
    1.1400446789147816000000000,
    0.4682468169065580600000000,
    0.6990564996301544800000000,
    0.6894365712711156800000000,
    0.4172222846773820900000000
  ]
  const Ismoke = [
    0,
    0.1638740910548557300000000,
    0.3185144911395897900000000,
    0.3220726656778343200000000,
    0.4505243716340953100000000
  ]

  /* Applying the fractional polynomial transforms */
  /* (which includes scaling)                      */

  let dage = age
  dage = dage / 10
  let age_2 = dage ** 3
  let age_1 = Math.log(dage)
  let dbmi = bmi
  dbmi = dbmi / 10
  let bmi_2 = dbmi ** 3
  let bmi_1 = dbmi ** 2

  /* Centring the continuous variables */

  age_1 = age_1 - 1.496392488479614
  age_2 = age_2 - 89.048171997070313
  bmi_1 = bmi_1 - 6.817805767059326
  bmi_2 = bmi_2 - 17.801923751831055
  town = town - 0.515986680984497

  /* Start of Sum */
  let a = 0

  /* The conditional sums */

  a += Iethrisk[ethrisk]
  a += Ismoke[smoke_cat]

  /* Sum from continuous values */

  a += age_1 * 4.4642324388691348000000000
  a += age_2 * -0.0040750108019255568000000
  a += bmi_1 * 0.9512902786712067500000000
  a += bmi_2 * -0.1435248827788547500000000
  a += town * 0.0259181820676787250000000

  /* Sum from boolean values */

  a += b_atypicalantipsy * 0.4210109234600543600000000
  a += b_corticosteroids * 0.2218358093292538400000000
  a += b_cvd * 0.2026960575629002100000000
  a += b_learning * 0.2331532140798696100000000
  a += b_manicschiz * 0.2277044952051772700000000
  a += b_statin * 0.5849007543114134200000000
  a += b_treatedhyp * 0.3337939218350107800000000
  a += fh_diab * 0.6479928489936953600000000

  /* Sum from interaction terms */

  a += age_1 * b_atypicalantipsy * -0.9463772226853415200000000
  a += age_1 * b_learning * -0.9384237552649983300000000
  a += age_1 * b_statin * -1.7479070653003299000000000
  a += age_1 * bmi_1 * 0.4514759924187976600000000
  a += age_1 * bmi_2 * -0.1079548126277638100000000
  a += age_1 * fh_diab * -0.6011853042930119800000000
  a += age_2 * b_atypicalantipsy * -0.0000519927442172335000000
  a += age_2 * b_learning * 0.0007102643855968814100000
  a += age_2 * b_statin * 0.0013508364599531669000000
  a += age_2 * bmi_1 * -0.0011797722394560309000000
  a += age_2 * bmi_2 * 0.0002147150913931929100000
  a += age_2 * fh_diab * 0.0004914185594087803400000

  /* Calculate the score itself */
  const score = 100.0 * (1 - (survivor[surv]) ** Math.exp(a))
  return score
}
