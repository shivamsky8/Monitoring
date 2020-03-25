const express = require("express");

const router = express.Router();
const route = require('./route')

router.use('/v1',route)


module.exports = router;
