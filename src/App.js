
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext"
import Login from "./Components/Login"
import Signup from './Components/Signup'
import Feed from './Components/Feed';
import PrivateRoute from './Components/PrivateRoute';
function App() {
  return (
    <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Feed}/>
              {/* <PrivateRoute exact path='/folder/:folderId' component={Dashboard}/>
              <PrivateRoute  path="/user" component={Profile} />
              <Route path="/signup" component={Signup} /> */}
             
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />

            </Switch>
          </AuthProvider>
        </Router>
  );
}

export default App;
