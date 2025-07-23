import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Detail from './components/Detail';
import './App.css'


function App() {
  

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path='/pokemon/:id' element={<Detail />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
