import { Route } from 'react-router-dom';
import './App.css';
import Chatpage from './Pages/Chatpage';
import Homepage from './Pages/Homepage';

function App() {
  return (
    <div className="App">
     <Route path= "/" exact>
      <Homepage />
     </Route>
     <Route path= "/chats" exact>
      <Chatpage /> 
     </Route>
    </div>
  );
}

export default App;
