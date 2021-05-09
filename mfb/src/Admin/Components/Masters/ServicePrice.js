import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleSuccess, handleError } from "../../CustomAlerts";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import Footer from "../../Footer";
const initialFieldValues = {
  servicePriceId: 0,
  servicePriceName: "",
  duration: "",
  price: "",
  status: "true",
  serviceId: "",
  businessTypeId: "",
  businessId: "",
  categoryId: "",
  description: "",
  createdDate: new Date().toLocaleString(),
  updatedDate: new Date().toLocaleString(),
};
export default function ServicePriceList(props) {
  const [businessType, setBusinessType] = useState([]);
  const [businessList, setBusinessList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [servicePriceList, setServicePriceList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [values, setValues] = useState(initialFieldValues);
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
  const handleBusinessChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    GetService(e.target.value);
  };
  const handleTypeChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
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
  function GetService(id) {
    applicationAPI()
      .fetchService(id)
      .then((res) => setServiceList(res.data))
      .catch((err) => console.log(err));
  }
  const validate = () => {
    let temp = {};
    temp.servicePriceName = values.servicePriceName === "" ? false : true;
    temp.status = values.status === "0" ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("servicePriceId", values.servicePriceId);
      formData.append("servicePriceName", values.servicePriceName);
      formData.append("duration", values.duration);
      formData.append("price", values.price);
      formData.append("status", values.status);
      formData.append("serviceId", values.serviceId);
      formData.append("description", values.description);
      formData.append("createdDate", values.createdDate);
      formData.append("updatedDate", values.updatedDate);
      console.log(values);
      console.log(2);
      addOrEdit(formData, resetForm);
    }
  };
  const applicationAPI = (
    url = "https://munnyapi.azurewebsites.net/api/serviceprice/"
  ) => {
    return {
      fetchBusinessType: (id) => axios.get("https://munnyapi.azurewebsites.net/api/businesstype/Get/"),
      fetchAll: () => axios.get(url + "get"),
      fetchBusiness: (id) => axios.get("https://munnyapi.azurewebsites.net/api/business/GetByType/" + id),
      fetchCategory: (id) => axios.get("https://munnyapi.azurewebsites.net/api/category/GetByType/" + id),
      fetchService: (id) => axios.get("https://munnyapi.azurewebsites.net/api/service/GetByBusinessType/" + id),
      create: (newRecord) => axios.post(url + "insert", newRecord),
      update: (id, updateRecord) => axios.put(url + "update/" + id, updateRecord),
      delete: (id) => axios.delete(url + "delete/" + id),
    };
  };
  const addOrEdit = (formData, onSuccess) => {
    if (formData.get("servicePriceId") === "0") {
      applicationAPI()
        .create(formData)
        .then((res) => {
          handleSuccess("New Service Price Added");
          resetForm();
          refreshServicePriceList();
        });
    } else {
      applicationAPI()
        .update(formData.get("servicePriceId"), formData)
        .then((res) => {
          handleSuccess("Service Price Details Updated");
          resetForm();
          refreshServicePriceList();
        });
    }
  };
  const showEditDetails = (data) => {
    refreshBusinessType();
    GetBusiness(data.businessTypeId);
    GetCategory(data.businessTypeId);
    GetService(data.businessId)
    setRecordForEdit(data);
    console.log(values)
  };
  const onDelete = (e, id) => {
    if (window.confirm("Are you sure to delete this record?"))
      applicationAPI()
        .delete(id)
        .then((res) => {
          handleSuccess("Servic Price Deleted Succesfully");
          refreshServicePriceList();
        })
        .catch((err) => handleError("Service Price Deleted Failed"));
  };
  const resetForm = () => {
    setValues(initialFieldValues);
  };
  function refreshServicePriceList() {
    applicationAPI()
      .fetchAll()
      .then((res) => setServicePriceList(res.data))
      .catch((err) => console.log(err));
  }
  function refreshBusinessType() {
    applicationAPI().fetchBusinessType()
      .then(res =>
        setBusinessType(res.data)
      ).catch((err => console.log(err)));
  }
  useEffect(() => {
    refreshServicePriceList();
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
              Dashboard <i className="fa fa-angle-right" /> Service Price
            </span>
            <div className="row mt-3">
              <div className="col-sm-12">
                <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                  <h6 className="mb-3">Service Price</h6>
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
                        onChange={handleBusinessChange}
                        className="form-control"
                      >
                        <option value="0">Please Select</option>
                        {businessList.map((bus) => (
                          <option value={bus.businessId}>
                            {bus.businessName}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="businessId">Business</label>
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
                      <label htmlFor="categoryId">Category</label>
                    </div>
                  </div>
                  <div className="form-group row floating-label">
                    <div className="col-sm-4 col-12">
                      <select
                        name="serviceId"
                        type="text"
                        value={values.serviceId}
                        onChange={handleInputChange}
                        className="form-control"
                      >
                        <option value="0">Please Select</option>
                        {serviceList.map((bus) => (
                          <option value={bus.serviceId}>
                            {bus.serviceName}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="serviceId">Service</label>
                    </div>
                    <div className="col-sm-4 col-12">
                      <input
                        className={"form-control" + applyErrorClass("servicePriceName")}
                        name="servicePriceName"
                        type="text"
                        value={values.servicePriceName}
                        onChange={handleInputChange}
                        placeholder="ServicePriceName"
                      />
                      <label htmlFor="servicePriceName">ServicePriceName</label>
                    </div>
                    <div className="col-sm-4 col-12">
                      <input
                        className={"form-control" + applyErrorClass("duration")}
                        name="duration"
                        type="text"
                        value={values.duration}
                        onChange={handleInputChange}
                        placeholder="Duration"
                      />
                      <label htmlFor="duration">Duration</label>
                    </div>
                  </div>
                  <div className="form-group row floating-label">
                    <div className="col-sm-4 col-12">
                      <input
                        className={"form-control" + applyErrorClass("price")}
                        name="price"
                        type="text"
                        value={values.price}
                        onChange={handleInputChange}
                        placeholder="Price"
                      />
                      <label htmlFor="price">Price</label>
                    </div>
                    <div className="col-sm-4 col-12">
                      <input
                        className={"form-control" + applyErrorClass("description")}
                        name="description"
                        type="text"
                        value={values.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                      />
                      <label htmlFor="description">Description</label>
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
                    <div className="col-sm-4 col-12">
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
              id="servicePriceList"
            >
              <thead>
                <tr>
                  <th>Service Type</th>
                  <th>Duration</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {servicePriceList.map((ser) => (
                  <tr key={ser.servicePriceId}>
                    <td>{ser.serviceName}</td>
                    <td>{ser.duration}</td>
                    <td>{ser.price}</td>
                    <td>{ser.description}</td>
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
                        onClick={(e) =>
                          onDelete(e, parseInt(ser.servicePriceId))
                        }
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