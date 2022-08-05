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

module.exports = {
    getApiData
}