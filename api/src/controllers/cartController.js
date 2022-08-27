const Cart = require('../models/Cart.js')

const getCart = async (req, res) => {
    let { id } = req.params;

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

        encontrado.cart = carrito;
        await encontrado.save()
        return res.send("borrado")
    }
    catch (error) {
        console.log(error)
    }
}

const deleteOneBookInCart = async (req, res) => {
    let { idUser, idBook } = req.body;

    try {
        let encontrado = await Cart.findOne({ user: idUser })

        let carrito = [];

        encontrado.cart.forEach(c => {
            if (c._id === idBook) {
                if (c.cantidad === 1) {
                    carrito = encontrado.cart.filter(c => c._id !== idBook)
                } else if (c.cantidad > 1) {
                    c.cantidad--;
                }
            }
        })

        if (carrito.length > 0) {
            encontrado.cart.length = 0;
            encontrado.cart = carrito;
            await encontrado.save()
            return res.send("se borro el ultimo")
        }

        await encontrado.save()
        res.send("fue el ultimo libro, se borro")
    } catch (error) {
        console.log(error)
    }
}



const addCart = async (req, res) => {

    let { idBook, cantBook, idUser } = req.body;

    if (cantBook === undefined) {
        cantBook = 1
    }

    try {
        let encontrado = await Cart.findOne({
            user: idUser
        })
        if (encontrado) {
            let existe = encontrado.cart.filter(c => c._id === idBook)

            if (existe.length > 0) {
                encontrado.cart.forEach(c => {
                    if (c._id === idBook) {
                        c.cantidad = parseInt(c.cantidad) + 1
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
    deleteOneBookInCart,
    addCart
}