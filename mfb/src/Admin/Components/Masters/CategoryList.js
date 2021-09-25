import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleSuccess, handleError } from "../../CustomAlerts";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import Footer from "../../Footer";
const defaultProductImage = "/assets/img/default-avatar.jpg";
const initialFieldValues = {
  categoryId: 0,
  categoryName: "",
  status: "true",
  createdDate: new Date().toLocaleString(),
  updatedDate: new Date().toLocaleString(),
  businessTypeId: 0,
  business: "",
  categoryurl: "",
  imageName: '',
  imageSrc: defaultProductImage,
  imageFile: null,
};
export default function CategoryList(props) {
  const [categoryList, setCategoryList] = useState([]);
  const [businessType, setBusinessType] = useState([]);
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
  const showPreview = e => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = x => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result
        })
      }
      reader.readAsDataURL(imageFile)
    }
    else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultProductImage
      })
    }
  }
  const validate = () => {
    let temp = {};
    temp.categoryName = values.categoryName === "" ? false : true;
    temp.status = values.status === "0" ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("categoryId", values.categoryId);
      formData.append("categoryName", values.categoryName);
      formData.append("createdDate", values.createdDate);
      formData.append("updatedDate", values.updatedDate);
      formData.append("businessTypeId", values.businessTypeId);
      formData.append("business", values.business);
      formData.append("status", values.status);
      formData.append("categoryurl", values.categoryurl);
      formData.append("imageName", values.imageName);
      formData.append('imageFile', values.imageFile);
      console.log(values);
      addOrEdit(formData, resetForm);
    }
  };
  const applicationAPI = (url = "https://localhost:44368/api/category/") => {
    console.log(1);
    return {
      fetchBusinessType: (id) =>
        axios.get("https://localhost:44368/api/businesstype/Get/"),
      fetchAll: () => axios.get(url + "get"),
      create: (newRecord) => axios.post(url + "insert", newRecord),
      update: (id, updateRecord) =>
        axios.put(url + "update/" + id, updateRecord),
      delete: (id) => axios.delete(url + "delete/" + id),
    };
  };
  const addOrEdit = (formData, onSuccess) => {
    if (formData.get("categoryId") === "0") {
      applicationAPI()
        .create(formData)
        .then((res) => {
          console.log(res);
          handleSuccess("New Category Added");
          resetForm();
          refreshCategoryList();
        });
    } else {
      applicationAPI()
        .update(formData.get("categoryId"), formData)
        .then((res) => {
          handleSuccess("Category Details Updated");
          resetForm();
          refreshCategoryList();
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
          handleSuccess("Category Deleted Succesfully");
          refreshCategoryList();
        })
        .catch((err) => handleError("Category Deleted Failed"));
  };
  const resetForm = () => {
    setValues(initialFieldValues);
    document.getElementById('image-uploader').value = null;
  };
  function refreshCategoryList() {
    applicationAPI()
      .fetchAll()
      .then((res) => setCategoryList(res.data))
      .catch((err) => console.log(err));
  }
  function refreshBusinessType() {
    applicationAPI()
      .fetchBusinessType()
      .then((res) => setBusinessType(res.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    refreshCategoryList();
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
            <span className="text-secondary">
              Dashboard <i className="fa fa-angle-right" /> Category List
            </span>
            <div className="row mt-3">
              <div className="col-sm-12">
                <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                  <h6 className="mb-3">Category Details</h6>
                  <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                  <div className="form-group row floating-label">
                    <div className="col-sm-4 col-12">
                      <select
                        name="businessTypeId"
                        type="text"
                        value={values.businessTypeId}
                        onChange={handleInputChange}
                        className="form-control"
                      >
                        <option value="0">Please Select</option>
                        {businessType.map((bus) => (
                          <option value={bus.businessTypeId}>
                            {bus.business}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="business">BusinessType</label>
                    </div>

                    <div className="col-sm-4 col-12">
                      <input
                        className={
                          "form-control" + applyErrorClass("categoryName")
                        }
                        name="categoryName"
                        type="text"
                        value={values.categoryName}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="categoryName">Category Name</label>
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
                  </div>
                  <div className="form-group row">
                    <div class="col-md-3">
                      <label>Select category Image</label>
                      <input id="image-uploader" className={"form-control-file" + applyErrorClass('imageSrc')} type="file" accept="image/*" onChange={showPreview} />
                    </div>
                    <div className="col-sm-3">
                      <div className="picture-container">
                        <div className="picture">
                          <img src={values.imageSrc} className="picture-src" width="200px" height="200px" />
                        </div>
                      </div>
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
                  </form>
                  <div className="table-responsive product-list">
                    <table
                      className="table table-bordered table-striped mt-3"
                      id="categoryList"
                    >
                      <thead>
                        <tr>
                          <th></th>
                          <th>Business Type</th>
                          <th>Category Name</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categoryList.map((category) => (
                          <tr key={category.categoryId}>
                            <img src={category.imageSrc} className="picture-src" width="60px" height="60px" />
                            <td>{category.businessType.business}</td>
                            <td>{category.categoryName}</td>
                            <td>{category.status ? "active" : "inactive"}</td>
                            <td>
                              <button
                                className="btn btn-success btn-sm mr-2"
                                onClick={() => {
                                  showEditDetails(category);
                                }}
                              >
                                <i className="fas fa-pencil-alt" />
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={(e) =>
                                  onDelete(e, parseInt(category.categoryId))
                                }
                              >
                                <i className="fas fa-trash-alt" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div></div>
              </div>
            </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
