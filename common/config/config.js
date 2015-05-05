/**
 * 系统的所有配置相关的东西
 **/
require('../util/extends');

var env = 'dev'; // dev or product
var devloper = 'WilsonTan'; // 开发者

var settings = {
    base: {
        appName: "iDreambox",
        version: "0.0.1",
        env: env,
        cookie: {
            secret: "C0F81E480B02E8EBF1F25CDB12EDF81D",
            id: 'iDreambox.org'
        },
        session: {
            secret: "C0F81E480B02E8EBF1F25CDB12EDF81D",
            id: 'iDreambox.org',
            maxAge: 1000 * 60 * 30
        },

        // 设置不拦截的请求路径
        excludePattern: "/login,/doLogin,/reg",

        desc: '基本配置'
    },
    dev: {
        defaults: {
            hostname: {
                host: "127.0.0.1",
                port: 3000
            },
            mongodb: {
                host: "localhost",
                port: "27017",
                dbname: "idreambox",
                username: "",
                password: ""
            }
        },
        WilsonTan: {
            hostname: {
                host: "127.0.0.1",
                port: 3000
            },
            mongodb: {
                host: "localhost",
                port: "27017",
                dbname: "idreambox",
                username: "",
                password: ""
            }
        },
        desc: '开发环境配置'
    },
    product: {
        hostname: {
            host: "http://www.idreambox.org",
            port: 80
        },
        mongodb: {
            host: "",
            port: "27017",
            name: "idreambox",
            username: "",
            password: ""
        },
        desc: '生产环境配置'
    }

};

var c = env === 'dev' ? settings[env][devloper] : settings[env],
    mongo = c.mongodb;
c.mongodb.url = "mongodb://" + mongo.host + ":" + mongo.port + "/" + mongo.dbname;

module.exports = settings.base.extend(c);
