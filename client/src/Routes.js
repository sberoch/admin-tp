import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Test from './components/Test'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddPet from "./pages/AddPet";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Test} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/addPet" component={AddPet} />
      </Switch>
    </Router>
  );
}

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect to={{pathname: "/login", state: { from: props.location }}} />
        
      )
    }
  />
)

export default Routes;
