var express = require('express');
var router = express.Router();

/* post doLogin page. */
router.post('/', function (req, res, next) {

    // 如果未接受到值则重定向到login页
    if (!req.body.email) {
        res.redirect('/login');
    }

    var user = {
        username: "Ⅸ半城戒ㄣ木",
        email: req.body.email
    };
    req.session.user = user;

    res.redirect('/');
});

/**
 * 如果是get方式直接重定向到login
 **/
router.get('/', function (req, res, next) {
    res.redirect('/login');
});

module.exports = router;