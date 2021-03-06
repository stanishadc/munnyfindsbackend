import React from 'react';
import { Link } from 'react-router-dom';
export default function Footer()
{
    return (
        <div className="row mt-5 mb-4 footer">
            <div className="col-sm-8">
                <span>All rights reserved ©  2020 by Perfumatory</span>
            </div>
            <div className="col-sm-4 text-right">
                <Link to={"/contactus"} className="ml-2">Contact Us</Link>
                <Link to={"/support"} className="ml-2">Support</Link>
            </div>
        </div>
    )
}