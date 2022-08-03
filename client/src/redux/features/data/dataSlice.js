
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const dataSlice = createSlice({
    name: "data",
    initialState: {
        books: [],
        projects: [],
        book: [],
        author: [],
        details: [],
    },
    reducers: {
        //**Aca irian los reducers, que modificarian el estado, dejo uno para que tengan como referencia.. */
        addLibro: (state, actions) => {
            state.books = actions.payload;
        },
        //Search
        SearchTitle: (state, actions) => {
            return {
                ...state,
                book: actions.payload,
            };
        },
        SearchAuthor: (state, actions) => {
            state.author = state.allprojects.filter((e) =>
                e.author.includes(actions.payload)
            );
        },
        getBookDetails: (state, actions) => {
            state.details = actions.payload
        },

    }
})

//Cada reducer que creen lo tienen que exportar asi

export const { addLibro, SearchAuthor, SearchTitle, getBookDetails } = dataSlice.actions;

//Aca exportamos el dataSlice para tenerlo en la carpeta store, index.js

export default dataSlice.reducer;

//Aca irian las actions, dejo una como modo de ejemplo 

export const getLibros = () => async (dispatch) => {

    try {
        const resp = await axios.get(`http://localhost:3001/books`)
        dispatch(addLibro(resp.data))
    } catch (error) {
        console.log(error)
    }
}

//Search
export const disSearch = (payload) => async (dispatch) => {
    dispatch(SearchTitle(payload));
};
export const getSearch = (name) => async (dispatch) => {
    try {
        let buscar = await axios.get(
            //URL PARA BUSCAR
            http://localhost:3001/books/${name}
        );
        dispatch(disSearch(buscar.data));
        // console.log(buscar.data);
    } catch (error) {
        alert('No hay libros');
        console.log(error);
    }
};

export const getSearchAuthor = (payload) => (dispatch) => {
    dispatch(SearchAuthor(payload));
};


export const getBookDetail = (id) => async (dispatch) => {
    try {
        const resp = await axios.get(`http://localhost:3001/Book/${id}`)
        dispatch(getBookDetail(resp.data))
    } catch (error) {
        console.log(error)
    }
}