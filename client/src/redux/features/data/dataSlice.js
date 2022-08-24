import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BsNutFill } from "react-icons/bs";
import {Alert} from 'react-st-modal'
const { REACT_APP_API } = process.env;

export const dataSlice = createSlice({
    name: "data",
    initialState: {
        books: [],
        book: [],
        nameSearch: "",
        details: [],
        Cart: [],
        Favs: [],
        Favo: [],
        allBooks: [],
        Theme: [],
        range: [],
        comments: [],
        A_Z: [],
        user: [],
        userID: [],
        MinToMax: [],
        dashboardState: ["CRUD"],
        id: [""],
        loading: true,
        error: false,
        dataUser: [],
        CartUser: [],
        heart: [],
        cleanSearch: null,

    },
    reducers: {
        //**Aca irian los reducers, que modificarian el estado, dejo uno para que tengan como referencia.. */
        addLibro: (state, actions) => {
            state.books = actions.payload;
            state.allBooks = actions.payload;
        },
        //Search
        SearchTitle: (state, actions) => {
            state.nameSearch = actions.payload;
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
                actions.payload === "all"
                    ? [...state.allBooks]
                    : actions.payload;
            return {
                ...state,
                Theme: copiaA,
                books: copiaA,
            };
        },

        addFav: (state, actions) => {
            state.Favs = state.Favs.concat(state.books.filter((l) => l.isbn13 === actions.payload))
        },
        addFav2: (state, actions) => {
            state.Favo = actions.payload
        },
        deleteFav: (state, actions) => {

            state.Favs = state.Favs.filter((l) => l.isbn13 !== actions.payload);
        },
        // deleteFav2: (state,actions)=>{
        //     state.Favo=
        // }

        Range: (state, { payload }) => {
            if (Number(payload.min) === Number(payload.max)) {
                state.books = [...state.books];
                state.range = [...state.books];
                Alert("Max and Min are the same, please make them different");
            } else if (Number(payload.min) > Number(payload.max)) {
                state.books = [...state.books];
                state.range = [...state.books];
                Alert("Min is greater than Max");
            } else if (Number(payload.min) < 0 || Number(payload.max) < 0) {
                state.books = [...state.books];
                state.range = [...state.books];
                Alert("Min or Máx are less than 0");
            } else {

                let copirange = state.books.filter(
                    (e) =>
                        Number(e.price.slice(1)) >= Number(payload.min) &&
                        Number(payload.max) >= Number(e.price.slice(1))
                );
                if (!copirange.length) {
                    Alert('The range you want to search for was not found');
                    state.books = state.allBooks.filter(e => Number(e.price.slice(1)) >= Number(payload.min) && Number(payload.max) >= Number(e.price.slice(1)))
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

            let filterAZ;
            if (state.MinToMax.length) {
                if (actions.payload === 'A-Z') {
                    let min = [...state.books].sort(
                        (a, b) => {
                            return Number(a.price.slice(1)) - Number(b.price.slice(1))
                        })
                    let max = [...state.books].sort(
                        (a, b) => {
                            return Number(b.price.slice(1)) - Number(a.price.slice(1))
                        });
                    if (JSON.stringify(state.MinToMax) === JSON.stringify(min)) {
                        console.log('holaaaaMin')
                        filterAZ = copiABC.sort((a, b) => {
                            if (a.title > b.title) {
                                return 1;
                            }
                            if (b.title > a.title) {
                                return -1;
                            }
                            return 0;
                        }).sort(
                            (a, b) => {
                                return Number(a.price.slice(1)) - Number(b.price.slice(1))
                            })
                    }
                    else if (JSON.stringify(state.MinToMax) === JSON.stringify(max)) {
                        console.log('Holaaa max')
                        filterAZ = copiABC.sort((a, b) => {
                            if (a.title > b.title) {
                                return 1;
                            }
                            if (b.title > a.title) {
                                return -1;
                            }
                            return 0;
                        }).sort(
                            (a, b) => {
                                return Number(b.price.slice(1)) - Number(a.price.slice(1))
                            })
                    } else {
                        filterAZ = copiABC.sort((a, b) => {
                            if (a.title > b.title) {
                                return 1;
                            }
                            if (b.title > a.title) {
                                return -1;
                            }
                            return 0;
                        })
                    }
                } if (actions.payload === 'Z-A') {
                    let min2 = [...state.books].sort(
                        (a, b) => {
                            return Number(a.price.slice(1)) - Number(b.price.slice(1))
                        })
                    let max2 = [...state.books].sort(
                        (a, b) => {
                            return Number(b.price.slice(1)) - Number(a.price.slice(1))
                        });
                    if (JSON.stringify(state.MinToMax) === JSON.stringify(min2)) {
                        filterAZ = copiABC.sort((a, b) => {
                            if (a.title > b.title) {
                                return -1;
                            }
                            if (b.title > a.title) {
                                return 1;
                            }
                            return 0;
                        }).sort(
                            (a, b) => {
                                return Number(a.price.slice(1)) - Number(b.price.slice(1))
                            })
                    }
                    else if (JSON.stringify(state.MinToMax) === JSON.stringify(max2)) {
                        filterAZ = copiABC.sort((a, b) => {
                            if (a.title > b.title) {
                                return -1;
                            }
                            if (b.title > a.title) {
                                return 1;
                            }
                            return 0;
                        }).sort(
                            (a, b) => {
                                return Number(b.price.slice(1)) - Number(a.price.slice(1))
                            })
                    } else {
                        filterAZ = copiABC.sort((a, b) => {
                            if (a.title > b.title) {
                                return -1;
                            }
                            if (b.title > a.title) {
                                return 1;
                            }
                            return 0;
                        });
                    }
                }

            } else {
                if (actions.payload === 'A-Z') {
                    filterAZ = copiABC.sort((a, b) => {
                        if (a.title > b.title) {
                            return 1;
                        }
                        if (b.title > a.title) {
                            return -1;
                        }
                        return 0;
                    })
                }
                if (actions.payload === 'Z-A') {
                    filterAZ = copiABC.sort((a, b) => {
                        if (a.title > b.title) {
                            return -1;
                        }
                        if (b.title > a.title) {
                            return 1;
                        }
                        return 0;
                    });
                }
            }

            return {
                ...state,
                A_Z: actions.payload === 'all' ? [...state.books] : filterAZ,
                MinToMax: filterAZ,
                books: actions.payload === 'all' ? [...state.allBooks] : filterAZ,
            };
        },
        MINtoMAX: (state, actions) => {
            let cambiar = [...state.books];
            let filtrar;
            if (state.A_Z.length) {
                if (actions.payload === 'MintoMax') {
                    let az = [...state.books].sort((a, b) => {
                        if (a.title > b.title) {
                            return 1;
                        }
                        if (b.title > a.title) {
                            return -1;
                        }
                        return 0;
                    });
                    let za = [...state.books].sort((a, b) => {
                        if (a.title > b.title) {
                            return -1;
                        }
                        if (b.title > a.title) {
                            return 1;
                        }
                        return 0;
                    });
                    if (JSON.stringify(state.A_Z) === JSON.stringify(az)) {
                        filtrar = cambiar.sort(
                            (a, b) => {
                                return Number(a.price.slice(1)) - Number(b.price.slice(1))
                            }).sort((a, b) => {
                                if (a.title > b.title) {
                                    return 1;
                                }
                                if (b.title > a.title) {
                                    return -1;
                                }
                                return 0;
                            });
                    }
                    if (JSON.stringify(state.A_Z) === JSON.stringify(za)) {
                        filtrar = cambiar.sort(
                            (a, b) => {
                                return Number(a.price.slice(1)) - Number(b.price.slice(1))
                            }).sort((a, b) => {
                                if (a.title > b.title) {
                                    return -1;
                                }
                                if (b.title > a.title) {
                                    return 1;
                                }
                                return 0;
                            });
                    }
                    filtrar = cambiar.sort(
                        (a, b) => {
                            return Number(a.price.slice(1)) - Number(b.price.slice(1))
                        });
                }
                if (actions.payload === 'MaxtoMin') {
                    let azM = [...state.books].sort((a, b) => {
                        if (a.title > b.title) {
                            return 1;
                        }
                        if (b.title > a.title) {
                            return -1;
                        }
                        return 0;
                    });
                    let zaM = [...state.books].sort((a, b) => {
                        if (a.title > b.title) {
                            return -1;
                        }
                        if (b.title > a.title) {
                            return 1;
                        }
                        return 0;
                    });
                    if (JSON.stringify(state.A_Z) === JSON.stringify(azM)) {
                        filtrar = cambiar.sort(
                            (a, b) => {
                                return Number(b.price.slice(1)) - Number(a.price.slice(1))
                            }).sort((a, b) => {
                                if (a.title > b.title) {
                                    return 1;
                                }
                                if (b.title > a.title) {
                                    return -1;
                                }
                                return 0;
                            });
                    }
                    if (JSON.stringify(state.A_Z) === JSON.stringify(zaM)) {
                        filtrar = cambiar.sort(
                            (a, b) => {
                                return Number(b.price.slice(1)) - Number(a.price.slice(1))
                            }).sort((a, b) => {
                                if (a.title > b.title) {
                                    return -1;
                                }
                                if (b.title > a.title) {
                                    return 1;
                                }
                                return 0;
                            });
                    }
                    filtrar = cambiar.sort(
                        (a, b) => {
                            return Number(b.price.slice(1)) - Number(a.price.slice(1))
                        });
                }
            } else {

                if (actions.payload === 'MintoMax') {
                    filtrar = cambiar.sort(
                        (a, b) => {
                            return Number(a.price.slice(1)) - Number(b.price.slice(1))
                        });
                }
                if (actions.payload === 'MaxtoMin') {
                    filtrar = cambiar.sort(
                        (a, b) => {
                            return Number(b.price.slice(1)) - Number(a.price.slice(1))
                        });
                }
            }
            return {
                ...state,
                MinToMax: filtrar,
                A_Z: filtrar,
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
            state.comments = [actions.payload];
        },
        vaciarCommets: (state, actions) => {
            state.comments = [];
        },
        vaciarFav: (state, actions) => {
            state.Favo = [];
            state.heart = [];
        },
        delistBook: (state, actions) => {
            return;
        },
        changeDashboardState: (state, actions) => {
            state.dashboardState = actions.payload;
        },
        putBook: (state, actions) => {
            return;
        },
        newBook: (state, action) => {
            return;
        },
        idForUpdate: (state, action) => {
            state.id = action.payload;
        },
        setLoadingFalse: (state, action) => {
            state.loading = false;
        },
        setLoadingTrue: (state, action) => {
            state.loading = true;
        },
        setErrorTrue: (state, action) => {
            state.error = true;
        },
        dataUser: (state, actions) => {
            state.dataUser = actions.payload;

        },

        heart: (state, actions) => {
            state.heart = actions.payload;
        },

        contadorCart: (state, actions) => {

            state.CartUser = actions.payload;
        },
        contadorQuitarCart: (state, actions) => {
            state.CartUser = state.CartUser.filter(c => c._id !== actions.payload)

        },
        vaciarCarritoDespDeLogin: (state, actions) => {
            state.Cart = actions.payload
        },
        clearFil: (state, actions) => {
            state.books = state.allBooks;
            state.range = [];
            state.A_Z = [];
            state.MinToMax = [];
            state.Theme = [];
        },
        addFunctionClean: (state, actions) => {
            state.cleanSearch = actions.payload
        }, 
        CleanSearchTitle: (state, actions) => {
            state.nameSearch = '';
        }
    },
});

//Cada reducer que creen lo tienen que exportar asi

export const {
    addLibro,
    SearchTitle,
    addCart,
    addFav,
    addFav2,
    deleteFav,
    deleteCart,
    FilterTheme,
    Range,
    ORDEN,
    MINtoMAX,
    addUser,
    comments,
    addUserID,
    vaciarCommets,
    vaciarFav,
    delistBook,
    changeDashboardState,
    putBook,
    newBook,
    idForUpdate,
    setLoadingFalse,
    setLoadingTrue,
    setErrorTrue,
    dataUser,
    updateUser,
    CartUser,
    heart,
    DeleteCartUser,
    contadorQuitarCart,
    contadorCart,
    clearFil,
    vaciarCarritoDespDeLogin,
    addFunctionClean,
    CleanSearchTitle,
} = dataSlice.actions;

//Aca exportamos el dataSlice para tenerlo en la carpeta store, index.js

export default dataSlice.reducer;

//Aca irian las actions, dejo una como modo de ejemplo

export const getLibros = () => async (dispatch) => {
    try {
        const resp = await axios.get(REACT_APP_API + `/books`);
        dispatch(setLoadingFalse());
        dispatch(addLibro(resp.data));
    } catch (error) {
        dispatch(setErrorTrue());
    }
};

//Search
// export const disSearch = (payload) => async (dispatch) => {
//     dispatch(SearchTitle(payload));
// };
export const getSearch = (name) => async (dispatch) => {
    try {

        dispatch(setLoadingTrue());
        dispatch(SearchTitle(name));
        dispatch(setLoadingFalse());
        // console.log(buscar.data);
    } catch (error) {
        Alert("the books were not found");
        console.log(error);
    }
};

export const AddCart = (id) => async (dispatch) => {
    dispatch(addCart(id));
};
export const DeleteCart = (id) => async (dispatch) => {
    dispatch(deleteCart(id));
};
export const getFav = (idUser) => async (dispatch) => {
    const res = await axios.get(REACT_APP_API + `/favorite`, { params: { email: idUser } })
    //let filter=res.data.map(m=>m.book.isbn13)
    dispatch(addFav2(res.data))
}
export const addFavs = (id) => async (dispatch) => {
    dispatch(addFav(id));
};
export const deleteFavs = (id) => async (dispatch) => {
    dispatch(deleteFav(id));
};

export const FilTheme = (payload) => async (dispatch) => {
    try {
        // if (payload === 'all') {
        //     dispatch(FilterTheme(payload));
        // } else {
        let buscar = await axios.get(
            //URL PARA BUSCAR
            REACT_APP_API + `/books/${payload}`
        );
        dispatch(FilterTheme(buscar.data));
        // }
        // console.log(buscar.data);
    } catch (error) {
        // alert('the books were not found');
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

export const getUserID = (id) => async (dispatch) => {
    try {
        let uzer = await axios.get(REACT_APP_API + `/user/${id}`);
        dispatch(addUserID(uzer.data));
    } catch (error) {
        console.log(error);
    }
};
export const Comments = (id) => async (dispatch) => {
    try {
        let komments = await axios
            .get(REACT_APP_API + `/comments/${id}`)
            .catch((err) => { });
        dispatch(comments(komments.data));
    } catch (error) {
        console.log(error);
    }
};
export const postComments = (payload, _id) => async (dispatch) => {
    try {
        const response = await axios.post(
            REACT_APP_API + `/comments/?_id=${_id}`,
            payload
        );
        dispatch(comments(response.data));
    } catch (error) {
        console.log(error);
    }
};
export const DeleteComment = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(REACT_APP_API + `/comments/${id}`);
        dispatch(comments(response.data));
    } catch (error) {
        console.log(error);
    }
};
export const Vaciar = () => async (dispatch) => {
    dispatch(vaciarCommets());
};
export const vaciarFavs = () => async (dispatch) => {
    dispatch(vaciarFav())
    console.log("putBook")
}
export const UpdateComment = (id, payload) => async (dispatch) => {
    try {
        console.log("payload", id, payload);
        const response = await axios.put(
            REACT_APP_API + `/comments/${id}`,
            payload
        );
    } catch (error) {
        console.log(error);
    }
};
export const changeDashboard = (payload) => async (dispatch) => {
    dispatch(changeDashboardState(payload));
};
export const deleteBook = (id) => async (dispatch) => {
    try {
        let success = await axios.put(
            `${REACT_APP_API}/books/delist/${id}`
        );
        console.log(success);
        if (success) dispatch(delistBook());
    } catch (error) {
        console.log(error);
    }

};
export const updateBook = (payload) => async (dispatch) => {
    try {
        let success = await axios.put(
            `${REACT_APP_API}/books/${payload.id}`, { ...payload, delisted: false }
        );
        console.log(success);
        if (success) dispatch(updateBook());
    } catch (error) {
        console.log(error);
    }
};
export const createBook = (payload) => async (dispatch) => {
    try {

        let success = await axios.post(
            `${REACT_APP_API}/books/`, { ...payload }
        );
        console.log(success);
        if (success) dispatch(newBook());
    } catch (error) {
        console.log(error);
    }
};
export const setId = (payload) => async (dispatch) => {
    dispatch(idForUpdate(payload));
};

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
        const res = await axios.put(REACT_APP_API + `/user/${id}`, payload);
        dispatch(dataUser(res.data));
    } catch (error) {
        console.log(error);
    }
}
export const UpdatePass = (id, payload) => async (dispatch) => {
    try {
        console.log(payload);
        const res = await axios.put(REACT_APP_API + `/user/change/${id}`, payload)
        alert("Password changed successfully")
    }
    catch (error) {
        alert("The current Password doesn't match with original")
    }
}

export const getCartUser = (idUser) => async (dispatch) => {
    try {
        let res = await axios.get(REACT_APP_API + '/cart/' + idUser)
        // console.log(res.data[0].cart)
        dispatch(contadorCart(res.data[0].cart))
    } catch (error) {
        console.log(error);
    }
}

export const DeleteInCartUser = (id) => (dispatch) => {

    dispatch(contadorQuitarCart(id))
}

export const actionVaciarCarritoDespDeLogin = () => (dispatch) => {

    dispatch(vaciarCarritoDespDeLogin([]))
}
export const GetHeart = (idUser) => async (dispatch) => {
    try {
        let success = await axios.get(REACT_APP_API + `/favorite/id?email=${idUser}`)
        await dispatch(heart(success.data))
    }
    catch (error) {
        console.log(error)
    }

}

export const ResetFil = () => (dispatch) => {
    dispatch(clearFil())
}

export const addFunctionCleans = (fnc) => (dispatch) => {
    dispatch(addFunctionClean(fnc))
}

export const cleanSearchTitle = () => (dispatch) =>{
    dispatch(CleanSearchTitle())
}