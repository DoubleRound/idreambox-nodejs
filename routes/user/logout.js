var express = require('express');
var router = express.Router();

/* GET logout page. */
router.get('/', function (req, res, next) {
    
    // 将user session置为空
    req.session.user = null;
    res.locals.user = null;

    res.render('user/login', {title: 'iDreambox - Login'});
});

module.exports = router;