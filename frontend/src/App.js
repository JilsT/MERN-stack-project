import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Help from './pages/help';
import Home from './pages/home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/services" element={<Help />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
