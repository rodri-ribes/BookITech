export function cantidadDeBooksEnLaDB(cartUser, idBook) {
    let sumador = 0;
    cartUser.forEach(e => {
        e.cart.forEach(l => {
            if (l._id === idBook) {
                sumador = l.cantidad + 1;
            }
        })
    });

    return sumador
}