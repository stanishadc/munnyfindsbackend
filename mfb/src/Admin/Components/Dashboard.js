import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { handleSuccess, handleError } from '../CustomAlerts'
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import moment from 'moment';
import { Link } from 'react-router-dom';
export default function Dashboard(props) {
    const [upComingCount, setUpComingCount] = useState('')
    const [completedCount, setCompletedCount] = useState('')
    const [cancelledCount, setCancelledCount] = useState('')
    const [activeCount, setActiveCount] = useState('')
    const [inActiveCount, setInActiveCount] = useState('')
    const [totalCount, setTotalCount] = useState('')
    const [appointmentsList, setAppointmentsList] = useState([])

    const applicationAPI = (url = "https://munnyapi.azurewebsites.net/api/appointments/") => {
        return {
            fetchAppointments: () => axios.get(url + 'get'),
            fetchBusiness: () => axios.get("https://munnyapi.azurewebsites.net/api/business/" + 'get')
        }
    }

    function refreshAppointmentsList() {
        applicationAPI().fetchAppointments()
            .then(res => (
                setCompletedCount((res.data.filter(item => item.bookingStatus === 'Completed')).length),
                setUpComingCount((res.data.filter(item => item.bookingStatus === 'Confirmed' || item.bookingStatus === 'Pending')).length),
                setCancelledCount((res.data.filter(item => item.bookingStatus === 'Cancelled')).length),
                setAppointmentsList((res.data.filter(item => item.bookingStatus === 'Confirmed' || item.bookingStatus === 'Pending')))
            ))
            .catch(err => console.log(err))
    }

    function refreshBusinessList() {
        applicationAPI().fetchBusiness()
            .then(res => (
                setActiveCount((res.data.filter(item => item.status === true)).length),
                setInActiveCount((res.data.filter(item => item.status === false)).length),
                setTotalCount((res.data.filter(item => item.status === true || item.status === false)).length)
            ))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        refreshAppointmentsList();
        refreshBusinessList();
    }, [])
    return (
        <div className="container-fluid">
            <Header />
            <div className="row main-content">
                <div className="col-sm-3 col-xs-6 sidebar pl-0">
                    <Sidebar />
                </div>
                <div className="col-sm-9 col-xs-12 content pt-3 pl-0">
                    <h5 className="mb-3"><strong>Dashboard</strong></h5>
                    {/*Dashboard widget*/}
                    <div className="mt-1 mb-3 button-container">
                        <div className="row pl-0">
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                                <div className="bg-white border shadow">
                                    <div className="media p-4">
                                        <div className="align-self-center mr-3 rounded-circle notify-icon bg-theme">
                                            <i className="fa fa-calendar" />
                                        </div>
                                        <div className="media-body pl-2">
                                            <h3 className="mt-0 mb-0"><strong>{upComingCount}</strong></h3>
                                            <p><small className="text-muted bc-description">Upcoming Appointments</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                                <div className="bg-white border shadow">
                                    <div className="media p-4">
                                        <div className="align-self-center mr-3 rounded-circle notify-icon bg-success">
                                            <i className="fas fa-calendar" />
                                        </div>
                                        <div className="media-body pl-2">
                                            <h3 className="mt-0 mb-0"><strong>{completedCount}</strong></h3>
                                            <p><small className="text-muted bc-description">Completed Appointments</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                                <div className="bg-white border shadow">
                                    <div className="media p-4">
                                        <div className="align-self-center mr-3 rounded-circle notify-icon bg-danger">
                                            <i className="fa fa-calendar" />
                                        </div>
                                        <div className="media-body pl-2">
                                            <h3 className="mt-0 mb-0"><strong>{cancelledCount}</strong></h3>
                                            <p><small className="bc-description">Cancelled Appointments</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-1 mb-3 button-container">
                        <div className="row pl-0">
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                                <div className="bg-white border shadow">
                                    <div className="media p-4">
                                        <div className="align-self-center mr-3 rounded-circle notify-icon bg-theme">
                                            <i className="fa fa-scissors" />
                                        </div>
                                        <div className="media-body pl-2">
                                            <h3 className="mt-0 mb-0"><strong>{activeCount}</strong></h3>
                                            <p><small className="text-muted bc-description">Active Business</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                                <div className="bg-white border shadow">
                                    <div className="media p-4">
                                        <div className="align-self-center mr-3 rounded-circle notify-icon bg-danger">
                                            <i className="fas fa-scissors" />
                                        </div>
                                        <div className="media-body pl-2">
                                            <h3 className="mt-0 mb-0"><strong>{inActiveCount}</strong></h3>
                                            <p><small className="text-muted bc-description">InActive Business</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                                <div className="bg-white border shadow">
                                    <div className="media p-4">
                                        <div className="align-self-center mr-3 rounded-circle notify-icon bg-theme">
                                            <i className="fa fa-scissors" />
                                        </div>
                                        <div className="media-body pl-2">
                                            <h3 className="mt-0 mb-0"><strong>{totalCount}</strong></h3>
                                            <p><small className="bc-description">Total Business</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 mb-4 p-3 bg-white border shadow-sm lh-sm">
                        {/*Order Listing*/}
                        <div className="product-list">
                            <div className="row border-bottom mb-4">
                                <div className="col-sm-8 pt-2"><h6 className="mb-4 bc-header">Upcoming Appointments</h6></div>
                                <div className="col-sm-4 text-right pb-3">
                                    <div className="clearfix" />
                                </div>
                            </div>
                            <div className="table-responsive product-list">
                                <table className="table table-bordered table-striped mt-0" id="productList">
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
                                                <td className="align-middle text-center">
                                                    <Link to={"/appointment/" + app.appointmentId} className="btn btn-success btn-sm mr-2"><i className="fa fa-eye" /> View</Link>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody></table>
                                <div className="text-right">
                                    <button className="btn btn-outline-theme"><i className="fa fa-eye" /> View full orders</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}