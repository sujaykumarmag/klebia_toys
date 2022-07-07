const express = require('express');
const {protect} = require('../middlewares/auth')
const {
    getToys,
    createToy,
    updateToy,
    deleteToy
} = require('../controllers/toys');

// Creating Express router
const router = express.Router();

router
    .route('/')
    .get(protect,getToys)
    .post(protect,createToy)
    .put(protect,updateToy)
    .delete(protect,deleteToy)

module.exports = router;
