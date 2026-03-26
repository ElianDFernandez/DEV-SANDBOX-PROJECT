import { useState } from 'react'
import CategoriasList from './components/CategoriasList';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>¡Bienvenido a la aplicación de categorías!</h1>
      <p>Inicia sesión para ver las categorías protegidas.</p>
      <CategoriasList />
    </>
  )
}

export default App
