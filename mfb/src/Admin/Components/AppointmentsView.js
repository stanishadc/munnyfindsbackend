import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { handleSuccess, handleError } from "../CustomAlerts";
import { Link } from 'react-router-dom';
import moment from 'moment';
const initialFieldValues = {
    appointmentId: 0,
    appointmentNo: '',
    appointmentDate: '',
    customerId: '',
    businessId: '',
    bookingStatus: '',
    paymentStatus: '',
    modeOfPayment: '',
    subTotal: '',
    discount: '',
    total: '',
    tax: '',
    review: '',
    rating: '',
    createdDate: new Date().toLocaleString(),
    updatedDate: new Date().toLocaleString(),
    startTime: '',
    endTime: '',
    duration: '',
    appointmentTime: '',
    startDate: new Date().toLocaleString(),
    endDate: new Date().toLocaleString(),
    userServices: '',
    paymentPlace: '',
    businessEmployeeId: 0
}
export default function AppointmentsView(props) {
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
    const [businessEmployeeList, setBusinessEmployeeList] = useState([]);
    const[serviceslist, setServicesList]=useState([]);
    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }
    const validate = () => {
        let temp = {};
        temp.bookingStatus = values.bookingStatus === "0" ? false : true;
        temp.paymentStatus = values.paymentStatus === "0" ? false : true;
        setErrors(temp);
        return Object.values(temp).every((x) => x === true);
    };
    const applicationAPI = (url = "https://munnyapi.azurewebsites.net/api/appointments/") => {
        return {
            fetchAll: () => axios.get(url + "get"),
            fetchAppointmentsView: () => axios.get(url + 'getbyid/' + props.match.params["appointmentId"]),
            update: (id, updateRecord) => axios.put(url + "update/" + id, updateRecord),
            fetchBusinessEmployee: (id) => axios.get("https://munnyapi.azurewebsites.net/api/businessemployee/getbyid/" + id)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData();
            formData.append("appointmentId", values.appointmentId);
            formData.append("appointmentNo", values.appointmentNo);
            formData.append("appointmentDate", values.appointmentDate);
            formData.append("customerId", values.customerId);
            formData.append("businessId", values.businessId);
            formData.append("bookingStatus", values.bookingStatus);
            formData.append("paymentStatus", values.paymentStatus);
            formData.append("modeOfPayment", values.modeOfPayment);
            formData.append("subTotal", values.subTotal);
            formData.append("discount", values.discount);
            formData.append("total", values.total);
            formData.append("tax", values.tax);
            formData.append("review", values.review);
            formData.append("rating", values.rating);
            formData.append("createdDate", values.createdDate);
            formData.append("updatedDate", values.updatedDate);
            formData.append("startTime", values.startTime);
            formData.append("endTime", values.endTime);
            formData.append("duration", values.duration);
            formData.append("appointmentTime", values.appointmentTime);
            formData.append("startDate", values.startDate);
            formData.append("endDate", values.endDate);
            formData.append("userServices", values.userServices);
            formData.append("paymentPlace", values.paymentPlace);
            formData.append("businessEmployeeId", values.businessEmployeeId);
            console.log(values);
            addOrEdit(formData,);
        }
    };
    const addOrEdit = (formData, onSuccess) => {
        applicationAPI()
            .update(formData.get("appointmentId"), formData)
            .then((res) => {
                handleSuccess("Appointment Details Updated");
            });
    };
    function refreshAppointmentsView() {
        applicationAPI().fetchAppointmentsView()
            .then(res => refreshBusinessEmployee(res.data[0].businessId, res.data[0]))
            .catch(err => console.log(err))
    }
    function refreshBusinessEmployee(id, appData) {
        console.log(appData)
        applicationAPI().fetchBusinessEmployee(id)
            .then(res => setBusinessEmployeeList(res.data), setValues(appData),console.log(appData.userServices))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        refreshAppointmentsView();
    }, [])
    const applyErrorClass = field => ((field in errors && errors[field] === false) ? ' form-control-danger' : '')
    return (
        <div className="container-fluid">
            <Header />
            <div className="row main-content">
                <div className="col-sm-3 col-xs-6 sidebar pl-0">
                    <Sidebar />
                </div>
                <div className="col-sm-9 col-xs-12 content pt-3 pl-0">
                    <div className="row border-bottom mb-4">
                        <div className="col-sm-8 pt-2"><h6 className="mb-4 bc-header">Update Appointments</h6></div>
                        <div className="col-sm-4 text-right pb-3">
                            <Link to={"/appointmentsList"} className="btn btn-round btn-theme"><i className="fa fa-list" />Appointments List</Link>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                        <span className="text-secondary">Dashboard<i className="fa fa-angle-right" />Appointments List</span>
                        <div className="row mt-3">
                            <div className="col-sm-12">
                                <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                                    <h6 className="mb-3">Appointments Details</h6>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('appointmentNo')} name="appointmentNo" type="text" value={values.appointmentNo} onChange={handleInputChange} />
                                            <label htmlFor="appointmentNo">AppointmentNo</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('appointmentDate')} name="appointmentDate" type="text" value={moment(values.appointmentDate).format('MMMM Do YYYY')} onChange={handleInputChange} />
                                            <label htmlFor="appointmentDate">AppointmentDate</label>
                                        </div>
                                        <div class="col-lg-4 col-12">
                                            <select className={"form-control" + applyErrorClass('bookingStatus')} type="text" value={values.bookingStatus} name="bookingStatus" onChange={handleInputChange}>
                                                <option value="Pending">Pending</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                            <label htmlFor="bookingStatus">BookingStatus</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <select className={"form-control" + applyErrorClass('paymentStatus')} type="text" value={values.paymentStatus} name="paymentStatus" onChange={handleInputChange}>
                                                <option value="Pending">Pending</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                            <label htmlFor="paymentStatus">PaymentStatus</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('modeOfPayment')} name="modeOfPayment" type="text" value={values.modeOfPayment} onChange={handleInputChange} />
                                            <label htmlFor="modeOfPayment">ModeOfPayment</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('subTotal')} name="subTotal" type="text" value={values.subTotal} onChange={handleInputChange} />
                                            <label htmlFor="subTotal">SubTotal</label>
                                        </div>
                                    </div>

                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('discount')} name="discount" type="text" value={values.discount} onChange={handleInputChange} />
                                            <label htmlFor="discount">Discount</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('total')} name="total" type="text" value={values.total} onChange={handleInputChange} />
                                            <label htmlFor="total">Total</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('tax')} name="tax" type="text" value={values.tax} onChange={handleInputChange} />
                                            <label htmlFor="tax">Tax</label>
                                        </div>
                                    </div>

                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('review')} name="review" type="text" value={values.review} onChange={handleInputChange} />
                                            <label htmlFor="review">Review</label>
                                        </div>
                                        <div class="col-lg-4 col-12">
                                            <select className={"form-control" + applyErrorClass('rating')} type="text" value={values.rating} name="rating" onChange={handleInputChange}>
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                            <label htmlFor="rating">Rating</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('startTime')} name="startTime" type="text" value={values.startTime} onChange={handleInputChange} />
                                            <label htmlFor="startTime">StartTime</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('endTime')} name="endTime" type="text" value={values.endTime} onChange={handleInputChange} />
                                            <label htmlFor="endTime">EndTime</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('duration')} name="duration" type="text" value={values.duration} onChange={handleInputChange} />
                                            <label htmlFor="duration">Duration</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('appointmentTime')} name="appointmentTime" type="text" value={values.appointmentTime} onChange={handleInputChange} />
                                            <label htmlFor="appointmentTime">AppointmentTime</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('userServices')} name="userServices" type="text" value={values.userServices} onChange={handleInputChange} />
                                            <label htmlFor="userServices">UserServices</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('paymentPlace')} name="paymentPlace" type="text" value={values.paymentPlace} onChange={handleInputChange} />
                                            <label htmlFor="paymentPlace">PaymentPlace</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <select
                                                name="businessEmployeeId"
                                                type="text"
                                                value={values.businessEmployeeId}
                                                onChange={handleInputChange}
                                                className="form-control"
                                            >
                                                <option value="0">Please Select</option>
                                                {businessEmployeeList.map((bus) => (
                                                    <option value={bus.businessEmployeeId}>
                                                        {bus.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <label htmlFor="businessEmployeeId">Employee</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12"></div>
                                        <div className="table-responsive product-list">
                                <table className="table table-bordered table-striped mt-3" id="appointmentsList">
                                    <thead>
                                        <tr>
                                            <th>Service Name</th>
                                            <th>Duration</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {serviceslist && serviceslist.map(app =>
                                            <tr key={app.servicePriceId}>
                                                <td>{app.service.serviceName}</td>
                                                <td>{app.duration}</td>
                                                <td>{app.price}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                                    </div>
                                    <button className="btn btn-primary" type="submit">Update Now</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}