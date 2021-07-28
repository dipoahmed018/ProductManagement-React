import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home'
import { UserInfo } from './Store/Userinfo';
import Login from './Pages/Login'
import Register from './Pages/Register'
import { ProductsData } from './Store/ProductsData';

function App() {
  return (
  <UserInfo>
    <ProductsData >
    <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
    </Router>
    </ProductsData>
  </UserInfo>
  );
}

export default App;
