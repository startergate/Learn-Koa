const Book = require('models/book');

exports.list = async (ctx) => {
    let books;

    try {
        books = await Book.find()
          .sort({_id: -1})
          .limit(3)
          .exec();
    } catch (e) {
        return ctx.throw(500, e)
    }



    ctx.body = books;
};

exports.create = async (ctx) => {
    const {
        title,
        authors,
        publishedDate,
        price,
        tags
    } = ctx.request.body;

    const book = new Book({
        title,
        authors,
        publishedDate,
        price,
        tags
    });

    try {
        await book.save();
    } catch (e) {
        return ctx.throw(500, e);
    }
    ctx.body = book;
};

exports.delete = (ctx) => {
    ctx.body = 'deleted';
};

exports.replace = (ctx) => {
    ctx.body = 'replaced';
};

exports.update = (ctx) => {
    ctx.body = 'updated';
};

exports.get = async ctx => {
    const { id } = ctx.params;

    let book;

    try {
        book = await Book.findById(id).exec();
    } catch (e) {
        return ctx.throw(500, e);
    }

    if (!book) {
        ctx.status = 404;
        ctx.body = { message: 'book not found' };
        return;
    }

    ctx.body = book;
};