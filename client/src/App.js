import './App.css';
import Chats from './pages/Chats';
import Home from './pages/Home';
import { Route } from 'react-router-dom'


function App() {
    return (
        <div className='App'>
            <Route path='/' component={ Home } exact/>
            <Route path='/chats' component={ Chats } />
        </div>
    );
}

export default App;
