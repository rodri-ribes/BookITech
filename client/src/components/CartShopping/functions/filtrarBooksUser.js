export default function filtrarBooksUser(booksTotal, cartUser) {
    let carrito = [];
    booksTotal.forEach(e => {
        cartUser.forEach(c => {
            if (e.isbn13 === c._id) {
                console.log("entro")
                carrito.push({ title: e.title, subtitle: e.subtitle, image: e.image, isbn13: e.isbn13, price: e.price, cantidad: c.cantidad })
            }
        })
    });
    return carrito
}
