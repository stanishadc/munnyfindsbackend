import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { handleSuccess, handleError } from '../CustomAlerts'
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
const initialFieldValues = {
    categoryId: 0,
    categoryName: '',
    status: "true",
    createdDate: new Date().toLocaleString(),
    updatedDate: new Date().toLocaleString(),
    userId: 1,
    categoryurl: ''
}
export default function Appointments(props) {
    const [customersList, setCustomersList] = useState([])
    
    const applicationAPI = (url = 'https://munnyfindsapi.azurewebsites.net/api/customer/') => {
        return {
            fetchAll: () => axios.get(url + 'get'),
            delete: id => axios.delete(url + "delete/" + id)
        }
    }
    const onDelete = (e, id) => {
        if (window.confirm('Are you sure to delete this record?'))
            applicationAPI().delete(id)
                .then(res => {
                    handleSuccess("Customer Deleted Succesfully");
                    refreshCustomersList()
                })
                .catch(err => handleError("Customer Deleted Failed"))
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
                <span className="text-secondary">Dashboard <i className="fa fa-angle-right" /> Appointments List</span>
                    <div className="mt-4 mb-4 p-3 bg-white border shadow-sm lh-sm">
                    <div className="product-list">
                        <div className="row border-bottom mb-4">
                            <div className="col-sm-8 pt-2"><h6 className="mb-4 bc-header">Appointments listing</h6></div>
                            <div className="col-sm-4 text-right pb-3">
                                
                            </div>
                        </div>
                    <div className="table-responsive product-list">
                    <table className="table table-bordered table-striped mt-0" id="productList">
                                    <thead>
                                        <tr>                                            
                                            <th>Appointment No</th>
                                            <th>Customer Name</th>
                                            <th>Salon Name</th>
                                            <th>Appointment Date</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>AP23245634</td>
                                            <td className="align-middle">Stephanie Cott</td>
                                            <td className="align-middle">David Salon</td>
                                            <td>15/09/2018</td>
                                            <td className="align-middle">$200</td>
                                            <td className="align-middle"><span className="badge badge-warning">Pending</span></td>
                                            <td className="align-middle text-center">
                                                <button className="btn btn-theme" data-toggle="modal" data-target="#orderInfo">
                                                    <i className="fa fa-eye" />
                                                </button>
                                                <button className="btn btn-success" data-toggle="modal" data-target="#orderUpdate"><i className="fa fa-pencil" /></button>
                                                <button className="btn btn-danger"><i className="fas fa-trash" /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>AP23245634</td>
                                            <td className="align-middle">Stephanie Cott</td>
                                            <td className="align-middle">David Salon</td>
                                            <td>15/09/2018</td>
                                            <td className="align-middle">$200</td>
                                            <td className="align-middle"><span className="badge badge-warning">Pending</span></td>
                                            <td className="align-middle text-center">
                                                <button className="btn btn-theme" data-toggle="modal" data-target="#orderInfo">
                                                    <i className="fa fa-eye" />
                                                </button>
                                                <button className="btn btn-success" data-toggle="modal" data-target="#orderUpdate"><i className="fa fa-pencil" /></button>
                                                <button className="btn btn-danger"><i className="fas fa-trash" /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>AP23245634</td>
                                            <td className="align-middle">Stephanie Cott</td>
                                            <td className="align-middle">David Salon</td>
                                            <td>15/09/2018</td>
                                            <td className="align-middle">$200</td>
                                            <td className="align-middle"><span className="badge badge-warning">Pending</span></td>
                                            <td className="align-middle text-center">
                                                <button className="btn btn-theme" data-toggle="modal" data-target="#orderInfo">
                                                    <i className="fa fa-eye" />
                                                </button>
                                                <button className="btn btn-success" data-toggle="modal" data-target="#orderUpdate"><i className="fa fa-pencil" /></button>
                                                <button className="btn btn-danger"><i className="fas fa-trash" /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>AP23245634</td>
                                            <td className="align-middle">Stephanie Cott</td>
                                            <td className="align-middle">David Salon</td>
                                            <td>15/09/2018</td>
                                            <td className="align-middle">$200</td>
                                            <td className="align-middle"><span className="badge badge-warning">Pending</span></td>
                                            <td className="align-middle text-center">
                                                <button className="btn btn-theme" data-toggle="modal" data-target="#orderInfo">
                                                    <i className="fa fa-eye" />
                                                </button>
                                                <button className="btn btn-success" data-toggle="modal" data-target="#orderUpdate"><i className="fa fa-pencil" /></button>
                                                <button className="btn btn-danger"><i className="fas fa-trash" /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>AP23245634</td>
                                            <td className="align-middle">Stephanie Cott</td>
                                            <td className="align-middle">David Salon</td>
                                            <td>15/09/2018</td>
                                            <td className="align-middle">$200</td>
                                            <td className="align-middle"><span className="badge badge-warning">Pending</span></td>
                                            <td className="align-middle text-center">
                                                <button className="btn btn-theme" data-toggle="modal" data-target="#orderInfo">
                                                    <i className="fa fa-eye" />
                                                </button>
                                                <button className="btn btn-success" data-toggle="modal" data-target="#orderUpdate"><i className="fa fa-pencil" /></button>
                                                <button className="btn btn-danger"><i className="fas fa-trash" /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>AP23245634</td>
                                            <td className="align-middle">Stephanie Cott</td>
                                            <td className="align-middle">David Salon</td>
                                            <td>15/09/2018</td>
                                            <td className="align-middle">$200</td>
                                            <td className="align-middle"><span className="badge badge-warning">Pending</span></td>
                                            <td className="align-middle text-center">
                                                <button className="btn btn-theme" data-toggle="modal" data-target="#orderInfo">
                                                    <i className="fa fa-eye" />
                                                </button>
                                                <button className="btn btn-success" data-toggle="modal" data-target="#orderUpdate"><i className="fa fa-pencil" /></button>
                                                <button className="btn btn-danger"><i className="fas fa-trash" /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>AP23245634</td>
                                            <td className="align-middle">Stephanie Cott</td>
                                            <td className="align-middle">David Salon</td>
                                            <td>15/09/2018</td>
                                            <td className="align-middle">$200</td>
                                            <td className="align-middle"><span className="badge badge-warning">Pending</span></td>
                                            <td className="align-middle text-center">
                                                <button className="btn btn-theme" data-toggle="modal" data-target="#orderInfo">
                                                    <i className="fa fa-eye" />
                                                </button>
                                                <button className="btn btn-success" data-toggle="modal" data-target="#orderUpdate"><i className="fa fa-pencil" /></button>
                                                <button className="btn btn-danger"><i className="fas fa-trash" /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>AP23245634</td>
                                            <td className="align-middle">Stephanie Cott</td>
                                            <td className="align-middle">David Salon</td>
                                            <td>15/09/2018</td>
                                            <td className="align-middle">$200</td>
                                            <td className="align-middle"><span className="badge badge-warning">Pending</span></td>
                                            <td className="align-middle text-center">
                                                <button className="btn btn-theme" data-toggle="modal" data-target="#orderInfo">
                                                    <i className="fa fa-eye" />
                                                </button>
                                                <button className="btn btn-success" data-toggle="modal" data-target="#orderUpdate"><i className="fa fa-pencil" /></button>
                                                <button className="btn btn-danger"><i className="fas fa-trash" /></button>
                                            </td>
                                        </tr>
                                      
                                      </tbody></table>
                                </div>
                </div></div></div>
            </div>
            <Footer></Footer>
        </div>
    )
}