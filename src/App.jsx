import { useState } from 'react'
import Header from './Components/Header'
import Navbar from './Components/Navbar'
import Events from './Components/Events'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div>
      <Header />
      <Navbar />
      <main>
        <Events />
      </main>
    </div>
    </>
  )
}

export default App
