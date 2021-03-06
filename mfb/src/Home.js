import React from 'react'
export default function Home(params) {
    return(
        <div className="login-body">
        <div className="container-fluid login-wrapper">
          <div className="login-box">
            <h1 className="text-center mb-5">WELCOME</h1>
            <div className="row">
              <div className="col-md-6 col-sm-6 col-12 login-box-info">
                <h3 className="mb-4">ECOMMERCE LOGIN</h3>
                <p className="mb-4">Only office staff able to login in to the system</p>
                <p className="text-center"></p>
              </div>
              <div className="col-md-6 col-sm-6 col-12 login-box-form p-4">
                <h3 className="mb-2">Login</h3>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1"><i className="fa fa-user" /></span>
                  </div>
                  <input type="text" className="form-control mt-0" name="Username" aria-label="UserName" aria-describedby="basic-addon1" placeholder="UserName" />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1"><i className="fa fa-lock" /></span>
                  </div>
                  <input type="password" className="form-control mt-0" name="Password" aria-label="Password" aria-describedby="basic-addon1" placeholder="Password" />
                </div>
                <div className="form-group">
                  <button className="btn btn-theme btn-block p-2 mb-1">Login</button>
                  <a href="fake_url">
                    <small className="text-theme"><strong>Forgot password?</strong></small>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>    
    )
}