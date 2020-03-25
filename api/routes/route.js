const express = require("express");

const router = express.Router();
const { getWorldWide , getCountryWise ,getAffectedCountry} = require("../controller/controller");

router.route('/get').get(getWorldWide);

router.route('/country-wise').get(getCountryWise)

router.route('/affected-country').get(getAffectedCountry)

module.exports = router;
