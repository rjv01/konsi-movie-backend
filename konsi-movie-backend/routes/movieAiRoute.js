const express = require("express");
const router = express.Router();

const {
    sendQues,
    sendMoviesData,
    
} = require("../routing/movieAICtr");

router.post("/api/sendques",sendQues);
router.post("/api/sendmoviesdata",sendMoviesData);

module.exports = router;
