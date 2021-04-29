import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './Admin/ProtectedRoute';
import Home from './Home'
import CategoryList from './Admin/Components/Masters/CategoryList'
import SubscribersList from './Admin/Components/SubscribersList'
import Dashboard from './Admin/Components/Dashboard'
import AppointmentsList from './Admin/Components/AppointmentsList'
import AppointmentsView from './Admin/Components/AppointmentsView'
import AddSalon from './Admin/Components/Business/AddBusiness'
import BusinessDetails from './Admin/Components/Business/BusinessDetails';
import SalonsList from './Admin/Components/Business/BusinessList'
import SalonImages from './Admin/Components/Business/BusinessImages'
import ServicesList from './Admin/Components/ServicesList'
import UsersList from './Admin/Components/UsersList'
import HomeSlider from './Admin/Components/HomeSlider'
import CustomersList from './Admin/Components/Customers/CustomersList'
import BusinessTypes from './Admin/Components/Masters/BusinessType';

function App() {
  return (
    <Router>
      <Switch>        
        <Route exact path='/' component={Home} />
        <ProtectedRoute path='/businesstype' component={BusinessTypes} />
        <ProtectedRoute path='/categorylist' component={CategoryList} />
        <ProtectedRoute path='/dashboard' component={Dashboard} />
        <ProtectedRoute path='/appointmentslist' component={AppointmentsList} />
        <ProtectedRoute path='/appointment/:appointmentId' component={AppointmentsView} />
        <ProtectedRoute path='/businesslist' component={SalonsList} />
        <ProtectedRoute path='/addsalon' component={AddSalon} />
        <ProtectedRoute path='/businessdetails/:businessId' component={BusinessDetails} />
        <ProtectedRoute path='/businessImages/:businessId' component={SalonImages} />
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
