const router = require('express').Router();
const db = require('../../dbConnection');
const kakeiboController = require('../controllers/kakeiboController');

router.get('/kekibo/get', (req, res) => kakeiboController.getData(req, res, db));
router.post('/kakeibo/post',(req, res) => kakeiboController.postData(req, res, db));
router.put('/kekibo/put',(req, res) => kakeiboController.putData(req, res, db));

module.exports = router;