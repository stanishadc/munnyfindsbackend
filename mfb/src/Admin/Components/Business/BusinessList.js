import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { handleSuccess, handleError } from '../../CustomAlerts'
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import Footer from '../../Footer';
import { Link } from 'react-router-dom';
export default function BusinessList(props) {
    const [businessList, setBusinessList] = useState([])
    const applicationAPI = (url = "http://165.22.216.222/api/business/") => {
        return {
            fetchAll: () => axios.get(url + 'get'),
            delete: id => axios.delete(url + "delete/" + id)
        }
    }
    const onDelete = (e, id) => {
        if (window.confirm('Are you sure to delete this record?'))
            applicationAPI().delete(id)
                .then(res => {
                    handleSuccess("Business Deleted Succesfully");
                    refreshBusinessList()
                })
                .catch(err => handleError("Business Deleted Failed"))
    }
    function refreshBusinessList() {
        applicationAPI().fetchAll()
            .then(res => setBusinessList(res.data))
            .catch(err => console.log(err))
    }
    useEffect(() => {
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
                    <span className="text-secondary">Dashboard <i className="fa fa-angle-right" /> Business List </span>
                    <div className="mt-4 mb-4 p-3 bg-white border shadow-sm lh-sm">
                        <div className="product-list">
                            <div className="row border-bottom mb-4">
                                <div className="col-sm-8 pt-2"><h6 className="mb-4 bc-header">Business listing</h6></div>
                                <div className="col-sm-4 text-right pb-3">
                                    <Link to={"/AddBusiness"} className="btn btn-round btn-theme"><i className="fa fa-plus" />Add Business</Link>
                                </div>
                            </div>
                            <div className="table-responsive product-list">
                                <table className="table table-bordered table-striped mt-3" id="businessList">
                                    <thead>
                                        <tr>
                                            <th>Business Type</th>
                                            <th>Business Name</th>
                                            <th>Mobile</th>
                                            <th>Email</th>
                                            <th>City</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {businessList.map(b =>
                                            <tr key={b.businessId}>
                                                <td>{b.businessType.business}</td>
                                                <td>{b.businessName}</td>
                                                <td>{b.mobileNo}</td>
                                                <td>{b.email}</td>
                                                <td>{b.city}</td>
                                                <td>{b.status ? "active" : "inactive"}</td>
                                                <td>
                                                    <Link to={"/businessimages/" + b.businessId} className="btn btn-theme mr-2"><i className="fa fa-image" /></Link>
                                                    <Link to={"/businessdetails/" + b.businessId} className="btn btn-success mr-2"><i className="fa fa-pencil" /></Link>
                                                    <button className="btn btn-danger" onClick={e => onDelete(e, parseInt(b.businessId))}><i className="fas fa-trash" /></button></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div></div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}