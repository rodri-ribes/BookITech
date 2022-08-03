import Book from '../models/Book'
import Comment from '../models/Comment'
import User from '../models/User'


export const createProduct = async (req, res)=>{
    const {name, author, editorial, genre, language, format, price, stock, release_data, img} = req.body

    const comments = [];

    const newBook = new Book({name, author, editorial, genre, language, format, price, stock, release_data, img, comments})

    const bookSaved = await newBook.save()
    res.status(201).json(bookSaved)
}

export const createComment = async (req, res)=>{
    const {
        content,
        rating,
        spoiler = true,
        idUser,
        idBook
    } = req.body
    
    //validaciones

    if(!content) return res.json('No se pudo crear el comentario, esta vacio.')

    const bookFind = await Book.findById(idBook)
    const userFind = await User.findById(idUser)
    
    const newComment = new Comment({
        content,
        rating,
        spoiler,
        user: userFind._id,
        book: bookFind._id
    })
    try {
        const savedComment = await newComment.save()
        console.log(savedComment)

        bookFind.comments = bookFind.comments.concat(savedComment._id)
        await bookFind.save()

        userFind.comments = userFind.comments.concat(savedComment._id)
        await userFind.save()

        res.json(savedComment)

    } catch (e) {
        console.log(e)
        // next(e)
    }
}

export const createUser = async (req, res)=>{

    const {userName, fullName, email, phoneNumber, passwordHash} = req.body

    const comments = [];

    const newUser = new User({
        userName,
        fullName,
        email,
        phoneNumber,
        passwordHash,
        comments
    })

     await newUser.save()

    res.json(newUser)
}

export const getProducts = async (req, res)=>{
    const books = await Book.find({}).populate('comments',{
        content:1,
        rating: 1
    })
    res.json(books)
}

export const getUsers = async (req, res)=>{

    const users = await User.find({}).populate('comments')
    res.json(users)
    
}

export const getComments = async (req, res)=>{
    const comments = await Comment.find({}).populate('book user')
    res.json(comments)
}

// export const updateProductById = async (req, res)=>{
//     const { productId } = req.params
//     const updateProduct = await Book.findByIdAndUpdate(productId, {comments:[...comments, req.body]}, {new: true})
//     res.json(updateProduct)
// }

export const deleteComment = async (req, res) =>{
    const {id} = req.params
    console.log('aqui toy')
    const comentFind = await Comment.findByIdAndDelete(id);
    console.log(comentFind)
    res.json(comentFind)
}


// Borra todos en la db. CUIDADO
// export const deleteProducts = async (req, res)=>{
//     await User.remove()
//     await Book.remove()
//     await Comment.remove()
//     res.json('todo borrado')
// }

