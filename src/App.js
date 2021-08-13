import './App.css';
import { Home } from "./components/Home"
import { URL } from "./components/URL"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/:code" component={URL}></Route>
    </Switch>
    </Router>
  );
}

export default App;
