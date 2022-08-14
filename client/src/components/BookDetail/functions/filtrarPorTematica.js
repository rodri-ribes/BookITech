import axios from 'axios'
const { REACT_APP_API } = process.env

export async function filtrarPorTematica(name) {
    const tematica = [
        'mongo',
        'mongodb',
        'mongoose',
        'java',
        'javascript',
        ' html',
        'css',
        'python',
        'php',
        'react',
        'redux',
        'perl',
        'swift',
        'rust',
        'sql',
        'ruby',
        'ajax',
        'typescript',
        'express.js',
    ];

    let existe;
    let nombre = "java"
    tematica.forEach(e => {
        if (nombre.indexOf(e) !== -1) {
            console.log(e)
            existe = e
        }
    })

    let data = []

    axios.get(REACT_APP_API + `/books/${existe}`).then(c => {
        data = c.data
    })
        .catch(c => console.log(c))
    return data
}
