import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavBar } from './Components/NavBar.js'
import { TodoListPage } from './Components/pages/TodoListPage.js';
import { Home } from './Components/pages/Home.js'
import { Footer } from './Components/Footer.js'

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/todos" element={<TodoListPage />}></Route>
        </Routes>
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
