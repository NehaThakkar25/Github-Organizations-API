import Navbar from './components/Navbar';
import MyCard from './components/MyCard';
import ProjectCard from './components/ProjectCard';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/" component={MyCard} />
          <Route exact path="/orgInfo" component={ProjectCard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
