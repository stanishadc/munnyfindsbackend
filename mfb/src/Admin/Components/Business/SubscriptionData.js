import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import Footer from '../../Footer';
import { handleSuccess, handleError } from "../../CustomAlerts";
const initialFieldValues = {
    subscriptionTypeId: 0,
    subscriptionDataId: 0,
    subscriptionText: ""
  };
  export default function SubscriptionData(props) {
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
      temp.subscriptionText = values.subscriptionText === "" ? false : true;
      setErrors(temp);
      return Object.values(temp).every((x) => x === true);
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      if (validate()) {
        const formData = new FormData();
        formData.append("subscriptionTypeId", props.match.params["subscriptionTypeId"]);
        formData.append("subscriptionDataId", values.subscriptionDataId);
        formData.append("subscriptionText", values.subscriptionText);
        console.log(values);
        addOrEdit(formData, resetForm);
      }
    };
    const applicationAPI = (
      url = "https://apimunnyfinds.azurewebsites.net/api/subscriptiondata/"
    ) => {
      return {
        fetchAll: () => axios.get(url + "GetBySubsctionType/"+props.match.params["subscriptionTypeId"]),
        create: (newRecord) => axios.post(url + "insert", newRecord),
        update: (id, updateRecord) =>
          axios.put(url + "update/" + id, updateRecord),
        delete: (id) => axios.delete(url + "delete/" + id),
      };
    };
    const addOrEdit = (formData, onSuccess) => {
      if (formData.get("subscriptionDataId") === "0") {
        applicationAPI()
          .create(formData)
          .then((res) => {
            handleSuccess("New Subscription Added");
            resetForm();
            refreshBusinessTypeList();
          });
      } else {
        applicationAPI()
          .update(formData.get("subscriptionDataId"), formData)
          .then((res) => {
            handleSuccess("Subscription Details Updated");
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
            handleSuccess("Subscription Deleted Succesfully");
            refreshBusinessTypeList();
          })
          .catch((err) => handleError("Subscription Deleted Failed"));
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
                Dashboard <i className="fa fa-angle-right" /> Subscription Data
              </span>
              <div className="row mt-3">
                <div className="col-sm-12">
                  <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                    <h6 className="mb-3">Subscription Text Details</h6>
                    <div className="form-group row floating-label">
                      <div className="col-sm-4 col-12">
                        <input
                          className={"form-control" + applyErrorClass("subscriptionText")}
                          name="subscriptionText"
                          type="text"
                          value={values.subscriptionName}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="subscriptionText">Subscription Data</label>
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
                    <th>Subscription</th>
                    <th>Subscription Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {businessTypeList.map((bus) => (
                    <tr key={bus.subscriptionDataId}>
                      <td>{bus.subscriptionText}</td>
                      <td>{bus.subscriptionType.subscriptionName}</td>
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
                            onDelete(e, parseInt(bus.subscriptionDataId))
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
  