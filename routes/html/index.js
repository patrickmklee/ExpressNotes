// const express = require('express')
const router = require('express').Router();
const path = require('path')


// const router = express.Router();
// router = express.router()
// middleware that is specific to this router
router.use(function (req, res, next) {
  console.log('######### IN HTMLROUTES ########## \n   %s %s %s %s', req.method, req.url, req.path, req.body);
  next('route');
}, function(req, res, next) {
    console.log(req.originalUrl)
    next();
})
// router.get('/*')

module.exports = router;
