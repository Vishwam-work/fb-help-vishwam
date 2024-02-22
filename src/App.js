import './App.css';
import Login_page from './component/Login_page';
import Signup from './component/Signup';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './component/Home';
import Linkscreen from './component/Linkscreen';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login_page />}></Route>
        </Routes>
        
        <Routes>
          <Route path='/register' element={<Signup />}></Route>
        </Routes>
        <Routes>
          <Route path='/connect' element={<Linkscreen />}></Route>
        </Routes>
        <Routes>
          <Route path='/home' element={<Home />}></Route>
        </Routes>
        
      </BrowserRouter>
     
    </div>
  );
}

export default App;
