import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './Admin/ProtectedRoute';
import Home from './Home'
import CategoryList from './Admin/Components/Masters/CategoryList'
import SubscribersList from './Admin/Components/SubscribersList'
import Dashboard from './Admin/Components/Dashboard'
import AppointmentsList from './Admin/Components/AppointmentsList'
import AddBusiness from './Admin/Components/Business/AddBusiness'
import BusinessDetails from './Admin/Components/Business/BusinessDetails';
import BusinessList from './Admin/Components/Business/BusinessList'
import SalonImages from './Admin/Components/Business/BusinessImages'
import UsersList from './Admin/Components/UsersList'
import HomeSlider from './Admin/Components/HomeSlider'
import CustomersList from './Admin/Components/Customers/CustomersList'
import BusinessTypes from './Admin/Components/Masters/BusinessType';
import CustomerView from './Admin/Components/Customers/CustomerView'
import ContactUs from './Admin/Components/Masters/ContactUs';
import Support from './Admin/Components/Masters/Support';
import SupportView from './Admin/Components/Masters/SupportView';
import Service from "./Admin/Components/Masters/Service";
import serviceprice from "./Admin/Components/Masters/ServicePrice";
import AboutUs from "./Admin/Components/Masters/AboutUs";
import PrivacyPolicy from "./Admin/Components/Masters/PrivacyPolicy";
import TermsAndConditions from "./Admin/Components/Masters/TermsAndConditions";
import Faq from "./Admin/Components/Masters/Faq";
import Offers from './Admin/Components/Masters/Offers';
import AppointmentsView from './Admin/Components/AppointmentsView';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <ProtectedRoute path='/businesstype' component={BusinessTypes} />
        <ProtectedRoute path='/categorylist' component={CategoryList} />
        <ProtectedRoute path='/dashboard' component={Dashboard} />
        <ProtectedRoute path='/appointmentslist' component={AppointmentsList} />
        <ProtectedRoute path='/businesslist' component={BusinessList} />
        <ProtectedRoute path='/addbusiness' component={AddBusiness} />
        <ProtectedRoute path='/businessdetails/:businessId' component={BusinessDetails} />
        <ProtectedRoute path='/businessImages/:businessId' component={SalonImages} />
        <ProtectedRoute path='/customerslist' component={CustomersList} />
        <ProtectedRoute path='/customerview/:customerId' component={CustomerView} />
        <ProtectedRoute path='/supportview/:supportId' component={SupportView} />
        <ProtectedRoute path='/userslist' component={UsersList} />
        <ProtectedRoute path='/contactus' component={ContactUs} />
        <ProtectedRoute path='/support' component={Support} />
        <ProtectedRoute path='/homeslider' component={HomeSlider} />
        <ProtectedRoute path='/subscriberslist' component={SubscribersList} />
        <ProtectedRoute path="/service" component={Service} />
        <ProtectedRoute path="/serviceprice" component={serviceprice} />
        <ProtectedRoute path="/aboutus" component={AboutUs} />
        <ProtectedRoute path="/privacypolicy" component={PrivacyPolicy} />
        <ProtectedRoute path="/termsandconditions" component={TermsAndConditions} />
        <ProtectedRoute path="/offers" component={Offers} />
        <ProtectedRoute path="/faq" component={Faq} />
        <ProtectedRoute path='/appointmentsview/:appointmentId' component={AppointmentsView} />
      </Switch>
    </Router>
  );
}
export default App;
