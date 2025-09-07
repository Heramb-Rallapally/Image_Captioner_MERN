import Home from './components/Home';
import Upload from './components/Upload';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
       <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/Upload" element={<Upload/>} />
        </Routes>
       </div>
    </Router>
  );
}

export default App;
