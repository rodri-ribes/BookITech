const Book = require("../models/Book");


async function postComments(req, res) {

    let idBook = req.params.id;

    let { content, fecha, user } = req.body;
    try {
        let book = await Book.findOne({ isbn13: idBook });

        book.comments.push({
            date: fecha,
            content: content,
            user: user,
        })

        await book.save()
        res.send("Cargado")

    } catch (error) {
        console.log(error)
    }
}


async function updateComments(req, res) {

    let idBook = req.params.id;
    let idComment = req.params.idcomment;

    let { content, fecha } = req.body;

    let date = fecha || null
    
    if(typeof content == 'object') {
        console.log(content)
        let book = await Book.findOne({ isbn13: idBook}).catch( err => console.log(err))
        if(!book) return res.status(400).send("book not found")
        book.comments.forEach(comment => {
            if(comment.id == idComment) {
                comment.flagged = content.flagged 
                comment.reviewed = content.reviewed
            }
        })
        await book.save()
        return res.status(200)
    }
    
    try {

        let encontrado = await Book.findOne({ isbn13: idBook });

        encontrado.comments.forEach(c => {
            if (c.id == idComment) {
                c.content = content
                c.date = date
            }
        })
        await encontrado.save()
        res.send("editado")

    } catch (error) {
        console.log(error)
    }

}

async function deleteComments(req, res) {

    let idBook = req.params.id;

    let idComment = req.params.idcomment;

    try {

        let encontrado = await Book.findOne({ isbn13: idBook })

        if (encontrado.comments.length === 1) {
            encontrado.comments.splice(0)
            await encontrado.save()
            return res.send("borrado")
        } else {
            let comment = encontrado.comments.filter(c => c.id !== idComment)
            encontrado.comments.length = 0
            encontrado.comments = comment;
            await encontrado.save()
            return res.send("borrado")
        }
    }
    catch (error) {
        console.log(error)
    }

}

module.exports = {
    postComments,
    updateComments,
    deleteComments,
}