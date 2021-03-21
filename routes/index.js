const router = require('express').Router()
const apiRoutes = require('./api');
const htmlRoutes = require('./html');
// const router = express.Router();

router.use(function (req, res, next) {
    console.log('########## IN ROUTES INDEX ##########\n%s %s %s %s', req.method, req.url, req.path, req.originalUrl);
    next();
  }
)

router.use('/api', apiRoutes);


module.exports = router;