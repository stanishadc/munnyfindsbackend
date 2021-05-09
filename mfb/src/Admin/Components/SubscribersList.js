import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { handleSuccess, handleError } from '../CustomAlerts'
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
const initialFieldValues = {
    subscribeId: 0,
    subscribeEmail: "",
    status: true,
    createdDate: new Date().toLocaleString(),
    updatedDate: new Date().toLocaleString()
}
export default function SubscribersList(props) {
    const [SubscribeList, setSubscribeList] = useState([])
    const [values, setValues] = useState(initialFieldValues);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (recordForEdit !== null) setValues(recordForEdit);
    }, [recordForEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const validate = () => {
        let temp = {};
        temp.subscribeEmail = values.subscribeEmail === "" ? false : true;
        temp.status = values.status === "0" ? false : true;
        setErrors(temp);
        return Object.values(temp).every((x) => x === true);
    };

    const showEditDetails = (data) => {
        setRecordForEdit(data);
    };

    const resetForm = () => {
        setValues(initialFieldValues);
    };

    const applicationAPI = (url = "https://munnyapi.azurewebsites.net/api/subscribe/") => {
        return {
            fetchAll: () => axios.get(url + 'get'),
            update: (id, updateRecord) =>
                axios.put(url + "update/" + id, updateRecord),
            delete: id => axios.delete(url + "delete/" + id)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData();
            formData.append("subscribeId", values.subscribeId);
            formData.append("subscribeEmail", values.subscribeEmail);
            formData.append("createdDate", values.createdDate);
            formData.append("updatedDate", values.updatedDate);
            formData.append("status", values.status);
            console.log(values);
            addOrEdit(formData, resetForm);
        }
    };

    const addOrEdit = (formData, onSuccess) => {
        applicationAPI().update(formData.get("subscribeId"), formData)
            .then((res) => {
                alert(" Updated");
                resetForm();
                refreshSubscribeList();
            });
    };

    const onDelete = (e, id) => {
        if (window.confirm('Are you sure to delete this record?'))
            applicationAPI().delete(id)
                .then(res => {
                    handleSuccess("Subescriber Deleted Succesfully");
                    refreshSubscribeList()
                })
                .catch(err => handleError("Subescriber Deleted Failed"))
    }

    function refreshSubscribeList() {
        applicationAPI().fetchAll()
            .then(res => setSubscribeList(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        refreshSubscribeList();
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
                    <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                        <span className="text-secondary">
                            Dashboard <i className="fa fa-angle-right" /> Subscribers
                         </span>
                        <div className="row mt-3">
                            <div className="col-sm-12">
                                <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                                    <h6 className="mb-3">Subscribers Details</h6>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4 col-12">
                                            <input
                                                className={"form-control" + applyErrorClass("subscribeEmail")}
                                                name="subscribeEmail"
                                                type="text"
                                                value={values.subscribeEmail}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="subscribeEmail">Email</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <select
                                                value={values.status}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                name="status"
                                            >
                                                <option value="true">active</option>
                                                <option value="false">inactive</option>
                                            </select>
                                            <label htmlFor="status">Status</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <button type="submit" className="btn btn-primary mr-3">
                                                Submit
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={resetForm}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>

                                    <div className="table-responsive product-list">
                        <table
                            className="table table-bordered table-striped mt-3"
                            id="businessTypeList"
                        >
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {SubscribeList.map(sub =>
                                    <tr key={sub.subscribeId}>
                                        <td>{sub.subscribeEmail}</td>
                                        <td>{sub.status ? "active" : "inactive"}</td>
                                        <td>
                                            <button
                                                className="btn btn-success btn-sm mr-2"
                                                onClick={() => {
                                                    showEditDetails(sub);
                                                }}
                                            >
                                                <i className="fas fa-pencil-alt" />
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={(e) =>
                                                    onDelete(e, parseInt(sub.subscribeId))
                                                }
                                            >
                                                <i className="fas fa-trash-alt" />
                                            </button>
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
    )
}