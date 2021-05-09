import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import auth from './Auth'
export default function Sidebar(props) {
    const history = useHistory();
    return (
        
        <div className="inner-sidebar mr-3">
            {/*Image Avatar*/}
            <div className="avatar text-center">
                <br />
                <p><strong>Welcome Admin</strong></p>
            </div>
            {/*Image Avatar*/}
            {/*Sidebar Navigation Menu*/}
            <div className="sidebar-menu-container">
                <ul className="sidebar-menu mt-4 mb-4">
                    <li className="parent">
                        <Link to={"/dashboard"}><i className="fa fa-dashboard mr-3"> </i>
                            <span className="none">Dashboard<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/appointmentslist"}><i className="fa fa-calendar mr-3"> </i>
                            <span className="none">Appointments<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/businesstype"}>
                            <i className="fa fa-scissors mr-3"> </i>
                            <span className="none"> Business Type<i className="fa fa-angle-down pull-right align-bottom" />
                            </span>
                        </Link>
                    </li>


                    <li className="parent">
                        <Link to={"/customerslist"}><i className="fa fa-user mr-3"> </i>
                            <span className="none">Customers<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/businesslist"}><i className="fa fa-scissors mr-3"> </i>
                            <span className="none">Business<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/categorylist"}><i className="fa fa-list mr-3"> </i>
                            <span className="none">Categories<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>

                    <li className="parent">
                        <Link to={"/service"}>
                            <i className="fa fa-scissors mr-3"> </i>
                            <span className="none"> Service<i className="fa fa-angle-down pull-right align-bottom" />
                            </span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/serviceprice"}>
                            <i className="fa fa-scissors mr-3"> </i>
                            <span className="none"> Service Price<i className="fa fa-angle-down pull-right align-bottom" />
                            </span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/userslist"}><i className="fa fa-users mr-3"> </i>
                            <span className="none">Users<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>                    
                    <li className="parent">
                        <Link to={"/subscriberslist"}><i className="fa fa-envelope mr-3"> </i>
                            <span className="none">Subscribers<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/offers"}><i className="fa fa-envelope mr-3"> </i>
                            <span className="none">Offers<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/aboutus"}>
                            <i className="fa fa-list mr-3"> </i>
                            <span className="none">  AboutUs<i className="fa fa-angle-down pull-right align-bottom" />
                            </span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/privacypolicy"}>
                            <i className="fa fa-list mr-3"> </i>
                            <span className="none"> Privacy Policy<i className="fa fa-angle-down pull-right align-bottom" />
                            </span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/termsandconditions"}>
                            <i className="fa fa-list mr-3"> </i>
                            <span className="none">  Terms And Conditions<i className="fa fa-angle-down pull-right align-bottom" />
                            </span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/faq"}>
                            <i className="fa fa-list mr-3"> </i>
                            <span className="none"> FAQ<i className="fa fa-angle-down pull-right align-bottom" />
                            </span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/contactus"}><i className="fa fa-envelope mr-3"> </i>
                            <span className="none">ContactUs<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={"/support"}><i className="fa fa-envelope mr-3"> </i>
                            <span className="none">Support<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                    <li className="parent">
                        <Link to={props.myroute} onClick={() => { auth.logout(() => { history.push("/") }) }}><i className="fa fa-sign-out mr-3"> </i>
                            <span className="none">Logout<i className="fa fa-angle-down pull-right align-bottom" /></span>
                        </Link>
                    </li>
                </ul>
            </div>
            {/*Sidebar Naigation Menu*/}
        </div>
    )
}