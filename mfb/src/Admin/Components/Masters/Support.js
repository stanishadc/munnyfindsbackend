import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleSuccess, handleError } from "../../CustomAlerts";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import Footer from "../../Footer";
import { Link } from 'react-router-dom';

export default function Support(props) {
    const [supportList, setSupportList] = useState([])
    const [errors, setErrors] = useState({});

    const applicationAPI = (
        url = "https://munnyapi.azurewebsites.net/api/support/"
    ) => {
        return {
            fetchAll: () => axios.get(url + "get"),
        };
    };
    function refreshSupportList() {
        applicationAPI().fetchAll()
            .then(res => setSupportList(res.data))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        refreshSupportList();
    }, [])
    const applyErrorClass = (field) =>
        field in errors && errors[field] === false ? " form-control-danger" : "";
    return (
        <div className="container-fluid">
            <Header />
            <div className="row main-content">
                <div className="col-sm-3 col-xs-6 sidebar pl-0">
                    <Sidebar />
                </div>
                <div className="col-sm-9 col-xs-12 content pt-3 pl-0">
                    <form autoComplete="off" noValidate>
                        <span className="text-secondary">
                            Dashboard <i className="fa fa-angle-right" /> Support
                        </span>
                        <div className="row mt-3">
                            <div className="col-sm-12">
                                <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                                    <h6 className="mb-3">Support Details</h6>

                                    <div className="table-responsive product-list">
                                        <table className="table table-bordered table-striped mt-3" id="supportList">
                                            <thead>
                                                <tr>
                                                    <th>Subject</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Mobile</th>
                                                    <th>Message</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {supportList.map(sup =>
                                                    <tr key={sup.supportId}>
                                                        <td>{sup.subject.subjectName}</td>
                                                        <td>{sup.name}</td>
                                                        <td>{sup.email}</td>
                                                        <td>{sup.mobile}</td>
                                                        <td>{sup.message}</td>
                                                        <td>
                                                            <Link to={"/SupportView/" + sup.supportId} className="btn btn-success btn-sm mr-2"><i className="fa fa-eye" /> View</Link>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}