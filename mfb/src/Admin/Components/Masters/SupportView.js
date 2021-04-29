import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { handleSuccess, handleError } from '../../CustomAlerts'
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import Footer from '../../Footer';
const initialFieldValues = {
    supportId: 0,
    subjectId: "",
    name: "",
    email: "",
    mobile: "",
    message: "",
}
export default function SupportView(props) {
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }
    const applicationAPI = (url = 'https://localhost:44313/api/support/') => {
        return {
            fetchCustomerView: () => axios.get(url + 'getbyid/' + props.match.params["supportId"]),
        }
    }
    function refreshSupportView() {
        applicationAPI().fetchCustomerView()
            .then(res => setValues(res.data[0]))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        refreshSupportView();
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
                        <span className="text-secondary"> Dashboard <i className="fa fa-angle-right" /> Support List</span>
                        <div className="row mt-3">
                            <div className="col-sm-12">
                                <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                                    <h6 className="mb-3">Support Details</h6>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('name')} name="name" type="text" value={values.name} />
                                            <label htmlFor="name">Name</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('email')} name="email" type="text" value={values.email} />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('mobile')} name="mobile" type="text" value={values.mobile} />
                                            <label htmlFor="mobile">Mobile</label>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input className={"form-control" + applyErrorClass('message')} name="message" type="text" value={values.message} />
                                            <label htmlFor="message">Message</label>
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