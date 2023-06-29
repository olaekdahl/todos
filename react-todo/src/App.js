import { TodoList } from './TodoList';
import './App.css';
import { AboutUs, ContactUs, Home } from './OtherComponent';
import { Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/todos">Todos</Link>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/todos" element={<TodoList />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;

