import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import Footer from '../../Footer';
export default function CustomersList(props) {
    const [customersList, setCustomersList] = useState([])    
    const applicationAPI = (url = 'https://munnyfindsapi.azurewebsites.net/api/customer/') => {
        return {
            fetchAll: () => axios.get(url + 'get'),
            delete: id => axios.delete(url + "delete/" + id)
        }
    }
    function refreshCustomersList() {
        applicationAPI().fetchAll()
            .then(res => setCustomersList(res.data))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        refreshCustomersList();
    }, [])
    return (
        <div className="container-fluid">
            <Header />
            <div className="row main-content">
                <div className="col-sm-3 col-xs-6 sidebar pl-0">
                    <Sidebar />
                </div>
                <div className="col-sm-9 col-xs-12 content pt-3 pl-0">
                <span className="text-secondary">Dashboard <i className="fa fa-angle-right" /> Customers List</span>
                    <div className="mt-4 mb-4 p-3 bg-white border shadow-sm lh-sm">
                    <div className="product-list">
                        <div className="row border-bottom mb-4">
                            <div className="col-sm-8 pt-2"><h6 className="mb-4 bc-header">Customer listing</h6></div>
                            <div className="col-sm-4 text-right pb-3">
                                
                            </div>
                        </div>
                    <div className="table-responsive product-list">
                        <table className="table table-bordered table-striped mt-3" id="categoryList">
                            <thead>
                                <tr>
                                    <th>Customer Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>No Of Appointments</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customersList.map(customer =>
                                    <tr key={customer.customerId}>
                                        <td>{customer.customerName}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.mobileNo}</td>
                                        <td>{customer.status ? "active" : "inactive"}</td>
                                        <td>
                                            <button className="btn btn-success mr-2"><i className="fa fa-pencil" /></button>
                                            <button className="btn btn-danger"><i className="fas fa-trash" /></button></td>
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