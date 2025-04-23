import React from 'react'
import { useSelector } from 'react-redux'

function IndexPage() {
    const Favoris = useSelector((state) => state.FavorisReducer)
  return (
    <div>
        <div >
            <h1>Mes Favoris</h1>
        </div>
    </div>
  )
}

export default IndexPage