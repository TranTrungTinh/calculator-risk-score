/* eslint-disable camelcase */
/*
/*
 * Copyright 2013 ClinRisk Ltd.
 *
 * This file is part of QCancer-2013 (http://qcancer.org, http://svn.clinrisk.co.uk/opensource/qcancer).
 *
 * QCancer-2013 is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * QCancer-2013 is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with QCancer-2013.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Additional terms
 *
 * The following disclaimer must be displayed alongside any risk score generated by this code.
 *   The initial version of this file, to be found at http://svn.clinrisk.co.uk/opensource/qcancer, faithfully implements QCancer-2013.
 *   We have released this code under the GNU Affero General Public License to enable others to implement the algorithm faithfully.
 *   However, the nature of the GNU Affero General Public License is such that we cannot prevent, for example, someone accidentally
 *   altering the coefficients, getting the inputs wrong, or just poor programming.
 *   We stress, therefore, that it is the responsibility of the end user to check that the source that they receive produces the same results as the original code posted at http://svn.clinrisk.co.uk/opensource/qcancer.
 *   Inaccurate implementations of risk scores can lead to wrong patients being given the wrong treatment.
 *
 * This file has been auto-generated.
 * XML source: Q76_cancer2_16_0.xml
 * STATA dta time stamp: 27 Aug 2012 13:27
 * This file was created on: Thu 27 Jun 2013 09:06:56 BST
 */

function blood_cancer_female (
  age, bmi, c_hb, new_abdopain, new_haematuria, new_necklump, new_nightsweats, new_pmb, new_vte, new_weightloss, s1_bowelchange, s1_bruising
) {
  // const survivor = []

  /* The conditional arrays */

  /* Applying the fractional polynomial transforms */
  /* (which includes scaling)                      */

  let dage = age
  dage = dage / 10
  let age_1 = dage ** -2
  let age_2 = dage ** -2 * Math.log(dage)
  let dbmi = bmi
  dbmi = dbmi / 10
  let bmi_1 = dbmi ** -2
  let bmi_2 = dbmi ** -2 * Math.log(dbmi)

  /* Centring the continuous variables */

  age_1 = age_1 - 0.039541322737932
  age_2 = age_2 - 0.063867323100567
  bmi_1 = bmi_1 - 0.151021569967270
  bmi_2 = bmi_2 - 0.142740502953529

  /* Start of Sum */
  let a = 0

  /* The conditional sums */

  /* Sum from continuous values */

  a += age_1 * 35.9405666896283120000000000
  a += age_2 * -68.8496375977904480000000000
  a += bmi_1 * 0.0785171223057501980000000
  a += bmi_2 * -5.3730627788681424000000000

  /* Sum from boolean values */

  a += c_hb * 1.7035866502297630000000000
  a += new_abdopain * 0.3779206239385797800000000
  a += new_haematuria * 0.4086662974598894700000000
  a += new_necklump * 2.9539029476671903000000000
  a += new_nightsweats * 1.3792892192392403000000000
  a += new_pmb * 0.4689216313440992500000000
  a += new_vte * 0.6036630662990674100000000
  a += new_weightloss * 0.8963398932306315700000000
  a += s1_bowelchange * 0.7291379612468620300000000
  a += s1_bruising * 1.0255003552753392000000000

  /* Sum from interaction terms */

  /* Calculate the score itself */
  const score = a + -7.4207849482565749000000000
  return score
}

function breast_cancer_female (
  age, alcohol_cat4, bmi, fh_breastcancer, new_breastlump, new_breastpain, new_breastskin, new_pmb, new_vte, town
) {
  // const survivor = []

  /* The conditional arrays */

  const Ialcohol = [
    0,
    0.0543813075945134560000000,
    0.1245709972983817800000000,
    0.1855198679261514700000000
  ]

  /* Applying the fractional polynomial transforms */
  /* (which includes scaling)                      */

  let dage = age
  dage = dage / 10
  let age_1 = dage ** -2
  let age_2 = dage ** -2 * Math.log(dage)
  let dbmi = bmi
  dbmi = dbmi / 10
  let bmi_1 = dbmi ** -2
  let bmi_2 = dbmi ** -2 * Math.log(dbmi)

  /* Centring the continuous variables */

  age_1 = age_1 - 0.039541322737932
  age_2 = age_2 - 0.063867323100567
  bmi_1 = bmi_1 - 0.151021569967270
  bmi_2 = bmi_2 - 0.142740502953529
  town = town - -0.383295059204102

  /* Start of Sum */
  let a = 0

  /* The conditional sums */

  a += Ialcohol[alcohol_cat4]

  /* Sum from continuous values */

  a += age_1 * -14.3029484067898500000000000
  a += age_2 * -25.9301811377364260000000000
  a += bmi_1 * -1.7540983825680900000000000
  a += bmi_2 * 2.0601979121740364000000000
  a += town * -0.0160766972632234440000000

  /* Sum from boolean values */

  a += fh_breastcancer * 0.3863899675953914000000000
  a += new_breastlump * 3.9278533274888368000000000
  a += new_breastpain * 0.8779616078329102200000000
  a += new_breastskin * 2.2320296233987880000000000
  a += new_pmb * 0.4465053002248299800000000
  a += new_vte * 0.2728610297213165400000000

  /* Sum from interaction terms */

  /* Calculate the score itself */
  const score = a + -6.1261694200869234000000000
  return score
}

function cervical_cancer_female (
  age, bmi, c_hb, new_abdopain, new_haematuria, new_imb, new_pmb, new_postcoital, new_vte, smoke_cat, town
) {
  // const survivor = []

  /* The conditional arrays */

  const Ismoke = [
    0,
    0.3247875277095715300000000,
    0.7541211259076738800000000,
    0.7448343035139659600000000,
    0.6328348533913806800000000
  ]

  /* Applying the fractional polynomial transforms */
  /* (which includes scaling)                      */

  let dage = age
  dage = dage / 10
  let age_1 = dage ** -2
  let age_2 = dage ** -2 * Math.log(dage)
  let dbmi = bmi
  dbmi = dbmi / 10
  let bmi_1 = dbmi ** -2
  let bmi_2 = dbmi ** -2 * Math.log(dbmi)

  /* Centring the continuous variables */

  age_1 = age_1 - 0.039541322737932
  age_2 = age_2 - 0.063867323100567
  bmi_1 = bmi_1 - 0.151021569967270
  bmi_2 = bmi_2 - 0.142740502953529
  town = town - -0.383295059204102

  /* Start of Sum */
  let a = 0

  /* The conditional sums */

  a += Ismoke[smoke_cat]

  /* Sum from continuous values */

  a += age_1 * 10.1663393107505800000000000
  a += age_2 * -16.9118902491100020000000000
  a += bmi_1 * -0.5675143308052614800000000
  a += bmi_2 * -2.6377586334504044000000000
  a += town * 0.0573200669650633030000000

  /* Sum from boolean values */

  a += c_hb * 1.2205973555195053000000000
  a += new_abdopain * 0.7229870191773574200000000
  a += new_haematuria * 1.6126499968790107000000000
  a += new_imb * 1.9527008812518938000000000
  a += new_pmb * 3.3618997560756485000000000
  a += new_postcoital * 3.1391568551730864000000000
  a += new_vte * 1.1276327958138455000000000

  /* Sum from interaction terms */

  /* Calculate the score itself */
  const score = a + -8.8309098444401926000000000
  return score
}

function colorectal_cancer_female (
  age, alcohol_cat4, bmi, c_hb, fh_gicancer, new_abdodist, new_abdopain, new_appetiteloss, new_rectalbleed, new_vte, new_weightloss, s1_bowelchange, s1_constipation
) {
  // const survivor = []

  /* The conditional arrays */

  const Ialcohol = [
    0,
    0.2429014262884695900000000,
    0.2359224520197608100000000,
    0.4606605934539446100000000
  ]

  /* Applying the fractional polynomial transforms */
  /* (which includes scaling)                      */

  let dage = age
  dage = dage / 10
  let age_1 = dage ** -2
  let age_2 = dage ** -2 * Math.log(dage)
  let dbmi = bmi
  dbmi = dbmi / 10
  let bmi_1 = dbmi ** -2
  let bmi_2 = dbmi ** -2 * Math.log(dbmi)

  /* Centring the continuous variables */

  age_1 = age_1 - 0.039541322737932
  age_2 = age_2 - 0.063867323100567
  bmi_1 = bmi_1 - 0.151021569967270
  bmi_2 = bmi_2 - 0.142740502953529

  /* Start of Sum */
  let a = 0

  /* The conditional sums */

  a += Ialcohol[alcohol_cat4]

  /* Sum from continuous values */

  a += age_1 * -11.6175606616390770000000000
  a += age_2 * -42.9098057686870220000000000
  a += bmi_1 * -0.5344237822753052900000000
  a += bmi_2 * 2.6900552265408226000000000

  /* Sum from boolean values */

  a += c_hb * 1.4759238359186861000000000
  a += fh_gicancer * 0.4044501048847998200000000
  a += new_abdodist * 0.6630074287856559900000000
  a += new_abdopain * 1.4990872468711913000000000
  a += new_appetiteloss * 0.5068020107261922400000000
  a += new_rectalbleed * 2.7491673095810105000000000
  a += new_vte * 0.7072816884002932600000000
  a += new_weightloss * 1.0288860866585736000000000
  a += s1_bowelchange * 0.7664414123199643200000000
  a += s1_constipation * 0.3375158123121173600000000

  /* Sum from interaction terms */

  /* Calculate the score itself */
  const score = a + -7.5466948789670942000000000
  return score
}

function gastro_oesophageal_cancer_female (
  age, bmi, c_hb, new_abdopain, new_appetiteloss, new_dysphagia, new_gibleed, new_heartburn, new_indigestion, new_vte, new_weightloss, smoke_cat
) {
  // const survivor = []

  /* The conditional arrays */

  const Ismoke = [
    0,
    0.2108835385994093400000000,
    0.4020914846651602000000000,
    0.8497119766959212500000000,
    1.1020585469724540000000000
  ]

  /* Applying the fractional polynomial transforms */
  /* (which includes scaling)                      */

  let dage = age
  dage = dage / 10
  let age_1 = dage ** -2
  let age_2 = dage ** -2 * Math.log(dage)
  let dbmi = bmi
  dbmi = dbmi / 10
  let bmi_1 = dbmi ** -2
  let bmi_2 = dbmi ** -2 * Math.log(dbmi)

  /* Centring the continuous variables */

  age_1 = age_1 - 0.039541322737932
  age_2 = age_2 - 0.063867323100567
  bmi_1 = bmi_1 - 0.151021569967270
  bmi_2 = bmi_2 - 0.142740502953529

  /* Start of Sum */
  let a = 0

  /* The conditional sums */

  a += Ismoke[smoke_cat]

  /* Sum from continuous values */

  a += age_1 * 5.5127932958160830000000000
  a += age_2 * -70.2734062916161830000000000
  a += bmi_1 * 2.6063377632938987000000000
  a += bmi_2 * -1.2389834515079798000000000

  /* Sum from boolean values */

  a += c_hb * 1.2479756970482034000000000
  a += new_abdopain * 0.7825304005124729100000000
  a += new_appetiteloss * 0.6514592236889243900000000
  a += new_dysphagia * 3.7751714910656862000000000
  a += new_gibleed * 1.4264472204617833000000000
  a += new_heartburn * 0.8178746069193373300000000
  a += new_indigestion * 1.4998439683677578000000000
  a += new_vte * 0.7199894658172598700000000
  a += new_weightloss * 1.2287925630053846000000000

  /* Sum from interaction terms */

  /* Calculate the score itself */
  const score = a + -8.8746031610250764000000000
  return score
}

function lung_cancer_female (
  age, b_copd, bmi, c_hb, new_appetiteloss, new_dysphagia, new_haemoptysis, new_indigestion, new_necklump, new_vte, new_weightloss, s1_cough, smoke_cat, town
) {
  // const survivor = []

  /* The conditional arrays */

  const Ismoke = [
    0,
    1.3397416191950409000000000,
    1.9500839456663224000000000,
    2.1881694694325233000000000,
    2.4828660433307768000000000
  ]

  /* Applying the fractional polynomial transforms */
  /* (which includes scaling)                      */

  let dage = age
  dage = dage / 10
  let age_1 = dage ** -2
  let age_2 = dage ** -2 * Math.log(dage)
  let dbmi = bmi
  dbmi = dbmi / 10
  let bmi_1 = dbmi ** -2
  let bmi_2 = dbmi ** -2 * Math.log(dbmi)

  /* Centring the continuous variables */

  age_1 = age_1 - 0.039541322737932
  age_2 = age_2 - 0.063867323100567
  bmi_1 = bmi_1 - 0.151021569967270
  bmi_2 = bmi_2 - 0.142740502953529
  town = town - -0.383295059204102

  /* Start of Sum */
  let a = 0

  /* The conditional sums */

  a += Ismoke[smoke_cat]

  /* Sum from continuous values */

  a += age_1 * -117.2405737502962500000000000
  a += age_2 * 25.1702254741268090000000000
  a += bmi_1 * 2.5845488133924350000000000
  a += bmi_2 * -0.6083523966762799400000000
  a += town * 0.0406920461830567460000000

  /* Sum from boolean values */

  a += b_copd * 0.7942901962671364800000000
  a += c_hb * 0.8627980324401628400000000
  a += new_appetiteloss * 0.7170232121379446200000000
  a += new_dysphagia * 0.6718426806077323300000000
  a += new_haemoptysis * 2.9286439157734474000000000
  a += new_indigestion * 0.3634893730114273600000000
  a += new_necklump * 1.2097240380091590000000000
  a += new_vte * 0.8907072670032341000000000
  a += new_weightloss * 1.1384524885073082000000000
  a += s1_cough * 0.6439917053275602300000000

  /* Sum from interaction terms */

  /* Calculate the score itself */
  const score = a + -8.6449002971789692000000000
  return score
}

function other_cancer_female (
  age, alcohol_cat4, b_copd, bmi, c_hb, new_abdodist, new_abdopain, new_appetiteloss, new_breastlump, new_dysphagia, new_gibleed, new_haematuria, new_indigestion, new_necklump, new_pmb, new_vte, new_weightloss, s1_constipation, smoke_cat
) {
  // const survivor = []

  /* The conditional arrays */

  const Ialcohol = [
    0,
    0.1129292517088995400000000,
    0.1389183205617967600000000,
    0.3428114766789586200000000
  ]
  const Ismoke = [
    0,
    0.0643839792551647580000000,
    0.1875068101660691500000000,
    0.3754052152821668000000000,
    0.5007337952210844100000000
  ]

  /* Applying the fractional polynomial transforms */
  /* (which includes scaling)                      */

  let dage = age
  dage = dage / 10
  let age_1 = dage ** -2
  let age_2 = dage ** -2 * Math.log(dage)
  let dbmi = bmi
  dbmi = dbmi / 10
  let bmi_1 = dbmi ** -2
  let bmi_2 = dbmi ** -2 * Math.log(dbmi)

  /* Centring the continuous variables */

  age_1 = age_1 - 0.039541322737932
  age_2 = age_2 - 0.063867323100567
  bmi_1 = bmi_1 - 0.151021569967270
  bmi_2 = bmi_2 - 0.142740502953529

  /* Start of Sum */
  let a = 0

  /* The conditional sums */

  a += Ialcohol[alcohol_cat4]
  a += Ismoke[smoke_cat]

  /* Sum from continuous values */

  a += age_1 * 35.8208987302204780000000000
  a += age_2 * -68.3294741037719150000000000
  a += bmi_1 * 1.8969796480108396000000000
  a += bmi_2 * -3.7755945945329574000000000

  /* Sum from boolean values */

  a += b_copd * 0.2823021429107943600000000
  a += c_hb * 1.0476364795173587000000000
  a += new_abdodist * 0.9628688090459262000000000
  a += new_abdopain * 0.8335710066715610300000000
  a += new_appetiteloss * 0.8450972438476546100000000
  a += new_breastlump * 1.0400807427059522000000000
  a += new_dysphagia * 0.8905342895684595900000000
  a += new_gibleed * 0.3839632265134078600000000
  a += new_haematuria * 0.6143184647549447800000000
  a += new_indigestion * 0.2457016002992454300000000
  a += new_necklump * 2.1666504706191545000000000
  a += new_pmb * 0.4219383252623540900000000
  a += new_vte * 1.0630784861733920000000000
  a += new_weightloss * 1.1058752771736007000000000
  a += s1_constipation * 0.3780143641299491500000000

  /* Sum from interaction terms */

  /* Calculate the score itself */
  const score = a + -6.7864501668594306000000000
  return score
}

function ovarian_cancer_female (
  age, bmi, c_hb, fh_ovariancancer, new_abdodist, new_abdopain, new_appetiteloss, new_haematuria, new_indigestion, new_pmb, new_vte, new_weightloss, s1_bowelchange
) {
  // const survivor = []

  /* The conditional arrays */

  /* Applying the fractional polynomial transforms */
  /* (which includes scaling)                      */

  let dage = age
  dage = dage / 10
  let age_1 = dage ** -2
  let age_2 = dage ** -2 * Math.log(dage)
  let dbmi = bmi
  dbmi = dbmi / 10
  let bmi_1 = dbmi ** -2
  let bmi_2 = dbmi ** -2 * Math.log(dbmi)

  /* Centring the continuous variables */

  age_1 = age_1 - 0.039541322737932
  age_2 = age_2 - 0.063867323100567
  bmi_1 = bmi_1 - 0.151021569967270
  bmi_2 = bmi_2 - 0.142740502953529

  /* Start of Sum */
  let a = 0

  /* The conditional sums */

  /* Sum from continuous values */

  a += age_1 * -61.0831814462568940000000000
  a += age_2 * 20.3028612701106890000000000
  a += bmi_1 * -2.1261135335028407000000000
  a += bmi_2 * 3.2168200408772472000000000

  /* Sum from boolean values */

  a += c_hb * 1.3625636791018674000000000
  a += fh_ovariancancer * 1.9951774809951830000000000
  a += new_abdodist * 2.9381020883363806000000000
  a += new_abdopain * 1.7307824546132513000000000
  a += new_appetiteloss * 1.0606947909647773000000000
  a += new_haematuria * 0.4958835997468107900000000
  a += new_indigestion * 0.3843731027493998400000000
  a += new_pmb * 1.5869592940878865000000000
  a += new_vte * 1.6839747529852673000000000
  a += new_weightloss * 0.4774332393821720800000000
  a += s1_bowelchange * 0.6849850007182314300000000

  /* Sum from interaction terms */

  /* Calculate the score itself */
  const score = a + -7.5609929644491318000000000
  return score
}

function pancreatic_cancer_female (
  age, b_chronicpan, b_type2, bmi, new_abdopain, new_appetiteloss, new_dysphagia, new_gibleed, new_indigestion, new_vte, new_weightloss, s1_bowelchange, smoke_cat
) {
  // const survivor = []

  /* The conditional arrays */

  const Ismoke = [
    0,
    -0.0631301848152044240000000,
    0.3523695950528934500000000,
    0.7146003670327156800000000,
    0.8073207410335441200000000
  ]

  /* Applying the fractional polynomial transforms */
  /* (which includes scaling)                      */

  let dage = age
  dage = dage / 10
  let age_1 = dage ** -2
  let age_2 = dage ** -2 * Math.log(dage)
  let dbmi = bmi
  dbmi = dbmi / 10
  let bmi_1 = dbmi ** -2
  let bmi_2 = dbmi ** -2 * Math.log(dbmi)

  /* Centring the continuous variables */

  age_1 = age_1 - 0.039541322737932
  age_2 = age_2 - 0.063867323100567
  bmi_1 = bmi_1 - 0.151021569967270
  bmi_2 = bmi_2 - 0.142740502953529

  /* Start of Sum */
  let a = 0

  /* The conditional sums */

  a += Ismoke[smoke_cat]

  /* Sum from continuous values */

  a += age_1 * -6.8219654517231225000000000
  a += age_2 * -65.6404897305188650000000000
  a += bmi_1 * 3.9715559458995728000000000
  a += bmi_2 * -3.1161107999130500000000000

  /* Sum from boolean values */

  a += b_chronicpan * 1.1948138830441282000000000
  a += b_type2 * 0.7951745325664703000000000
  a += new_abdopain * 1.9230379689782926000000000
  a += new_appetiteloss * 1.5209568259888571000000000
  a += new_dysphagia * 1.0107551560302726000000000
  a += new_gibleed * 0.9324059153254259400000000
  a += new_indigestion * 1.1134012616631439000000000
  a += new_vte * 1.4485586969016084000000000
  a += new_weightloss * 1.5791912580663912000000000
  a += s1_bowelchange * 0.9361738611941444700000000

  /* Sum from interaction terms */

  /* Calculate the score itself */
  const score = a + -9.2782129678657608000000000
  return score
}

function renal_tract_cancer_female (
  age, bmi, c_hb, new_abdopain, new_appetiteloss, new_haematuria, new_indigestion, new_pmb, new_weightloss, smoke_cat
) {
  // const survivor = []

  /* The conditional arrays */

  const Ismoke = [
    0,
    0.2752175727739372700000000,
    0.5498656631475861100000000,
    0.6536242182136680100000000,
    0.9053763661785879700000000
  ]

  /* Applying the fractional polynomial transforms */
  /* (which includes scaling)                      */

  let dage = age
  dage = dage / 10
  let age_1 = dage ** -2
  let age_2 = dage ** -2 * Math.log(dage)
  let dbmi = bmi
  dbmi = dbmi / 10
  let bmi_1 = dbmi ** -2
  let bmi_2 = dbmi ** -2 * Math.log(dbmi)

  /* Centring the continuous variables */

  age_1 = age_1 - 0.039541322737932
  age_2 = age_2 - 0.063867323100567
  bmi_1 = bmi_1 - 0.151021569967270
  bmi_2 = bmi_2 - 0.142740502953529

  /* Start of Sum */
  let a = 0

  /* The conditional sums */

  a += Ismoke[smoke_cat]

  /* Sum from continuous values */

  a += age_1 * -0.0323226569626617470000000
  a += age_2 * -56.3551410786635780000000000
  a += bmi_1 * 1.2103910535779330000000000
  a += bmi_2 * -4.7221299079939785000000000

  /* Sum from boolean values */

  a += c_hb * 1.2666531852544143000000000
  a += new_abdopain * 0.6155954984707594500000000
  a += new_appetiteloss * 0.6842184594676019600000000
  a += new_haematuria * 4.1791444537241542000000000
  a += new_indigestion * 0.5694329224821874600000000
  a += new_pmb * 1.2541097882792864000000000
  a += new_weightloss * 0.7711610560290518300000000

  /* Sum from interaction terms */

  /* Calculate the score itself */
  const score = a + -8.9440775553776248000000000
  return score
}

function uterine_cancer_female (
  age, b_endometrial, b_type2, bmi, new_abdopain, new_haematuria, new_imb, new_pmb, new_vte
) {
  // const survivor = []

  /* The conditional arrays */

  /* Applying the fractional polynomial transforms */
  /* (which includes scaling)                      */

  let dage = age
  dage = dage / 10
  let age_1 = dage ** -2
  let age_2 = dage ** -2 * Math.log(dage)
  let dbmi = bmi
  dbmi = dbmi / 10
  let bmi_1 = dbmi ** -2
  let bmi_2 = dbmi ** -2 * Math.log(dbmi)

  /* Centring the continuous variables */

  age_1 = age_1 - 0.039541322737932
  age_2 = age_2 - 0.063867323100567
  bmi_1 = bmi_1 - 0.151021569967270
  bmi_2 = bmi_2 - 0.142740502953529

  /* Start of Sum */
  let a = 0

  /* The conditional sums */

  /* Sum from continuous values */

  a += age_1 * 2.7778124257317254000000000
  a += age_2 * -59.5333514566633330000000000
  a += bmi_1 * 3.7623897936404322000000000
  a += bmi_2 * -26.8045450074654320000000000

  /* Sum from boolean values */

  a += b_endometrial * 0.8742311851235286000000000
  a += b_type2 * 0.2655181024063555900000000
  a += new_abdopain * 0.6891953836735580400000000
  a += new_haematuria * 1.6798617740998527000000000
  a += new_imb * 1.7853122923827887000000000
  a += new_pmb * 4.4770199876067398000000000
  a += new_vte * 1.0362058616761669000000000

  /* Sum from interaction terms */

  /* Calculate the score itself */
  const score = a + -8.9931390822564037000000000
  return score
}
/**
 * ? Mapping Value Set
 * @param {*} age
 * @param {*} alcohol_cat4 -> RF.4
 * @param {*} b_chronicpan -> RF.27
 * @param {*} b_copd -> RF.28
 * @param {*} b_endometrial -> RF.29
 * @param {*} b_type2 -> RF.26
 * @param {*} bmi
 * @param {*} c_hb -> RF.56
 * @param {*} fh_breastcancer -> RF.24
 * @param {*} fh_gicancer -> RF.22
 * @param {*} fh_ovariancancer -> RF.25
 * @param {*} new_abdodist -> RF.33
 * @param {*} new_abdopain -> RF.32
 * @param {*} new_appetiteloss -> RF.30
 * @param {*} new_breastlump -> RF.49
 * @param {*} new_breastpain -> RF.51
 * @param {*} new_breastskin -> RF.50
 * @param {*} new_dysphagia -> RF.34
 * @param {*} new_gibleed -> RF.38
 * @param {*} new_haematuria -> RF.40
 * @param {*} new_haemoptysis -> RF.39
 * @param {*} new_heartburn -> RF.35
 * @param {*} new_imb -> RF.47
 * @param {*} new_indigestion -> RF.36
 * @param {*} new_necklump -> RF.43
 * @param {*} new_nightsweats -> RF.44
 * @param {*} new_pmb -> RF.46
 * @param {*} new_postcoital -> RF.48
 * @param {*} new_rectalbleed -> RF.37
 * @param {*} new_vte -> RF.45
 * @param {*} new_weightloss -> RF.31
 * @param {*} s1_bowelchange -> RF.52
 * @param {*} s1_bruising -> RF.55
 * @param {*} s1_constipation -> RF.53
 * @param {*} s1_cough -> RF.54
 * @param {*} smoke_cat -> RF.3
 * @param {*} town
 * @returns
 */
export default function (
  age,
  alcohol_cat4,
  b_chronicpan,
  b_copd,
  b_endometrial,
  b_type2,
  bmi,
  c_hb,
  fh_breastcancer,
  fh_gicancer,
  fh_ovariancancer,
  new_abdodist,
  new_abdopain,
  new_appetiteloss,
  new_breastlump,
  new_breastpain,
  new_breastskin,
  new_dysphagia,
  new_gibleed,
  new_haematuria,
  new_haemoptysis,
  new_heartburn,
  new_imb,
  new_indigestion,
  new_necklump,
  new_nightsweats,
  new_pmb,
  new_postcoital,
  new_rectalbleed,
  new_vte,
  new_weightloss,
  s1_bowelchange,
  s1_bruising,
  s1_constipation,
  s1_cough,
  smoke_cat,
  town
) {
  const allScore = {
    bloodCancer: blood_cancer_female(age, bmi, c_hb, new_abdopain, new_haematuria, new_necklump, new_nightsweats, new_pmb, new_vte, new_weightloss, s1_bowelchange, s1_bruising),
    breastCancer: breast_cancer_female(age, alcohol_cat4, bmi, fh_breastcancer, new_breastlump, new_breastpain, new_breastskin, new_pmb, new_vte, town),
    cervicalCancer: cervical_cancer_female(age, bmi, c_hb, new_abdopain, new_haematuria, new_imb, new_pmb, new_postcoital, new_vte, smoke_cat, town),
    colorectalCancer: colorectal_cancer_female(age, alcohol_cat4, bmi, c_hb, fh_gicancer, new_abdodist, new_abdopain, new_appetiteloss, new_rectalbleed, new_vte, new_weightloss, s1_bowelchange, s1_constipation),
    gastroOesophagealCancer: gastro_oesophageal_cancer_female(age, bmi, c_hb, new_abdopain, new_appetiteloss, new_dysphagia, new_gibleed, new_heartburn, new_indigestion, new_vte, new_weightloss, smoke_cat),
    lungCancer: lung_cancer_female(age, b_copd, bmi, c_hb, new_appetiteloss, new_dysphagia, new_haemoptysis, new_indigestion, new_necklump, new_vte, new_weightloss, s1_cough, smoke_cat, town),
    otherCancer: other_cancer_female(age, alcohol_cat4, b_copd, bmi, c_hb, new_abdodist, new_abdopain, new_appetiteloss, new_breastlump, new_dysphagia, new_gibleed, new_haematuria, new_indigestion, new_necklump, new_pmb, new_vte, new_weightloss, s1_constipation, smoke_cat),
    ovarianCancer: ovarian_cancer_female(age, bmi, c_hb, fh_ovariancancer, new_abdodist, new_abdopain, new_appetiteloss, new_haematuria, new_indigestion, new_pmb, new_vte, new_weightloss, s1_bowelchange),
    pancreaticCancer: pancreatic_cancer_female(age, b_chronicpan, b_type2, bmi, new_abdopain, new_appetiteloss, new_dysphagia, new_gibleed, new_indigestion, new_vte, new_weightloss, s1_bowelchange, smoke_cat),
    renalTractCancer: renal_tract_cancer_female(age, bmi, c_hb, new_abdopain, new_appetiteloss, new_haematuria, new_indigestion, new_pmb, new_weightloss, smoke_cat),
    uterineCancer: uterine_cancer_female(age, b_endometrial, b_type2, bmi, new_abdopain, new_haematuria, new_imb, new_pmb, new_vte)
  }
  let sum = 1
  let sum2 = 0
  Object.keys(allScore).forEach((key) => {
    allScore[key] = Math.exp(allScore[key])
    sum += allScore[key]
  })
  Object.keys(allScore).forEach((key) => {
    allScore[key] *= 100 / sum
    sum2 += allScore[key]
  })
  allScore.none = 100 - sum2
  return allScore
}
