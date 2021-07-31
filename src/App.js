import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import { UserInfo } from "./Store/Userinfo";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { ProductsData } from "./Store/ProductsData";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Product from "./Pages/Product/Product";
import Header from "./Components/Shared/Header";

function App() {
  return (
    <UserInfo>
      <ProductsData>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/product" component={Product}></Route>
        </Router>
      </ProductsData>
    </UserInfo>
  );
}

export default App;
