const Router = require('koa-router');

const books = require('./books');

const router = new Router();

router.use('/books', books.routes());

module.exports = router;