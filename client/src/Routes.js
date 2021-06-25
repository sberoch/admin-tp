import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddPet from "./pages/AddPet";
import HomeRescuer from "./pages/HomeRescuer";
import HomeAdopter from "./pages/HomeAdopter";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/addPet" component={AddPet} />
      
        {/*TODO -> hacer que user tenga acceso a su rol*/}
        <PrivateRoute path="/homeAdopter" component={HomeAdopter} />
        <PrivateRoute path="/homeRescuer" component={HomeRescuer} />
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
