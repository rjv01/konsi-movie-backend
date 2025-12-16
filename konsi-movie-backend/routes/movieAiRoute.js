const express = require("express");
const router = express.Router();

const {
    sendQues,

} = require("../routing/movieAICtr");

router.post("/api/sendques",sendQues);

module.exports = router;