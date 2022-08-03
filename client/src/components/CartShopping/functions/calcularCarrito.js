export default function calcularCarrito(contador, books) {
    let suma = 0;

    books.forEach(e => {
        let precio = e.price.slice(1)
        if (contador[e.title] > 0) {
            suma += parseFloat(precio) * contador[e.title]
        }
    });

    return suma;
}