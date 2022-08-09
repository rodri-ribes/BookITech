const Cart = require('../models/Cart.js')

const getCart = async (req, res) => {
    let { id } = req.body;

    if (id) {
        try {
            let list = await Cart.find({ user: id })
            res.json(list)
        } catch (error) {
            console.log(error)
        }
    }
}

const deleteBookInCart = async (req, res) => {
    let { idUser, idBook } = req.body;
    try {
        let encontrado = await Cart.findOne({ user: idUser })

        let carrito = encontrado.cart.filter(c => c._id !== idBook)

        if (encontrado.cart.length < 2) {
            encontrado.cart.splice(0);
            await encontrado.save()
            return res.send("se borro el ultimo")
        } else {
            encontrado.cart.length = 0;
            encontrado.cart = carrito;
            await encontrado.save()
            return res.send("borrado")
        }
    } catch (error) {
        console.log(error)
    }
}

const addCart = async (req, res) => {

    let { idBook, cantBook, idUser } = req.body;

    console.log(idBook, cantBook, idUser)

    try {
        let encontrado = await Cart.findOne({
            user: idUser
        })
        if (encontrado) {
            let existe = encontrado.cart.filter(c => c._id === idBook)
            console.log(existe)
            if (existe.length > 0) {
                encontrado.cart.forEach(c => {
                    if (c._id === idBook) {
                        c.cantidad = cantBook
                    }
                })
                await encontrado.save();
                return res.send("actualizado")
            }

            encontrado.cart.push({
                _id: idBook,
                cantidad: cantBook
            })
            await encontrado.save();
            return res.send("agregado")

        } else {
            await Cart.create({
                user: idUser,
                cart: [{
                    _id: idBook,
                    cantidad: cantBook
                }]
            })
            res.send("agregado y creado")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getCart,
    deleteBookInCart,
    addCart
}