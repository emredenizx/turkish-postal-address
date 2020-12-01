import { Switch, Route } from 'react-router-dom';
import './App.scss';

import { AuthProvider } from './context/auth'
import PrivateRoute from './components/privateRoute';

import Main from "./Main";
import Login from './login'

function App() {
  return (
    <AuthProvider>
      <div>
        <Switch>
          <PrivateRoute exact path='/' component={Main} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    </AuthProvider>
  );
}

export default App;
