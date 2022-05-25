import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import DetailsView from './views/DetailsView';


function App() {


  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={ <HomeView /> } />
        <Route path='/login' element={ <LoginView /> } />
        <Route path='/details/:id' element={ <DetailsView />} />
      </Routes>
    </div>
  );
}

export default App;
