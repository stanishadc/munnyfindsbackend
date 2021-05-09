import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleSuccess, handleError } from "../../CustomAlerts";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import Footer from "../../Footer";
const initialFieldValues = {
  serviceId: 0,
  serviceName: "",
  description: "",
  businessId: "",
  businessTypeId: 0,
  business: "",
  businessName: "",
  categoryId: "",
  categoryName: "",
  status: "true",
  createdDate: new Date().toLocaleString(),
  updatedDate: new Date().toLocaleString(),
};
export default function ServiceList(props) {
  const [values, setValues] = useState(initialFieldValues);
  const [serviceList, setServiceList] = useState([]);
  const [businessType, setBusinessType] = useState([]);
  const [businessList, setBusinessList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
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
  const handleTypeChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(e.target.value);
    GetBusiness(e.target.value);
    GetCategory(e.target.value);
  };
  function GetBusiness(id) {
    applicationAPI()
      .fetchBusiness(id)
      .then((res) => setBusinessList(res.data))
      .catch((err) => console.log(err));
  }
  function GetCategory(id) {
    applicationAPI()
      .fetchCategory(id)
      .then((res) => setCategoryList(res.data))
      .catch((err) => console.log(err));
  }
  const validate = () => {
    let temp = {};
    temp.serviceName = values.serviceName === "" ? false : true;
    temp.status = values.status === "0" ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("serviceId", values.serviceId);
      formData.append("serviceName", values.serviceName);
      formData.append("description", values.description);
      formData.append("businessTypeId", values.businessTypeId);
      formData.append("business", values.business);
      formData.append("businessId", values.businessId);
      formData.append("businessName", values.businessName);
      formData.append("categoryId", values.categoryId);
      formData.append("categoryName", values.categoryName);
      formData.append("createdDate", values.createdDate);
      formData.append("updatedDate", values.updatedDate);
      formData.append("status", values.status);
      console.log(values);
      console.log(1);
      addOrEdit(formData, resetForm);
    }
  };
  const applicationAPI = (url = "https://munnyapi.azurewebsites.net/api/service/") => {
    console.log();
    return {
      fetchBusinessType: (id) =>
        axios.get("https://munnyapi.azurewebsites.net/api/businesstype/Get/"),
      fetchBusiness: (id) =>
        axios.get("https://munnyapi.azurewebsites.net/api/business/GetByType/" + id),
      fetchCategory: (id) =>
        axios.get("https://munnyapi.azurewebsites.net/api/category/GetByType/" + id),
      fetchAll: () => axios.get(url + "get"),
      create: (newRecord) => axios.post(url + "insert", newRecord),
      update: (id, updateRecord) =>
        axios.put(url + "update/" + id, updateRecord),
      delete: (id) => axios.delete(url + "delete/" + id),
    };
  };
  const addOrEdit = (formData, onSuccess) => {
    if (formData.get("serviceId") === "0") {
      applicationAPI()
        .create(formData)
        .then((res) => {
          handleSuccess("New Service Added");
          resetForm();
          refreshServiceList();
        });
    } else {
      applicationAPI()
        .update(formData.get("serviceId"), formData)
        .then((res) => {
          handleSuccess("Service Details Updated");
          resetForm();
          refreshServiceList();
        });
    }
  };
  const showEditDetails = (data) => {
    refreshBusinessType();
    GetBusiness(data.businessTypeId)
    GetCategory(data.businessTypeId)
    setRecordForEdit(data);
  };
  const onDelete = (e, id) => {
    if (window.confirm("Are you sure to delete this record?"))
      applicationAPI()
        .delete(id)
        .then((res) => {
          handleSuccess("Service Deleted Succesfully");
          refreshServiceList();
        })
        .catch((err) => handleError("Service Deleted Failed"));
  };
  const resetForm = () => {
    setValues(initialFieldValues);
  };
  function refreshServiceList() {
    applicationAPI()
      .fetchAll()
      .then((res) => setServiceList(res.data))
      .catch((err) => console.log(err));
  }
  function refreshBusinessType() {
    applicationAPI()
      .fetchBusinessType()
      .then((res) => setBusinessType(res.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    refreshServiceList();
    refreshBusinessType();
  }, []);
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
              Dashboard <i className="fa fa-angle-right" /> Service
            </span>
            <div className="row mt-3">
              <div className="col-sm-12">
                <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                  <h6 className="mb-3">Service Details</h6>
                  <div className="form-group row floating-label">
                    <div className="col-sm-4 col-12">
                      <select
                        name="businessTypeId"
                        type="text"
                        value={values.businessTypeId}
                        onChange={handleTypeChange}
                        className="form-control"
                      >
                        <option value="0">Please Select</option>
                        {businessType.map((bus) => (
                          <option value={bus.businessTypeId}>
                            {bus.business}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="business">Business Type</label>
                    </div>
                    <div className="col-sm-4 col-12">
                      <select
                        name="businessId"
                        type="text"
                        value={values.businessId}
                        onChange={handleInputChange}
                        className="form-control"
                      >
                        <option value="0">Please Select</option>
                        {businessList.map((bus) => (
                          <option value={bus.businessId}>
                            {bus.businessName}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="businessName">Business</label>
                    </div>
                    <div className="col-sm-4 col-12">
                      <select
                        name="categoryId"
                        type="text"
                        value={values.categoryId}
                        onChange={handleInputChange}
                        className="form-control"
                      >
                        <option value="0">Please Select</option>
                        {categoryList.map((bus) => (
                          <option value={bus.categoryId}>
                            {bus.categoryName}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="categoryName">Category</label>
                    </div>
                  </div>
                  <div className="form-group row floating-label">
                    <div className="col-sm-4 col-12">
                      <input
                        className={
                          "form-control" + applyErrorClass("serviceName")
                        }
                        name="serviceName"
                        type="text"
                        value={values.serviceName}
                        onChange={handleInputChange}
                        placeholder="Service Name"
                      />
                      <label htmlFor="serviceName">Service Name</label>
                    </div>
                    <div className="col-sm-4 col-12">
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
                  </div>
                  <div className="form-group row floating-label">
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
              id="serviceList"
            >
              <thead>
                <tr>
                  <th>Business</th>
                  <th>Category</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {serviceList.map((ser) => (
                  <tr key={ser.serviceId}>
                    <td>{ser.businessName}</td>
                    <td>{ser.categoryName}</td>
                    <td>{ser.serviceName}</td>
                    <td>{ser.status ? "active" : "inactive"}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm mr-2"
                        onClick={() => {
                          showEditDetails(ser);
                        }}
                      >
                        <i className="fas fa-pencil-alt" />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={(e) => onDelete(e, parseInt(ser.serviceId))}
                      >
                        <i className="fas fa-trash-alt" />
                      </button>
                    </td>
                  </tr>
                ))}
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
