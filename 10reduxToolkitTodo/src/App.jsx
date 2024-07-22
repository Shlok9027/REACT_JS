import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdddTodo from './components/AdddTodo'
import Todos from './components/Todos'

function App() {
  
  return (
    <>
      <h1>Learn about redux toolkit</h1>
      <AdddTodo />
      <Todos />
    </>
  )
}

export default App