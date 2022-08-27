
//SAVE BOOKS IN DB
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


//SEARCH IN API BY EACH ISBN13 ON DB
async function getBooks (req, res){
    try {
        let todo = await Book.find({}).select("isbn13")
        const tada = todo.map(b => b.isbn13)
        let array = []
        let tada1 = tada.slice(501, 1000)
        for (let i = 0; i < tada1.length; i++) {
            console.log(i);
            let info = await axios(`https://api.itbook.store/1.0/books/${tada1[i]}`)
            console.log(info.data);
            array.push(await info.data)
        }
        res.status(200).send(array) 
    } catch (error) {
        res.status(404).json({error: "An unexpected error occurred, please try again later"})
    }
}

//REMOVE DUPLICATED
async function getBooks (req, res){
    const todo = await Book.aggregate([
        { $group: {
            _id: { isbn13: "$isbn13" },
            dups: { "$push": "$_id" },
            count: { "$sum": 1 }
        }},
        { $match: { "count": { "$gt": 1 } }}
        ])
        todo.forEach(async (doc) => {
            doc.dups.shift();
            await Book.remove({ "_id": {"$in": doc.dups }});
        });
        console.log(todo);
}

//SEARCH GETBOOK IN API

async function getBooks (req, res){
    try {
        let booksDefault = []
        for (let i = 0; i < 100; i++) {
            let data = await axios(`https://api.itbook.store/1.0/search/mongo/${i}`)
            booksDefault.push(await data.data.books.map(b => b))
        }
        let dataDefault = booksDefault.flat()
        let apiData = dataDefault.map(b => {
            return {
                title: b.title,
                subtitle: b.subtitle,
                isbn13: b.isbn13,
                price: b.price,
                image: b.image
            }
        })
            res.status(200).send(apiData) 
    } catch (error) {
        res.status(404).json({error: "An unexpected error occurred, please try again later"})
    }
}

//SEARCH GETBYNAME IN API

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
                res.status(200).send(apiData) 
        } catch (error) {
            res.status(404).json({error: "An unexpected error occurred, please try again later"})
        }
    }

//SEARCH GETBYID IN API

async function getBooksById (req, res){
    const { id } = req.params
    try {
        let book = await axios(`https://api.itbook.store/1.0/books/${id}`)
        delete book.data.error
        delete book.data.isbn10
        delete book.data.url
        res.status(200).send(book.data) 
    } catch (error) {
        res.status(404).json({error: "An unexpected error occurred, please try again later"})
    }
}

//API ROUTES 

router.get("/", getBooks)

router.get("/:name", getBooksByName)

router.get("/id/:id", getBooksById)


