import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import Footer from '../../Footer';
const initialFieldValues = {
    customerId: 0,
    customerName: '',
    customerMobile: '',
    customerEmail: '',
    username: '',
    password: '',
    status: "true",
    createdDate: new Date().toLocaleString(),
    updatedDate: new Date().toLocaleString()
}
export default function CustomerViewList(props) {
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
    const applicationAPI = (url = "https://localhost:44368/api/customer/") => {
        return {
            fetchCustomerView: () => axios.get(url + 'getbyid/' + props.match.params["customerId"]),
        }
    }
    function refreshCustomerView() {
        applicationAPI().fetchCustomerView()
            .then(res => setValues(res.data[0]))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        refreshCustomerView();
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
                    <form autoComplete="off" noValidate>
                        <span className="text-secondary"> Dashboard <i className="fa fa-angle-right" /> Customer List</span>
                        <div className="row mt-3">
                            <div className="col-sm-12">
                                <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                                    <h6 className="mb-3">Customer Details</h6>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('customerName')} name="customerName" type="text" value={values.customerName} />
                                            <label htmlFor="customerName">Customer Name</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('customerMobile')} name="customerMobile" type="text" value={values.customerMobile} />
                                            <label htmlFor="customerMobile">Customer Mobile</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('customerEmail')} name="customerEmail" type="text" value={values.customerEmail} />
                                            <label htmlFor="customerEmail">Customer Email</label>
                                        </div>
                                    </div>
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