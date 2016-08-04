var express = require('express');
var router = express.Router();
var StickerService = require('../service/sticker-service');
var Auth = require('../service/auth');
var Q = require('q');

router.get('/', function(req, res, next) {
    Auth.stickerAccessible(req)
    .fail(function(err){
      res.status(err.status).end();
    })
    .then(function(data){
      next();
    })
});
router.get('/', function(req, res, next) {
    StickerService.fetchList(req)
    .fail(function(err){
        res.status(err.status).end();
    })
    .then(function(data){
        res.json(data);
    });
});

module.exports = router;
