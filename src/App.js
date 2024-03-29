import logo from './logo.svg';
import './App.css';
import ChatRoom from './components/ChatRoom';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="/chat/:chatName" element={ <ChatRoom />} />
          {/* <Route path="/room2" render={() => <ChatRoom roomName={'room2'} username={'user2'} />} /> */}
          {/* add more routes for additional chatrooms */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;