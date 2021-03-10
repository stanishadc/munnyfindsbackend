import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { handleSuccess, handleError } from '../CustomAlerts'
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
export default function Dashboard(props) {
    const [categoryList, setCategoryList] = useState([])
    const applicationAPI = (url = 'https://munnyfindsapi.azurewebsites.net/api/category/') => {
        return {
            fetchAll: () => axios.get(url + 'get'),
            create: newRecord => axios.post(url + "insert", newRecord),
            update: (id, updateRecord) => axios.put(url + "update/" + id, updateRecord),
            delete: id => axios.delete(url + "delete/" + id)
        }
    }
    function refreshCategoryList() {
        applicationAPI().fetchAll()
            .then(res => setCategoryList(res.data))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        refreshCategoryList();
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
                                            <h3 className="mt-0 mb-0"><strong>250</strong></h3>
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
                                            <h3 className="mt-0 mb-0"><strong>3000</strong></h3>
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
                                            <h3 className="mt-0 mb-0"><strong>50</strong></h3>
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
                                            <h3 className="mt-0 mb-0"><strong>2900</strong></h3>
                                            <p><small className="text-muted bc-description">Active Salons</small></p>
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
                                            <h3 className="mt-0 mb-0"><strong>100</strong></h3>
                                            <p><small className="text-muted bc-description">InActive Salons</small></p>
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
                                            <h3 className="mt-0 mb-0"><strong>3000</strong></h3>
                                            <p><small className="bc-description">Total Salons</small></p>
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
                                <div className="text-right">
                                    <button className="btn btn-outline-theme"><i className="fa fa-eye" /> View full orders</button>
                                </div>
                            </div>
                        </div>
                        {/*/Order Listing*/}
                        {/*Order Info Modal*/}
                        <div className="modal fade" id="orderInfo" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Ord#13 details</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <table className="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="row">Item</th>
                                                    <th>Quantity</th>
                                                    <th>Unit price</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td scope="row">Red Shoes</td>
                                                    <td>2</td>
                                                    <td>$400</td>
                                                    <td>$800</td>
                                                </tr>
                                                <tr>
                                                    <td scope="row">Blue shirt</td>
                                                    <td>1</td>
                                                    <td>$400</td>
                                                    <td>$400</td>
                                                </tr>
                                                <tr>
                                                    <td scope="row">Knickers</td>
                                                    <td>3</td>
                                                    <td>$300</td>
                                                    <td>$900</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="text-right mt-4 p-4">
                                            <p><strong>Sub - Total amount: $14,768.00</strong></p>
                                            <p><strong>Shipping: $1000.00</strong></p>
                                            <p><span>vat(10%): $150.00</span></p>
                                            <h4 className="mt-2"><strong>Total: $16,050.00</strong></h4>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*Order Info Modal*/}
                        {/*Order Update Modal*/}
                        <div className="modal fade" id="orderUpdate" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Ord#13 details update</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <table className="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th scope="row">Item</th>
                                                    <th className="order-qty-head">Quantity</th>
                                                    <th>Unit price</th>
                                                    <th>Total</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="align-middle">01</td>
                                                    <td scope="row" className="align-middle">Red Shoes</td>
                                                    <td className="text-center align-middle"><input type="text" defaultValue={2} className="order-qty" /></td>
                                                    <td className="align-middle">$400</td>
                                                    <td className="align-middle">$800</td>
                                                    <td style={{ width: 120 }} className="align-middle">
                                                        <button className="btn btn-theme mr-1"><i className="fa fa-pencil-square-o" /></button>
                                                        <button className="btn btn-danger"><i className="fa fa-trash-o" /></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="align-middle">02</td>
                                                    <td className="align-middle" scope="row">Blue shirt</td>
                                                    <td className="text-center align-middle"><input type="text" defaultValue={1} className="order-qty" /></td>
                                                    <td className="align-middle">$400</td>
                                                    <td className="align-middle">$400</td>
                                                    <td className="align-middle">
                                                        <button className="btn btn-theme mr-1"><i className="fa fa-pencil-square-o" /></button>
                                                        <button className="btn btn-danger"><i className="fa fa-trash-o" /></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="align-middle">03</td>
                                                    <td className="align-middle" scope="row">Knickers</td>
                                                    <td className="text-center align-middle"><input type="text" defaultValue={3} className="order-qty" /></td>
                                                    <td className="align-middle">$300</td>
                                                    <td className="align-middle">$900</td>
                                                    <td className="align-middle">
                                                        <button className="btn btn-theme mr-1"><i className="fa fa-pencil-square-o" /></button>
                                                        <button className="btn btn-danger"><i className="fa fa-trash-o" /></button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="text-right mt-4 p-4">
                                            <p><strong>Sub - Total amount: $14,768.00</strong></p>
                                            <p><strong>Shipping: $1000.00</strong></p>
                                            <p><span>vat(10%): $150.00</span></p>
                                            <h4 className="mt-2"><strong>Total: $16,050.00</strong></h4>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*Order Update Modal*/}
                    </div>
                    {/*Footer*/}
                    <div className="row mt-5 mb-4 footer">
                        <div className="col-sm-8">
                            <span>© All rights reserved 2019 designed by <a className="text-theme" href="#">A-Fusion</a></span>
                        </div>
                        <div className="col-sm-4 text-right">
                            <a href="#" className="ml-2">Contact Us</a>
                            <a href="#" className="ml-2">Support</a>
                        </div>
                    </div>
                    {/*Footer*/}
                </div>


            </div>
            <Footer></Footer>
        </div>
    )
}