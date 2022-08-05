const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../models/User");




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
                token: token
            })
        } else {

            res.status(401).send("invalid user or password")
        }
    } else {
        res.status(401).send("invalid user or password")
    }
};



async function createUser (req, res) {
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

            const newUser = new User ({fullName, email, passwordHash})
                await newUser.save(); 


            const token = jwt.sign({ _id: newUser.id }, 'secretKey')

            res.status(200).json({
                id: newUser.id,
                name: newUser.fullName,
                email: newUser.email,
                token: token
            })
        }
    }
}


module.exports = {
    loginUser,
    createUser
}
