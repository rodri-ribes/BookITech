const Book = require("../models/Book");
const User = require("../models/User");

async function postComments(req, res) {
    let idBook = req.params.id;
    const { _id } = req.query

    let { content, fecha, user } = req.body;
    try {
        let usuario = await User.findOne({ _id: _id });
        let book = await Book.findOne({ isbn13: idBook });
        console.log(book.image);

        book.comments.push({
            date: fecha,
            content: content,
            user: user,
        });
        usuario.comments.push({
            title: book.title,
            image: book.image,
            id: book.isbn13,
            date: fecha,
            content: content,
            user: user,
        });

        await book.save();
        await usuario.save()
        res.send("Cargado");
    } catch (error) {
        console.log(error);
    }
}

async function updateComments(req, res) {
    let idBook = req.params.id;
    let idComment = req.params.idcomment;

    let { content, fecha, type } = req.body;

    let date = fecha || null
    if(type) {
        let book = await Book.findOne({ isbn13: idBook}).catch( err => console.log(err))
        if(!book) return res.status(400).send("book not found")
        book.comments.forEach(comment => {
            if(comment._id == idComment) {
                comment.flagged = type.flag  
                comment.reviewed = true
            }})
        console.log(book)
        const success = await book.save().catch( err => console.log(err))
        if(!success) return res.status(400).send("failed")
        return res.status(200).send(success)

    }

    try {
        let encontrado = await Book.findOne({ isbn13: idBook });

        encontrado.comments.forEach((c) => {
            if (c.id == idComment) {
                c.content = content;
                c.date = date;
            }
        });
        await encontrado.save();
        res.send("editado");
    } catch (error) {
        console.log(error);
    }
}

async function deleteComments(req, res) {
    let idBook = req.params.id;

    let idComment = req.params.idcomment;

    try {
        let encontrado = await Book.findOne({ isbn13: idBook });

        if (encontrado.comments.length === 1) {
            encontrado.comments.splice(0);
            await encontrado.save();
            return res.send("borrado");
        } else {
            let comment = encontrado.comments.filter((c) => c.id !== idComment);
            encontrado.comments.length = 0;
            encontrado.comments = comment;
            await encontrado.save();
            return res.send("borrado");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    postComments,
    updateComments,
    deleteComments,
};
