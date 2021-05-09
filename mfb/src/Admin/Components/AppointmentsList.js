import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import moment from 'moment';
export default function AppointmentsList(props) {
    const [appointmentsList, setAppointmentsList] = useState([])
    const applicationAPI = (url = 'https://munnyapi.azurewebsites.net/api/appointments/') => {
        return {
            fetchAll: () => axios.get(url + 'get'),
        }
    }
    function refreshAppointmentList() {
        applicationAPI().fetchAll()
            .then(res => setAppointmentsList(res.data))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        refreshAppointmentList();
    }, [])
    return (
        <div className="container-fluid">
            <Header />
            <div className="row main-content">
                <div className="col-sm-3 col-xs-6 sidebar pl-0">
                    <Sidebar />
                </div>
                <div className="col-sm-9 col-xs-12 content pt-3 pl-0">
                    <span className="text-secondary">Dashboard<i className="fa fa-angle-right" />Appointments List</span>
                    <div className="mt-4 mb-4 p-3 bg-white border shadow-sm lh-sm">
                        <div className="product-list">
                            <div className="row border-bottom mb-4">
                                <div className="col-sm-8 pt-2"><h6 className="mb-4 bc-header">Appointments listing</h6></div>
                                <div className="col-sm-4 text-right pb-3">
                                </div>
                            </div>
                            <div className="table-responsive product-list">
                                <table className="table table-bordered table-striped mt-3" id="appointmentsList">
                                    <thead>
                                        <tr>
                                            <th>Appointment No</th>
                                            <th>Booking Status</th>
                                            <th>Appointment Date and Time</th>
                                            <th>Payment Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointmentsList.map(app =>
                                            <tr key={app.appointmentId}>
                                                <td>{app.appointmentNo}</td>
                                                <td>{app.bookingStatus}</td>
                                                <td>{moment(app.appointmentDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                                <td>{app.paymentStatus}</td>
                                                <td>
                                                    <Link to={"/appointmentsview/" + app.appointmentId} className="btn btn-success btn-sm mr-2"><i className="fa fa-eye" /> View</Link>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div></div></div>
            </div>
            <Footer></Footer>
        </div>
    )
}