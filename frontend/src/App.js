// import logo from './logo.svg';
// import { Button } from '@chakra-ui/react';
import { Route } from 'react-router-dom';
import './App.css';
import ChatPage from './pages/ChatPage';
import Homepage from './pages/Homepage';



function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Homepage} />
      <Route path="/chats" component={ChatPage} />
      
    </div>
  );
}

export default App;
