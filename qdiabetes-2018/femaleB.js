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

// Model B

export default function (
  age, b_atypicalantipsy, b_corticosteroids, b_cvd, b_gestdiab, b_learning, b_manicschiz, b_pos, b_statin, b_treatedhyp, bmi, ethrisk, fbs, fh_diab, smoke_cat, surv, town
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
    0.990905702114105
  ]

  /* The conditional arrays */

  const Iethrisk = [
    0,
    0,
    0.9898906127239111000000000,
    1.2511504196326508000000000,
    1.4934757568196120000000000,
    0.9673887434565966400000000,
    0.4844644519593178100000000,
    0.4784214955360102700000000,
    0.7520946270805577400000000,
    0.4050880741541424400000000
  ]
  const Ismoke = [
    0,
    0.0374156307236963230000000,
    0.2252973672514482800000000,
    0.3099736428023662800000000,
    0.4361942139496417500000000
  ]

  /* Applying the fractional polynomial transforms */
  /* (which includes scaling)                      */

  let dage = age
  dage = dage / 10
  let age_1 = dage ** 0.5
  let age_2 = dage ** 3
  let dbmi = bmi
  dbmi = dbmi / 10
  let bmi_2 = dbmi ** 3
  let bmi_1 = dbmi
  const dfbs = fbs

  let fbs_2 = dfbs ** -1 * Math.log(dfbs)
  let fbs_1 = dfbs ** -1

  /* Centring the continuous variables */

  age_1 = age_1 - 2.123332023620606
  age_2 = age_2 - 91.644744873046875
  bmi_1 = bmi_1 - 2.571253299713135
  bmi_2 = bmi_2 - 16.999439239501953
  fbs_1 = fbs_1 - 0.208309367299080
  fbs_2 = fbs_2 - 0.326781362295151
  town = town - 0.391116052865982

  /* Start of Sum */
  let a = 0

  /* The conditional sums */

  a += Iethrisk[ethrisk]
  a += Ismoke[smoke_cat]

  /* Sum from continuous values */

  a += age_1 * 3.7650129507517280000000000
  a += age_2 * -0.0056043343436614941000000
  a += bmi_1 * 2.4410935031672469000000000
  a += bmi_2 * -0.0421526334799096420000000
  a += fbs_1 * -2.1887891946337308000000000
  a += fbs_2 * -69.9608419828660290000000000
  a += town * 0.0358046297663126500000000

  /* Sum from boolean values */

  a += b_atypicalantipsy * 0.4748378550253853400000000
  a += b_corticosteroids * 0.3767933443754728500000000
  a += b_cvd * 0.1967261568066525100000000
  a += b_gestdiab * 1.0689325033692647000000000
  a += b_learning * 0.4542293408951034700000000
  a += b_manicschiz * 0.1616171889084260500000000
  a += b_pos * 0.3565365789576717100000000
  a += b_statin * 0.5809287382718667500000000
  a += b_treatedhyp * 0.2836632020122907300000000
  a += fh_diab * 0.4522149766206111600000000

  /* Sum from interaction terms */

  a += age_1 * b_atypicalantipsy * -0.7683591642786522500000000
  a += age_1 * b_learning * -0.7983128124297588200000000
  a += age_1 * b_statin * -1.9033508839833257000000000
  a += age_1 * bmi_1 * 0.4844747602404915200000000
  a += age_1 * bmi_2 * -0.0319399883071813450000000
  a += age_1 * fbs_1 * 2.2442903047404350000000000
  a += age_1 * fbs_2 * 13.0068388699783030000000000
  a += age_1 * fh_diab * -0.3040627374034501300000000
  a += age_2 * b_atypicalantipsy * 0.0005194455624413476200000
  a += age_2 * b_learning * 0.0003028327567161890600000
  a += age_2 * b_statin * 0.0024397111406018711000000
  a += age_2 * bmi_1 * -0.0041572976682154057000000
  a += age_2 * bmi_2 * 0.0001126882194204252200000
  a += age_2 * fbs_1 * 0.0199345308534312550000000
  a += age_2 * fbs_2 * -0.0716677187529306680000000
  a += age_2 * fh_diab * 0.0004523639671202325400000

  /* Calculate the score itself */
  const score = 100.0 * (1 - (survivor[surv]) ** Math.exp(a))
  return score
}
