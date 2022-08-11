export default function calcularCantidadUser(carritoUser, setState) {
    carritoUser.forEach(e => {
        setState(pre => ({
            ...pre,
            [e.title]: e.cantidad
        }))
    });

}