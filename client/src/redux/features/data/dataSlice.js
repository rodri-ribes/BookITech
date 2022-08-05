import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        books: [],
        book: [],
        author: [],
        details: [],
        Cart: [],
        Favs: [],
        allBooks: [],
        NomAuthor: [],
        genre: [],
        format: [],
        range: [],
        A_Z: [],

    },
    reducers: {
        //**Aca irian los reducers, que modificarian el estado, dejo uno para que tengan como referencia.. */
        addLibro: (state, actions) => {
            state.books = actions.payload;
            state.allBooks = actions.payload;
        },
        //Search
        SearchTitle: (state, actions) => {
            return {
                ...state,
                book: actions.payload,
            };
        },
        SearchAuthor: (state, actions) => {
            state.author = state.allBooks.filter((e) =>
                e.author.includes(actions.payload)
            );
        },
        getBookDetails: (state, actions) => {
            state.details = actions.payload;
        },
        addCart: (state, actions) => {
            state.Cart = state.Cart.concat(
                state.books.filter((l) => l.isbn13 === actions.payload)
            );
        },
        deleteCart: (state, actions) => {
            state.Cart = state.Cart.filter((l) => l.isbn13 !== actions.payload);
        },
        FAuthor: (state, actions) => {
            let copiaA =
                actions.payload === 'all'
                    ? [...state.allBooks]
                    : state.allBooks.filter(
                          (e) => e.author === actions.payload
                      );
            return {
                ...state,
                NomAuthor: copiaA,
                books: copiaA,
            };
        },

        addFav: (state, actions) => {
            state.Favs = state.Favs.concat(state.books.filter(l => l.isbn13 === actions.payload))
        },
        deleteFav: (state, actions) => {
            state.Favs = state.Favs.filter(l => l.isbn13 !== actions.payload)
        },

        AllGenre: (state, actions) => {
            let copi =
                actions.payload === 'all'
                    ? [...state.allBooks]
                    : state.allBooks.filter((e) => e.genre === actions.payload);

            return {
                ...state,
                genre: copi,
                books: copi,
            };
        },
        Formats: (state, actions) => {
            let copy = [...state.allBooks];
            let pruebaa;
            if (actions.payload === 'pdf') {
                pruebaa = copy.filter((e) => e.format === actions.payload);
            }
            if (actions.payload === 'physical') {
                pruebaa = copy.filter((e) => e.format === actions.payload);
            }
            return {
                ...state,
                format: actions.payload === 'all' ? state.prueba : pruebaa,
                books: actions.payload === 'all' ? state.prueba : pruebaa,
            };
        },
        Range: (state, { payload }) => {
            let copirange = state.allBooks.filter(
                (e) =>
                    payload.max >= e.price.slice(1) &&
                    e.price.slice(1) >= payload.min
            );
            return {
                ...state,
                range: copirange,
                books: copirange,
            };
        },
        ORDEN: (state, actions) => {
            let copiABC = [...state.allBooks];
            let filterAZ =
                actions.payload === 'A-Z'
                    ? copiABC.sort((a, b) => {
                          if (a.title > b.title) {
                              return 1;
                          }
                          if (b.title > a.name) {
                              return -1;
                          }
                          return 0;
                      })
                    : copiABC.sort((a, b) => {
                          if (a.title > b.title) {
                              return -1;
                          }
                          if (b.title > a.title) {
                              return 1;
                          }
                          return 0;
                      });
            return {
                ...state,
                A_Z: actions.payload === 'all' ? [...state.allBooks] : filterAZ,
                books:
                    actions.payload === 'all' ? [...state.allBooks] : filterAZ,
            };
        },
    },
});

//Cada reducer que creen lo tienen que exportar asi




export const {
    addLibro,
    SearchAuthor,
    SearchTitle,
    getBookDetails,
    addCart,
    addFav,deleteFav
    deleteCart,
    FAuthor,
    AllGenre,
    Formats,
    Range,
    ORDEN,
} = dataSlice.actions;


//Aca exportamos el dataSlice para tenerlo en la carpeta store, index.js

export default dataSlice.reducer;

//Aca irian las actions, dejo una como modo de ejemplo

export const getLibros = () => async (dispatch) => {
    try {
        const resp = await axios.get(`http://localhost:3001/books`);
        dispatch(addLibro(resp.data));
    } catch (error) {
        console.log(error);
    }
};

//Search
export const disSearch = (payload) => async (dispatch) => {
    dispatch(SearchTitle(payload));
};
export const getSearch = (name) => async (dispatch) => {
    try {
        let buscar = await axios.get(
            //URL PARA BUSCAR
            `http://localhost:3001/books/${name}`
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
        const resp = await axios.get(`http://localhost:3001/books/id/${id}`);
        dispatch(getBookDetails(resp.data));
    } catch (error) {
        console.log(error);
    }
};

export const AddCart = (id) => async (dispatch) => {
    dispatch(addCart(id));
};
export const DeleteCart = (id) => async (dispatch) => {

    dispatch(deleteCart(id))
}
export const addFavs = (id) => async (dispatch) => {
    dispatch(addFav(id))
}
export const deleteFavs = (id) => async (dispatch) => {
    dispatch(deleteFav(id))
}

export const FilterAuthor = (payload) => async (dispatch) => {
    dispatch(FAuthor(payload));
};

export const FilterGenre = (payload) => async (dispatch) => {
    dispatch(AllGenre(payload));
};

export const FilterFormat = (payload) => async (dispatch) => {
    dispatch(Formats(payload));
};
export const PriceRange = (payload) => async (dispatch) => {
    dispatch(Range(payload));
};
export const ORdenAZ = (payload) => async (dispatch) => {
    dispatch(ORDEN(payload));
};
