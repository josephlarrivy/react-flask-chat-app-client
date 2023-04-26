import logo from './logo.svg';
import './App.css';
import ChatRoom from './components/ChatRoom';

function App() {
  return (
    <div className="App">
      <ChatRoom roomName={'room1'} username={'user1'} />
      <ChatRoom roomName={'room2'} username={'user2'} />
      <ChatRoom roomName={'room3'} username={'user3'} />
    </div>
  );
}

export default App;
