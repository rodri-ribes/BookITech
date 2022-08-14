import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { getLibros } from '../../../redux/features/data/dataSlice';
import capitalize from '../../auxiliar/capitalize';


export default function Input() {
const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getLibros());
    }, [dispatch]);
const allBooks = useSelector((state) => state.data.books)
const books = allBooks.map(e=>  {return {label: capitalize(e.title), id: e.id}})
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={books}
      sx={{ width: 700, alignSelf: 'center' }}
      renderInput={(params) => <TextField {...params} label="Books" />}
    />
  );
}
