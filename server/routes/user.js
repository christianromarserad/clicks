const router = require('express').Router();

router.get('/', (req, res) => {
   //TODO WITH AUTHENTICATION
   res.send("getDailyCounts");
});

router.put('/incrementCount', (req, res) => {
   //TODO WITH AUTHENTICATION
   res.send("incrementCount");
});

router.get('/topusers', (req, res) => {
   //TODO
   res.send("getTopClicks");
});

module.exports = router;
