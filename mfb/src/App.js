import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './Admin/ProtectedRoute';
import Home from './Home'
import CategoryList from './Admin/Components/CategoryList'
import SubscribersList from './Admin/Components/SubscribersList'
import Dashboard from './Admin/Components/Dashboard'
import AppointmentsList from './Admin/Components/AppointmentsList'
import SalonsList from './Admin/Components/SalonsList'
import ServicesList from './Admin/Components/ServicesList'
import UsersList from './Admin/Components/UsersList'
import TreatmentsList from './Admin/Components/TreatmentsList'
import HomeSlider from './Admin/Components/HomeSlider'
import SalonImages from './Admin/Components/SalonImages'
import CustomersList from './Admin/Components/CustomersList'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <ProtectedRoute path='/categorylist' component={CategoryList} />
        <ProtectedRoute path='/dashboard' component={Dashboard} />
        <ProtectedRoute path='/appointmentslist' component={AppointmentsList} />
        <ProtectedRoute path='/salonslist' component={SalonsList} />
        <ProtectedRoute path='/salonImages' component={SalonImages} />
        <ProtectedRoute path='/treatmentslist' component={TreatmentsList} />
        <ProtectedRoute path='/customerslist' component={CustomersList} />
        <ProtectedRoute path='/serviceslist' component={ServicesList} />
        <ProtectedRoute path='/userslist' component={UsersList} />
        <ProtectedRoute path='/homeslider' component={HomeSlider} />
        <ProtectedRoute path='/subscriberslist' component={SubscribersList} />
      </Switch>
    </Router>
  );
}
export default App;
