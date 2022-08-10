const User = require('../models/User.js')


const saveSignIn = async (req, res) => {

    let { email, displayName, photoURL } = req.body;
    console.log(email, displayName, photoURL)
    let exist = await User.findOne({ email });

    if (!exist) {
        await User.create({
            email,
            fullName: displayName,
            img: photoURL
        })
        return res.send("creado");
    }
    return res.send("ya existe");
    // return res.status(200);
}

module.exports = saveSignIn;