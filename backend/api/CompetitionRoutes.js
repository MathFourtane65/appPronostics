const router = require("express").Router();
const Competition = require("../models/Competition");
var competitionController = require("../api/CompetitionController");

router.get("/", (req, res) => {
  Competition.find()
    .then((competitions) => {
      res.status(200).json(competitions);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', competitionController.createCompetition);
router.get('/:id', competitionController.getOneCompetition);
router.delete('/:id', competitionController.deleteCompetition);

module.exports = router;

