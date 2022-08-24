import React, { useEffect, useState } from "react";
//import Grid from "@mui/material/Grid";
import Grid from '@mui/material/Unstable_Grid2';
import TextField from "@mui/material/TextField";
import {Button, Box} from "@mui/material";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { updateBook , createBook, setId} from "../../../redux/features/data/dataSlice";
import Confirmation from "./Confirmation";


const {REACT_APP_API} = process.env
const color = '#173A5E'

const styles = theme => ({
  multilineColor:{
      color:'#EEEEEE'
  }
});

const cssTextField = {
  width: "100%",
  mb: 1.5,
  "& .MuiInputBase-root": {
      color: "#DADADA",
  },
  "& .MuiInput-inputMultiline":{
    color: '#EEEEEE',
  },
  "& .MuiFormLabel-root": {
      color: "#818181",
  },
  "& .MuiFormLabel-root.Mui-focused": {
      color: "#DADADA",
  },
  "& .MuiOutlinedInput-root": {
      "& > fieldset": { borderColor: "#818181" },
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
      "& > fieldset": {
          borderColor: "primary.main",
      },
  },
  "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
          borderColor: "#DADADA",
      },
  },
  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
      borderColor: "primary.main",
  },
};

export function FormInput(props) {
  
  const {prompt, id} = props
    const [confirmation, setConfirmation] = useState(false)
    const [oldValues, setOldValues] = useState({ 
        _id:"",
        title: "",
        subtitle: '',
        authors: "",
        isbn13: "",
        pages: '',
        year: '',
        desc: '',
        publisher: '',
        price: '',
        image: '',
        language: ''
    } )

    //?.replace('&#039;', `'`)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        name=='price' ? setFormValues({
            ...formValues,
            [name]: value[0]=='$' ? value : '$' + value
        }) : setFormValues({
          ...formValues,
          [name] : value
        })
        
        if(!value.length) setFormValues({
            ...formValues,
            [name] : oldValues[name]
        })
    };
    const [formValues, setFormValues] = useState( 
        {      
            _id:'', 
            title: "",
            subtitle: '',
            authors: "",
            isbn13: "",
            pages: '',
            year: '',
            desc: '',
            publisher: '',
            price: '',
            image: '',
            language: ''
        }
    )
    async function fetchData(){
        if(!id) return
        const {data} = await axios.get(REACT_APP_API + '/books/id/' + id).catch(err => console.error(err))
        setFormValues( {
            
            _id: data._id,
            title: data.title,
            subtitle: data.subtitle,
            authors: data.authors,
            isbn13: data.isbn13,
            pages: data.pages,
            year: data.year,
            desc: data.desc,
            publisher: data.publisher,
            price: data.price,
            image: data.image,
            language: data.language
        })
        setOldValues({
            _id:data._id,
            title: data.title,
            subtitle: data.subtitle,
            authors: data.authors,
            isbn13: data.isbn13,
            pages: data.pages,
            year: data.year,
            desc: data.desc,
            publisher: data.publisher,
            price: data.price,
            image: data.image,
            language: data.language
        })
      }
      useEffect( ()=> {
        fetchData()
      },[])
      
      function handleOnClick(e){
        
        e.preventDefault()
        setConfirmation(true) 
        
      }
      function handleReset(){
        fetchData()
      }
      return (<>
      {confirmation && <Confirmation id={id} data={formValues} confirmation={setConfirmation} prompt={prompt}/>} 
        <form style={{ minWidth:'60vw', color:'white'}} >
            <Box sx={{ flexGrow: 1, opacity:  confirmation ? 0.3 : 1 }}>
          <Grid sx={{minWidth:'100%'}} container columns={12} padding={2}
          direction="row"
          justifyContent=""
          alignItems="center">            
            <Grid item xs={12}>
              <h5>Title</h5>
              <TextField
              disabled = {confirmation}
              sx={cssTextField}
                id="title-input"
                name="title"
                placeholder={formValues.title}
                type="text"
                onChange={handleInputChange}
               
              />
            </Grid>
            <Grid xs={12} item>
            <h5>Subtitle</h5>
              <TextField
              disabled = {confirmation}
              sx={cssTextField}
                id="subtitle-input"
                name="subtitle"
                placeholder={formValues.subtitle}
                type="text"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid xs={12} item>
            <h5>Authors</h5>
              <TextField
              disabled = {confirmation}
              sx={cssTextField}
                id="authors-input"
                name="authors"
                placeholder={formValues.authors}
                type="text"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid sx={{minWidth:'100%'}} container columns={12} 
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch">
            <Grid xs={4} item>
            <h5>ISBN13</h5>
              <TextField
              disabled = {confirmation}
              sx={cssTextField}
              id="isbn13-input"
              name="isbn13"
                placeholder={formValues.isbn13}
                type="text"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid xs={3} item>
            <h5>Pages</h5>
              <TextField
              disabled = {confirmation}
              sx={cssTextField}
                id="pages-input"
                name="pages"
                placeholder={formValues.pages}
                type="text"
                onChange={handleInputChange}
              />
            </Grid>
             <Grid xs={3} item>
             <h5>Year</h5>
              <TextField
              disabled = {confirmation}
              sx={cssTextField}
              id="year-input"
              name="year"
              placeholder={formValues.year}
              type="text"
              onChange={handleInputChange}
              />
            </Grid> 
            </Grid>
            <Grid xs={12} item>
            <h5>Summary</h5>
              <TextField
              disabled = {confirmation}
              sx={cssTextField}
                id="desc-input"
                name="desc"
                multiline={true}
                minRows={5}
                placeholder={formValues.desc}
                type="text"
                onChange={handleInputChange}
              />
            </Grid> 
            <Grid xs={6} item>
            <h5>Language</h5>
              <TextField
              disabled = {confirmation}
              sx={cssTextField}
                id="language-input"
                name="language"
                placeholder={formValues.language}
                type="text"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid xs={4} item>
            <h5>Price</h5>
              <TextField
              disabled = {confirmation}
              sx={cssTextField}
                id="price-input"
                name="price"
                placeholder={formValues.price[0]=='$'? formValues.price : '$' + formValues.price}
                type="text"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid xs={8} item>
            <h5>Publisher</h5>
              <TextField
              disabled = {confirmation}
              sx={cssTextField}
                id="publisher-input"
                name="publisher"
                placeholder={formValues.publisher}
                type="text"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid xs={12} item>
            <h5>Image URL</h5>
              <TextField
              disabled = {confirmation}
              sx={cssTextField}
                id="image-input"
                name="image"
                placeholder={formValues.image}
                type="text"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} alignItems="center">
            <Button variant="contained" color="primary"onClick={e=>handleOnClick(e)}
              disabled = {confirmation}>
              Submit
            </Button> 
            <Button variant="outlined" color="primary" type="reset" onClick={handleReset}
              disabled = {confirmation}>
                Reset
            </Button>
          </Grid>
          </Grid>
        </Box>
        </form>
        </>
      );
    };
