import {BrowserRouter as Router , Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import './App.css';
import MenuBar from './components/MenuBar';
import { AuthProvider } from './context/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
