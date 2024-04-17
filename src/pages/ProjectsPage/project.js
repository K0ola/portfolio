import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProjectsPage from './ProjectsPage';
import ProjectDetail from './ProjectDetail'; // This will be your detail component

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ProjectsPage} />
        <Route path="/project/:id" component={ProjectDetail} />
      </Switch>
    </Router>
  );
}

export default App;
