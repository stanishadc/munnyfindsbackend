import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleSuccess, handleError } from "../../CustomAlerts";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import Footer from "../../Footer";
const initialFieldValues = {
  businessTypeId: 0,
  business: "",
  status: "true",
  createdDate: new Date().toLocaleString(),
  updatedDate: new Date().toLocaleString(),
  businessTypeURL: "",
};
export default function BusinessTypes(props) {
  const [businessTypeList, setBusinessTypeList] = useState([]);
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
  const validate = () => {
    let temp = {};
    temp.business = values.business === "" ? false : true;
    temp.status = values.status === "0" ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("businessTypeId", values.businessTypeId);
      formData.append("business", values.business);
      formData.append("createdDate", values.createdDate);
      formData.append("updatedDate", values.updatedDate);
      formData.append("status", values.status);
      formData.append("businessTypeURL", values.businessTypeURL);
      console.log(values);
      addOrEdit(formData, resetForm);
    }
  };
  const applicationAPI = (
    url = "https://munnyapi.azurewebsites.net/api/businesstype/"
  ) => {
    return {
      fetchAll: () => axios.get(url + "get"),
      create: (newRecord) => axios.post(url + "insert", newRecord),
      update: (id, updateRecord) =>
        axios.put(url + "update/" + id, updateRecord),
      delete: (id) => axios.delete(url + "delete/" + id),
    };
  };
  const addOrEdit = (formData, onSuccess) => {
    if (formData.get("businessTypeId") === "0") {
      applicationAPI()
        .create(formData)
        .then((res) => {
          handleSuccess("New BusinessType Added");
          resetForm();
          refreshBusinessTypeList();
        });
    } else {
      applicationAPI()
        .update(formData.get("businessTypeId"), formData)
        .then((res) => {
          handleSuccess("BusinessType Details Updated");
          resetForm();
          refreshBusinessTypeList();
        });
    }
  };
  const showEditDetails = (data) => {
    setRecordForEdit(data);
  };
  const onDelete = (e, id) => {
    if (window.confirm("Are you sure to delete this record?"))
      applicationAPI()
        .delete(id)
        .then((res) => {
          handleSuccess("Business Type Deleted Succesfully");
          refreshBusinessTypeList();
        })
        .catch((err) => handleError("BusinessType Deleted Failed"));
  };
  const resetForm = () => {
    setValues(initialFieldValues);
  };
  function refreshBusinessTypeList() {
    applicationAPI()
      .fetchAll()
      .then((res) => setBusinessTypeList(res.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    refreshBusinessTypeList();
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
              Dashboard <i className="fa fa-angle-right" /> Business Type
            </span>
            <div className="row mt-3">
              <div className="col-sm-12">
                <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                  <h6 className="mb-3">Business Details</h6>
                  <div className="form-group row floating-label">
                    <div className="col-sm-4 col-12">
                      <input
                        className={"form-control" + applyErrorClass("business")}
                        name="business"
                        type="text"
                        value={values.business}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="business">Buinsess</label>
                    </div>
                    <div className="col-sm-4">
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
                </div>
              </div>
            </div>
          </form>
          <div className="table-responsive product-list">
            <table
              className="table table-bordered table-striped mt-3"
              id="businessTypeList"
            >
              <thead>
                <tr>
                  <th>Buinsess Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {businessTypeList.map((bus) => (
                  <tr key={bus.businessTypeId}>
                    <td>{bus.business}</td>
                    <td>{bus.status ? "active" : "inactive"}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm mr-2"
                        onClick={() => {
                          showEditDetails(bus);
                        }}
                      >
                        <i className="fas fa-pencil-alt" />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={(e) =>
                          onDelete(e, parseInt(bus.businessTypeId))
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
      <Footer></Footer>
    </div>
  );
}
