import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


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
        userID: [],
        MinToMax: [],
        dashboardState: ['CRUD'],
        id: [''],
        dataUser: [],

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
        addUserID: (state, actions) => {
            state.userID = actions.payload;
        },
        comments: (state, actions) => {
            state.comments=[actions.payload]
        },
        vaciarCommets: (state, actions)=>{
            state.comments=[]
        },
        delistBook: (state, actions) =>{
            return 
        },
        changeDashboardState: (state, actions) =>{
            state.dashboardState = actions.payload;
        },
        putBook: (state, actions) =>{
            return
        },
        newBook: (state, action) => {
            return
        },
        idForUpdate: (state, action) =>{
            state.id = action.payload
        },
        dataUser: (state, actions) => {
        state.dataUser = actions.payload
        },       
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
    addUserID,
    vaciarCommets,
    delistBook,
    changeDashboardState,
    putBook,
    newBook,
    idForUpdate,
    dataUser,
    updateUser,


} = dataSlice.actions;

//Aca exportamos el dataSlice para tenerlo en la carpeta store, index.js

export default dataSlice.reducer;

//Aca irian las actions, dejo una como modo de ejemplo

export const getLibros = (setLoading, setError) => async (dispatch) => {
    try {
        const resp = await axios.get(REACT_APP_API + `/books`);
        dispatch(addLibro(resp.data));
        setLoading(false)
    } catch (error) {
        setError(true);
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


export const getUserID=(id) => async (dispatch)=>{
    try {
        let uzer= await axios.get(REACT_APP_API +`/user/${id}`)
        dispatch(addUserID(uzer.data))
    } catch (error) {
        console.log(error)
    }
}
export const Comments=(id) => async (dispatch)=>{
    try{
        let komments= await axios.get(REACT_APP_API+`/comments/${id}`).catch((err)=>{})
        dispatch(comments(komments.data))
    }
    catch(error){
        console.log(error)
    }
}
export const postComments=(payload) => async (dispatch)=>{
    try{
        const response= await axios.post(REACT_APP_API +`/comments/`,payload)
        dispatch(comments(response.data))
    }
    catch(error){
        console.log(error)
    }
}
export const DeleteComment=(id)=> async (dispatch) => {
    try {
        const response = await axios.delete(REACT_APP_API + `/comments/${id}`)
        dispatch(comments(response.data))
    } catch (error) {
        console.log(error)
    }
}
export const Vaciar= () => async (dispatch)=>{
    dispatch(vaciarCommets())
}
export const UpdateComment=(id,payload) => async (dispatch)=>{
    try {
        console.log("payload",id,payload)
        const response = await axios.put(REACT_APP_API +`/comments/${id}`,payload)
        
    } catch (error) {
        console.log(error)
    }
};
export const changeDashboard = (payload) => async (dispatch) =>{
    dispatch(changeDashboardState(payload))
};
export const deleteBook = (id) => async (dispatch) =>{ 
    try {
    let success = await axios.put(
        `http://localhost:3001/books/delist/${id}`
    );
    console.log(success);
    if(success) dispatch(delistBook());
} catch (error) {
    console.log(error);
}
};
export const updateBook = (payload) => async (dispatch) =>{ 
    try {
    let success = await axios.put(
        `http://localhost:3001/books/${payload.id}`,{...payload, delisted: false}
    );
    console.log(success);
    if(success) dispatch(updateBook());
} catch (error) {
    console.log(error);
}
};
export const createBook = (payload) => async (dispatch) =>{ 
    try {
    let success = await axios.post(
        `http://localhost:3001/books/`,{...payload}
    );
    console.log(success);
    if(success) dispatch(newBook());
} catch (error) {
    console.log(error);
}
};
export const setId = (payload) => async (dispatch) =>{
   dispatch(idForUpdate(payload))
}

export const getDataUser = (id) => async (dispatch) => {
    try {
        const res = await axios.get(REACT_APP_API + `/user/${id}`);
        console.log(res.data);
        dispatch(dataUser(res.data));
    } catch (error) {
        console.log(error);
    }
};

export const updateUserdata = (id, payload) => async (dispatch) => {
    try {
        console.log(payload);
        const res = await axios.put(REACT_APP_API + `/user/${id}`, payload)
        dispatch(dataUser(res.data))
    } catch (error) {
         console.log(error);
    }
}

