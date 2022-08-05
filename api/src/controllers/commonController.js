const axios = require ("axios")

async function getApiData (req, res){
    try {
        let dataDefault = await axios(`https://api.itbook.store/1.0/search/mongo`)
        let apiData = await dataDefault.data.books.map(b => {
            return {
                title: b.title,
                subtitle: b.subtitle,
                isbn13: b.isbn13,
                price: b.price,
                image: b.image
            }
        })
        return apiData
    } catch (error) {
        console.log({error: "err"})
    }
}


async function getBooksByName (req, res){
    const { name } = req.params
    try {
        let bookSearched = []
        for (let i = 0; i < 10; i++) {
            let data = await axios(`https://api.itbook.store/1.0/search/${name}/${i}`)
            bookSearched.push(await data.data.books.map(b => b))
            
        }
        let dataDefault = bookSearched.flat()
        let apiData = dataDefault.map(b => {
            return {
                title: b.title,
                subtitle: b.subtitle,
                isbn13: b.isbn13,
                price: b.price,
                image: b.image
            }
        })
        console.log(apiData)
        Book.insertMany(apiData, (errors, insertedBooks) => {
            if(errors) {
              return res.status(400).json({ok: false, errors});
            }
        })
        // const bookSaved = await booksOnDb.save()
                res.status(201).send("ok") 
    } catch (error) {
        res.status(404).json({error: "An unexpected error occurred, please try again later"})
    }
}













async function getBooksByName (req, res){
    const { name } = req.params
    try {
        let bookSearched = []
        for (let i = 0; i < 10; i++) {
            let data = await axios(`https://api.itbook.store/1.0/search/${name}/${i}`)
            bookSearched.push(await data.data.books.map(b => b))
            
        }
        let dataDefault = bookSearched.flat()
        let apiData = dataDefault.map(b => {
            return {
                title: b.title,
                subtitle: b.subtitle,
                isbn13: b.isbn13,
                price: b.price,
                image: b.image
            }
        })
        // console.log(apiData)
        Book.insertMany(apiData, (errors, insertedBooks) => {
            if(errors) {
              return res.status(400).json({ok: false, errors});
            }
        })

        // const bookSaved = await booksOnDb.save()
                res.status(201).send("ok") 
    } catch (error) {
        res.status(404).json({error: "An unexpected error occurred, please try again later"})
    }
}





async function getBooksById (req, res){
    // const { id } = req.params
    try {
        let todo = await Book.find({}).select("isbn13")
        const tada = todo.map(b => b.isbn13)
        let array = []
        const arrayNoexiste = []
        // const elMap = tada.map(async (doc) => {
        //     var book = await axios.get("https://api.itbook.store/1.0/books/" + doc)
        //     .catch(() => {
        //     //     arrayNoexiste.push(doc)
        //     //     console.log(arrayNoexiste)
        //     //     return null
        //     } )
        //     if (!book){
        //         // arrayNoexiste.push(doc)
        //         return null
        //     }
        //     array.push(book.data)
        //     // console.log(book);
        // // console.log(book.data);
        // })

        tada.forEach((doc) => {
            axios.get("https://api.itbook.store/1.0/books/" + doc)
            .then(res => array.push(res.data))
            .catch((err) => {arrayNoexiste.push(doc) 
                return null})
            return null
            console.log(arrayNoexiste)
        }) 
        
        
        // let book = await axios(`https://api.itbook.store/1.0/books/${id}`)
        res.status(200).send(array) 
    } catch (error) {
        res.status(404).json({error: "An unexpected error occurred, please try again later"})
    }
}



// let todo = await Book.find({title: /jira/i})
    // const tada = todo.map(b => b.isbn13)

    
//REMOVER DUPLICATEDDDDD
    // const todo = await Book.aggregate([
    //     { $group: {
    //         _id: { isbn13: "$isbn13" },
    //         dups: { "$push": "$_id" },
    //         count: { "$sum": 1 }
    //     }},
    //     { $match: { "count": { "$gt": 1 } }}
    // ])
    // todo.forEach(async (doc) => {
    //     doc.dups.shift();
    //     await Book.remove({ "_id": {"$in": doc.dups }});
    // });
    // console.log(todo);










module.exports = {
    getApiData
}