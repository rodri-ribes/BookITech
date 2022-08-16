import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { updateBook , createBook} from "../../../redux/features/data/dataSlice";

const {REACT_APP_API} = process.env


export function FormInput(props) {
       
  const {prompt} = props
    const dispatch = useDispatch()
    const {id} = props
    const [oldValues, setOldValues] = useState({ 
        title: "",
        subtitle: '',
        authors: "",
        isbn13: "",
        pages: 0,
        year: 0,
        desc: '',
        publisher: '',
        price: 0,
        image: '',
        language: ''
    } )

    //?.replace('&#039;', `'`)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        if(!value.length) setFormValues({
            ...formValues,
            [name] : oldValues[name]
        })
    };
    const [formValues, setFormValues] = useState( 
        {       
            title: "",
            subtitle: '',
            authors: "",
            isbn13: "",
            pages: 0,
            year: 0,
            desc: '',
            publisher: '',
            price: 0,
            image: '',
            language: ''
        }
    )
    async function fetchData(){
        if(!id) return
        const {data} = await axios.get('http://localhost:3001/books/id/' + id).catch(err => console.error(err))
        setFormValues( {
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
      id ? dispatch(updateBook({...formValues, id: id})) : dispatch(createBook({...formValues}))
      prompt(true)


    }
    function handleReset(){
        fetchData()
    }
      return (

        <form >
            {console.table({...oldValues})}
          <Grid container alignItems="center" justify="center" direction="column">
            <Grid item>
              <TextField
                id="title-input"
                name="title"
                placeholder={formValues.title}
                type="text"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="subtitle-input"
                name="subtitle"
                placeholder={formValues.subtitle}
                type="text"
                onChange={handleInputChange}
              />
            <Grid item>
              <TextField
                id="authors-input"
                name="authors"
                placeholder={formValues.authors}
                type="text"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="isbn13-input"
                name="isbn13"
                placeholder={formValues.isbn13}
                type="text"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="pages-input"
                name="pages"
                placeholder={formValues.pages}
                type="number"
                onChange={handleInputChange}
              />
            </Grid>
             <Grid item>
              <TextField
                id="year-input"
                name="year"
                placeholder={formValues.year}
                type="number"
                onChange={handleInputChange}
              />
            </Grid> 
            <Grid item>
              <TextField
                id="desc-input"
                name="desc"
                placeholder={formValues.desc}
                type="text"
                onChange={handleInputChange}
              />
            </Grid> 
            <Grid item>
              <TextField
                id="publisher-input"
                name="publisher"
                placeholder={formValues.publisher}
                type="text"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="price-input"
                name="price"
                placeholder={formValues.price}
                type="number"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="language-input"
                name="language"
                placeholder={formValues.language}
                type="text"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="image-input"
                name="image"
                placeholder={formValues.image}
                type="text"
                onChange={handleInputChange}
              />
            </Grid>
            <Button variant="contained" color="primary"onClick={e=>handleOnClick(e)}>
              Submit
            </Button> 
            <Button variant="outlined" color="primary" type="reset" onClick={handleReset}>
                Reset
            </Button>
          </Grid>
        </Grid>
        </form>
      );
    };
