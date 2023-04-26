import logo from './logo.svg';
import './App.css';
import ChatRoom from './components/ChatRoom';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/room/:roomName" element={ <ChatRoom />} />
          {/* <Route path="/room2" render={() => <ChatRoom roomName={'room2'} username={'user2'} />} /> */}
          {/* add more routes for additional chatrooms */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;