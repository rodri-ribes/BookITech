//Function Fav
const Favorite = require('../models/Favorite');
const Books  = require('../models/Book')
const Users = require('../models/User')

//Post agregar libros en fav
async function PostFav(req, res) {
    const {email} = req.query;
   const {id} = req.body;    
    try {
        if(email){
            if(id){
            let _id = id;
            const book = await Books.findOne({isbn13:_id})
            const user = await Users.findOne({email}) 
            const x = await Favorite.findOne({book,user}).populate("book")
            if(x){
                return res.status(400).send('Same book can send twice')
            }
            else{
                const all = new Favorite({book,user})
                await all.save()
                return res.status(200).send('Agregado correctamente')
            }
        }

        }
    } catch (err){
        res.status(404).send('No se encontro')
    }
}

async function GetFavById(req, res){
    const {email}= req.query
    try{
            if(email){
            
                let user = await Users.findOne({email})
                let fav = await Favorite.find({user}).select(["book"]).populate("book")
                fav=fav.map(l=>l.book.isbn13)
            //    console.log(Favorite.book.isbn13)
                if(fav.length ===0){
                    return res.status(202).send([])
                }
               return  res.status(200).send(fav)
            }
    }
    catch (err){
        res.status(404).send('No me trajo los Fav')
    }
}

//Cuando se inician la cuenta y ver si tiene fav
async function GetFav (req,res) {
    const {email} = req.query
    try {
        if(email){
            
            let user = await Users.findOne({email})
            let fav = await Favorite.find({user}).populate('book')
        //    console.log(Favorite.book.isbn13)
            if(fav.length ===0){
                return res.status(202).send([])
            }
           return  res.status(200).send(fav)
        }
        else{
            let favorita = await Favorite.find()
            res.status(200).send(favorita)
        }
        // let all = await Favorite.find()
        // res.status(200).send(all)
    } catch (err){
        res.status(404).send('No me trajo los Fav')
    }
}


//Cuando estoy en la cuenta elimino mis favoritos
// async function DeleteFav(req,res) {
//     const {email} = req.query
//     const {id} = req.body
//     try {
//         if(email && id){
                
//                 let book= await Books.findOne({isbn13: id})
//                 let delet = await Favorite.findOneAndDelete({book:book})
//                     res.status(200).json(delet)
//                 if(!delet){
//                     return res.status(404).send('No tenes mas ese libro')
//                 }
//             }
//             else {
//                 res.status(202).send('Falta el libro para eliminar o email')
//             }
        
//     } catch(err){
//         res.status(404).send('No se pudo eliminar')
//     }
// }
async function DeleteFav(req,res) {
    const {email} = req.query
    const {id} = req.body
    try {
        if(email && id){
            let user = await Users.findOne({email})
                let fav = await Favorite.find({user})
                if(fav.length){
                    let book= await Books.findOne({isbn13: id})

                    let delet = await Favorite.findOneAndDelete({book,user})
                    res.status(200).json(delet)
                    if(!delet){
                    res.status(404).send('No tenes mas ese libro')
                    }
                }
                else{
                    res.status(404).send('Lista de libros vacio')
                }
                // console.log(delet)
               
            }
            else {
                res.status(202).send(console.log(email,id))
            }
        
    } catch(err){
        res.status(404).send('No se pudo eliminar')
    }
}


module.exports ={  PostFav,GetFav,DeleteFav,GetFavById}