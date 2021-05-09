import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleSuccess, handleError } from "../../CustomAlerts";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import Footer from "../../Footer";
const initialFieldValues = {
  faqId: 0,
  subjectId: "",
  subjetName: "",
  question: "",
  answer: ""
};
export default function Fqa(props) {
  const [faqList, setfaqList] = useState([]);
  const [faqType, setFaqType] = useState([]);
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
    temp.question = values.question === "" ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("faqId", values.faqId);
      formData.append("subjectId", values.subjectId);
      formData.append("subjetName", values.subjetName);
      formData.append("question", values.question);
      formData.append("answer", values.answer);
      console.log(values);
      addOrEdit(formData, resetForm);
    }
  };
  const applicationAPI = (
    url = "https://munnyapi.azurewebsites.net/api/faq/"
  ) => {
    return {
      fetchSubjectName: (id) =>
        axios.get("https://munnyapi.azurewebsites.net/api/subject/get/"),
      fetchAll: () => axios.get(url + "get"),
      create: (newRecord) => axios.post(url + "insert", newRecord),
      update: (id, updateRecord) =>
        axios.put(url + "update/" + id, updateRecord),
      delete: (id) => axios.delete(url + "delete/" + id),
    };
  };
  const addOrEdit = (formData, onSuccess) => {
    if (formData.get("faqId") === "0") {
      applicationAPI()
        .create(formData)
        .then((res) => {
          handleSuccess("FAQ Added");
          resetForm();
          refreshFaqList();
        });
    } else {
      applicationAPI()
        .update(formData.get("faqId"), formData)
        .then((res) => {
          handleSuccess("FAQ Updated");
          resetForm();
          refreshFaqList();
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
          handleSuccess("FAQ Deleted Succesfully");
          refreshFaqList();
        })
        .catch((err) => handleError("FAQ Deleted Failed"));
  };
  const resetForm = () => {
    setValues(initialFieldValues);
  };
  function refreshFaqList() {
    applicationAPI()
      .fetchAll()
      .then((res) => setfaqList(res.data))
      .catch((err) => console.log(err));
  }
  function refreshFaqType() {
    applicationAPI()
      .fetchSubjectName()
      .then((res) => setFaqType(res.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    refreshFaqList();
    refreshFaqType();

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
              Dashboard <i className="fa fa-angle-right" /> FAQ
            </span>
            <div className="row mt-3">
              <div className="col-sm-12">
                <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                  <h6 className="mb-3">FAQ</h6>
                  <div className="form-group row floating-label">
                    <div className="col-sm-4 col-12">
                      <select
                        name="subjectId"
                        type="text"
                        value={values.subjectId}
                        onChange={handleInputChange}
                        className="form-control"
                      >
                        <option value="0">Please Select</option>
                        {faqType.map((bus) => (
                          <option value={bus.subjectId}>
                            {bus.subjectName}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="subjectName">Subject</label>
                    </div>
                  </div>
                  <div className="form-group row floating-label">
                    <div className="col-sm-12 col-12">
                      <input
                        className={"form-control" + applyErrorClass("question")}
                        name="question"
                        type="text"
                        value={values.question}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="question">Question</label>
                    </div>
                  </div>
                  <div className="form-group row floating-label">
                    <div className="col-sm-12 col-12">
                      <input
                        className={"form-control" + applyErrorClass("answer")}
                        name="answer"
                        type="text"
                        value={values.answer}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="answer">Answer</label>
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
              id="faqList"
            >
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {faqList.map((f) => (
                  <tr key={f.faqId}>
                    <td>{f.subject.subjectName}</td>
                    <td>{f.question}</td>
                    <td>{f.answer}</td>

                    <td>
                      <button
                        className="btn btn-success btn-sm mr-2"
                        onClick={() => {
                          showEditDetails(f);
                        }}
                      >
                        <i className="fas fa-pencil-alt" />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={(e) =>
                          onDelete(e, parseInt(f.faqId))
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