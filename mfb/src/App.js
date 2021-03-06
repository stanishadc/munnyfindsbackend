import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './Admin/ProtectedRoute';
import Home from './Home'
import CategoryList from './Admin/Components/CategoryList'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <ProtectedRoute path='/category/categorylist' component={CategoryList} />
      </Switch>
    </Router>
  );
}
export default App;
