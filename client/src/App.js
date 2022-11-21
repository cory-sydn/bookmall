import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Books from './pages/Books';
import Add from './pages/Add';
import Update from './pages/Update';
import Navbar from './components/Navbar';
import BookPage from './pages/BookPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Books/>} />
          <Route path='/book/:id' element={<BookPage/>} />
          <Route path='/add' element={<Add/>} />
          <Route path='/update/:id' element={<Update/> } />
          <Route path='/*' element={<Books/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
