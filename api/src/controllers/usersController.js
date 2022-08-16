const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../models/User");

async function GetUser(req, res) {
    try {
        const { id } = req.params;

        // let _id = id
        let user = await User.findById(id)
        res.status(200).send(user)

    } catch (err) {
        res.status(404).send('Fallo en el id')
    }

}
async function PutUser(req, res) {
    try {
        const { fullName, img, phone } = req.body
        const { id } = req.params

        if (fullName && img && phone) {

            let upDate = { fullName, img, phone }
            await User.findByIdAndUpdate(id, upDate)
            return res.status(200).send('Actualizado')
        }
        return res.status(404).send('falta el body')

    } catch (err) {
        res.status(404).send('Fallo en el PUT')
    }
}


async function loginUser(req, res) {

    const { email, password } = req.body;


    const user = await User.findOne({
        email

    })

    if (user) {

        const pass = bcrypt.compare(password, user.passwordHash)

        if (pass) {

            const token = jwt.sign({ _id: user.id }, 'secretKey')
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                token: token,
                ban: user.ban,
                img: user.img,
                phone: user.phone,
                // rrss: user.rrss,
                option: user.option,
                rol: user.rol
            })
        } else {

            res.status(401).send("invalid user or password")
        }
    } else {
        res.status(401).send("invalid user or password")
    }
};



async function createUser(req, res) {
    const { fullName, email, password } = req.body;

    console.log(fullName, email, password)

    if (fullName && email && password) {




        let existe = await User.findOne({
            email
        })




        if (existe) {
            return res.status(401).send("The user is already registered");
        } else {

            let passwordHash = await bcrypt.hash(password, 10);


            //const newUser = await User.save({
            //    name, email, password, passwordHash
            //})

            const newUser = new User({ fullName, email, passwordHash })
            await newUser.save();


            const token = jwt.sign({ _id: newUser.id }, 'secretKey')

            res.status(200).json({
                id: newUser.id,
                name: newUser.fullName,
                email: newUser.email,
                token: token,
                ban: newUser.ban,
                img: newUser.img,
                phone: newUser.phone,
                address: newUser.address,
                // rrss: newUser.rrss,
                option: newUser.option,
                rol: newUser.rol
            })
        }
    }
}
async function GetUser (req,res) {
    try{
        const {id} = req.params;
       
            // let _id = id
            let user = await User.findById(id)
            res.status(200).send(user)
        
    } catch(err){
        res.status(404).send('Fallo en el id')
    }
    
}
async function PutUser (req,res){
    try{
        const {fullName, img, phone, address } = req.body
        const{id}= req.params
        
            if(fullName || img || phone || address){
                
                let upDate = {fullName, img, phone, address}
                 await User.findByIdAndUpdate(id,upDate)
                return res.status(200).send('Actualizado')
            }
           return  res.status(404).send('falta el body')
        
    } catch(err){
        res.status(404).send('Fallo en el PUT')
    }
}
async function PostBook (req,res){
    try {
        const {email} = req.params;
        const {id} = req.body ;
        // const nomb = await User.find()
        // let isbn13 = id
        // let _id = id
        

            const user = await Book.findById(id)
        const nomb = await User.findOne({email})
        // console.log(user)
       nomb.buy.push(user)
        // console.log(nomb.option)

        await nomb.save()
        // console.log(user)
        res.status(200).send('actualizado')
        
    } catch(err){
        res.status(404).send('No pudimos comprar el libro')
    }
}



module.exports = {
    loginUser,
    createUser,
    GetUser,
    PutUser,
    PostBook
}
