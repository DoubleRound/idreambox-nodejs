var express = require('express');
var router = express.Router();

/* post doLogin page. */
router.post('/', function (req, res, next) {

    var user = {
        username: "Ⅸ半城戒ㄣ木",
        email: req.body.email
    };
    req.session.user = user;

    res.redirect('/');
});

module.exports = router;