import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { capitalize } from '../../../components/auxiliar/capitalize';

const {REACT_APP_API} = process.env

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        books: [],
        book: [],
        details: [],
        Cart: [],
        Favs: [],
        allBooks: [],
        Theme: [],
        range: [],
        comments: [],
        A_Z: [],
        user: [],
        MinToMax: [],
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
                books: actions.payload,
            };
        },
        addCart: (state, actions) => {
            state.Cart = state.Cart.concat(
                state.books.filter((l) => l.isbn13 === actions.payload)
            );
        },
        deleteCart: (state, actions) => {
            state.Cart = state.Cart.filter((l) => l.isbn13 !== actions.payload);
        },
        FilterTheme: (state, actions) => {
            let copiaA =
                actions.payload === 'all'
                    ? [...state.allBooks]
                    : actions.payload;
            return {
                ...state,
                Theme: copiaA,
                books: copiaA,
            };
        },

        addFav: (state, actions) => {
            state.Favs = state.Favs.concat(
                state.books.filter((l) => l.isbn13 === actions.payload)
            );
        },
        deleteFav: (state, actions) => {
            state.Favs = state.Favs.filter((l) => l.isbn13 !== actions.payload);
        },

        Range: (state, { payload }) => {
            if (payload.min === payload.max) {
                state.books = [...state.books];
                state.range = [...state.books];
                alert('Max and Min are the same, please make them different');
            } else if (payload.min > payload.max) {
                state.books = [...state.books];
                state.range = [...state.books];
                alert('Min is greater than Max');
            } else {
                let copirange = state.books.filter(
                    (e) =>
                        Number(e.price.slice(1)) >= Number(payload.min) &&
                        Number(payload.max) >= Number(e.price.slice(1))
                );
                if (!copirange.length) {
                    state.books = [...state.books];
                    state.range = [...state.books];
                    alert('price range not found');
                } else {
                    return {
                        ...state,
                        range: copirange,
                        books: copirange,
                    };
                }
            }
        },
        ORDEN: (state, actions) => {
            let copiABC = [...state.books];
            let filterAZ =
                actions.payload === 'A-Z'
                    ? copiABC.sort((a, b) => {
                          if (a.title > b.title) {
                              return 1;
                          }
                          if (b.title > a.title) {
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
                A_Z: actions.payload === 'all' ? [...state.books] : filterAZ,
                books: actions.payload === 'all' ? [...state.A_Z] : filterAZ,
            };
        },
        MINtoMAX: (state, actions) => {
            let cambiar = [...state.books];
            let filtrar;
            if (actions.payload === 'MintoMax') {
                filtrar = cambiar.sort(
                    (a, b) =>
                        Number(a.price.slice(1)) - Number(b.price.slice(1))
                );
            }
            if (actions.payload === 'MaxtoMin') {
                filtrar = cambiar.sort(
                    (a, b) =>
                        Number(b.price.slice(1)) - Number(a.price.slice(1))
                );
            }
            return {
                ...state,
                books: actions.payload === 'all' ? cambiar : filtrar,
            };
        },
        addUser: (state, actions) => {
            state.user = actions.payload;
        },
        comments: (state, actions) => {
            state.comments=actions.payload;
        }
    },
});

//Cada reducer que creen lo tienen que exportar asi

export const {
    addLibro,
    SearchTitle,
    addCart,
    addFav,deleteFav,
    deleteCart,
    FilterTheme,
    Range,
    ORDEN,
    MINtoMAX,
    addUser,
    comments,

} = dataSlice.actions;

//Aca exportamos el dataSlice para tenerlo en la carpeta store, index.js

export default dataSlice.reducer;

//Aca irian las actions, dejo una como modo de ejemplo

export const getLibros = () => async (dispatch) => {
    try {
        const resp = await axios.get(REACT_APP_API + `/books`);
        dispatch(addLibro(resp.data));
    } catch (error) {
        console.log(error);
    }
};

//Search
// export const disSearch = (payload) => async (dispatch) => {
//     dispatch(SearchTitle(payload));
// };
export const getSearch = (name) => async (dispatch) => {
    try {
        let buscar = await axios.get(
            //URL PARA BUSCAR
            REACT_APP_API +`/books/${name}`
        );
        console.log(buscar.data);
        dispatch(SearchTitle(buscar.data));
        // console.log(buscar.data);
    } catch (error) {
        alert('the books were not found');
        console.log(error);
    }
};

export const AddCart = (id) => async (dispatch) => {
    dispatch(addCart(id));
};
export const DeleteCart = (id) => async (dispatch) => {
    dispatch(deleteCart(id));
};
export const addFavs = (id) => async (dispatch) => {
    dispatch(addFav(id));
};
export const deleteFavs = (id) => async (dispatch) => {
    dispatch(deleteFav(id));
};

export const FilTheme = (payload) => async (dispatch) => {
    try {
        if (payload === 'all') {
            dispatch(FilterTheme(payload));
        } else {
            let buscar = await axios.get(
                //URL PARA BUSCAR
                REACT_APP_API + `/books/${payload}`
            );
            dispatch(FilterTheme(buscar.data));
        }
        // console.log(buscar.data);
    } catch (error) {
        alert('the books were not found');
        console.log(error);
    }
    // dispatch(FAuthor(payload));
};

export const PriceRange = (payload) => async (dispatch) => {
    dispatch(Range(payload));
};
export const ORdenAZ = (payload) => async (dispatch) => {
    dispatch(ORDEN(payload));
};
export const ChangeRange = (payload) => async (dispatch) => {
    dispatch(MINtoMAX(payload));
};
export const getUser = (data) => async (dispatch) => {
    dispatch(addUser(data));
};
export const Comments=(id) => async (dispatch)=>{
    try{
        let komments= await axios.get(REACT_APP_API+`/comments/${id}`)
        dispatch(comments(komments.data))
    }
    catch(error){
        console.log(error)
    }
}
export const postComments=(payload) => async (dispatch)=>{
    try{
        const response= await axios.post(REACT_APP_API +`/comments/`,payload)
        return response.data
    }
    catch(error){
        console.log(error)
    }
}
