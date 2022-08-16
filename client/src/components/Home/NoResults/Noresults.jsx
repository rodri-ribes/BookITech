import React from 'react'
import { useSelector } from 'react-redux'

export default function Noresults() {

    const name = useSelector((state) => state.data.nameSearch)
  return (
    <div>
        <p>No se han encontrado resultados para {name}...</p>
    </div>
  )
}
