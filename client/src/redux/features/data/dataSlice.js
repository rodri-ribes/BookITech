
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const dataSlice = createSlice({
    name: "data",
    initialState: {
        details:[],
        comments:[],
    },
    reducers: {
        //**Aca irian los reducers, que modificarian el estado, dejo uno para que tengan como referencia.. */
        addLibro: (state, actions) => {
            state.projects = actions.payload
        },
        getBookDetails: (state,actions)=>{
            state.details= actions.payload
        },
        addComments:(state, actions)=>{
            return{
                ...state,
                comments:[...state.comments,actions.payload]
            }
            
        }
    }
})

//Cada reducer que creen lo tienen que exportar asi

export const { addLibro } = dataSlice.actions;
export const {addComments}= dataSlice.actions;
export const {getBookDetails} = dataSlice.actions;


//Aca exportamos el dataSlice para tenerlo en la carpeta store, index.js

export default dataSlice.reducer;

//Aca irian las actions, dejo una como modo de ejemplo 

export const getLibros = () => async (dispatch) => {

    try {
        const resp = await axios.get(`http://localhost:3001/ejemplo`,)
        dispatch(addLibro(resp.data))
    } catch (error) {
        console.log(error)
    }
}
export const getBookDetail=(id)=> async(dispatch)=>{
    try {
        const resp =await axios.get(`http://localhost:3001/Book/${id}`)
        dispatch(getBookDetail(resp.data))
    } catch (error) {
        console.log(error)
    }
}
export const setComent =(payload)=>async (dispatch) =>{
    dispatch(addComments(payload))
}