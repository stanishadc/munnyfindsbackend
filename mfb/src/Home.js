import React, { useState } from 'react'
import auth from './Admin/Auth'
import { handleSuccess, handleError } from './Admin/CustomAlerts'
import axios from 'axios'
const initialFieldValues = {
  username: '',
  password: '',
}
export default function Home(props) {
  const [values, setValues] = useState(initialFieldValues)
  const [errors, setErrors] = useState({})
  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }
  const validate = () => {
    console.log("error");
    let temp = {}
    temp.username = values.username === "" ? false : true;
    temp.password = values.password === "" ? false : true;
    setErrors(temp)
    return Object.values(temp).every(x => x === true)
  }
  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData()
      formData.append('username', values.username)
      formData.append('password', values.password)
      addOrEdit(formData)
    }
  }
  const applicationAPI = (url = 'https://munnyfindsapi.azurewebsites.net/api/user/') => {
    return {
      CheckAdminLogin: newRecord => axios.post(url + "adminlogin", newRecord)
    }
  }
  const addOrEdit = (formData) => {
    applicationAPI().CheckAdminLogin(formData)
      .then(res => {
        console.log(res);
        if (res.data.status === "Success") {
          handleSuccess("Login Success");
          auth.login(() => {
            localStorage.setItem('MFUserId', res.data.data);
            props.history.push("/dashboard");
          });
        }
        else {
          values.password = '';
          handleError("Invalid User")
        }
      })
      .catch(err => console.log(err))

  }
  const applyErrorClass = field => ((field in errors && errors[field] === false) ? ' form-control-danger' : '')
  return (
    <div className="login-body">
      <div className="container-fluid login-wrapper">
        <div className="login-box">
          <h1 className="text-center mb-5">WELCOME</h1>
          <div className="row">
            <div className="col-md-6 col-sm-6 col-12 login-box-info">
              <h3 className="mb-4">ADMIN LOGIN</h3>
              <p className="mb-4">Only office staff able to login in to the system</p>
              <p className="text-center"></p>
            </div>
            <div className="col-md-6 col-sm-6 col-12 login-box-form p-4">
              <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                <h3 className="mb-2">Login</h3>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1"><i className="fa fa-user" /></span>
                  </div>
                  <input type="text" className={"form-control mt-0" + applyErrorClass('username')} name="username" placeholder="UserName" value={values.username} onChange={handleInputChange} />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1"><i className="fa fa-lock" /></span>
                  </div>
                  <input type="password" className={"form-control mt-0" + applyErrorClass('password')} name="password" placeholder="Password" value={values.password} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <button className="btn btn-theme btn-block p-2 mb-1" type="submit">Login</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}