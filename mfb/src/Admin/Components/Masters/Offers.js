import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleSuccess, handleError } from "../../CustomAlerts";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import Footer from "../../Footer";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
const defaultProductImage = "/assets/img/default-avatar.jpg";
const initialFieldValues = {
    offerId: 0,
    title: '',
    imageName: '',
    offerCode: '',
    startDate: new Date().toLocaleString(),
    endDate: new Date().toLocaleString(),
    imageSrc: defaultProductImage,
    imageFile: null,
    status: true,
    createdDate: new Date().toLocaleString(),
    updatedDate: new Date().toLocaleString()
};
export default function OffersList(props) {
    const [offersList, setOffersList] = useState([]);
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
        temp.title = values.title === "" ? false : true;
        temp.offerCode = values.offerCode === "" ? false : true;
        setErrors(temp);
        return Object.values(temp).every((x) => x === true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData();
            formData.append("offerId", values.offerId);
            formData.append("title", values.title);
            formData.append("imageName", values.imageName);
            formData.append('imageFile', values.imageFile)
            formData.append("offerCode", values.offerCode);
            formData.append("startDate", values.startDate);
            formData.append("endDate", values.endDate);
            formData.append("createdDate", values.createdDate)
            formData.append("updatedDate", values.updatedDate)
            formData.append("status", values.status)
            console.log(values);
            console.log(1);
            addOrEdit(formData, resetForm);
        }
    };
    const applicationAPI = (
        url = "https://munnyapi.azurewebsites.net/api/offers/"
    ) => {
        return {
            fetchAll: () => axios.get(url + "GetOffers"),
            create: (newRecord) => axios.post(url + "insert", newRecord),
            update: (id, updateRecord) => axios.put(url + "update/" + id, updateRecord),
            delete: (id) => axios.delete(url + "delete/" + id),
        };
    };
    const addOrEdit = (formData) => {
        if (formData.get("offerId") === "0") {
            applicationAPI()
                .create(formData)
                .then((res) => {
                    console.log(res)
                    handleSuccess("New Offer Added");
                    resetForm();
                    refreshOffersList();
                });
        } else {
            applicationAPI()
                .update(formData.get("offerId"), formData)
                .then((res) => {
                    handleSuccess("Offer Details Updated");
                    resetForm();
                    refreshOffersList();
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
                    handleSuccess("Offer Deleted Succesfully");
                    refreshOffersList();
                })
                .catch((err) => handleError("Offer Deleted Failed"));
    };
    const resetForm = () => {
        setValues(initialFieldValues);
        document.getElementById('image-uploader').value = null;
    };
    function refreshOffersList() {
        applicationAPI()
            .fetchAll()
            .then((res) => setOffersList(res.data))
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        refreshOffersList();
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
                            Dashboard <i className="fa fa-angle-right" /> Offers
                          </span>
                        <div className="row mt-3">
                            <div className="col-sm-12">
                                <div className="mt-4 mb-3 p-3 button-container bg-white border shadow-sm">
                                    <h6 className="mb-3">Offer Details</h6>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-6 col-12">
                                            <h6 className="mb-3">Offers Image</h6>
                                            <div className="form-group row">
                                                <div className="col-sm-12 col-12">
                                                    <div className="picture-container">
                                                        <div className="picture">
                                                            <img src={values.imageSrc} className="picture-src" width="200px" height="200px" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row floating-label">
                                                <div className="col-sm-12 col-12">
                                                    <input id="image-uploader" className={"form-control-file" + applyErrorClass('imageSrc')} type="file" accept="image/*" onChange={showPreview} />
                                                   
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-sm-6 col-12">
                                            <div className="form-group row floating-label">
                                                <div className="col-sm-12 col-12">
                                                    <input
                                                        className={"form-control" + applyErrorClass("title")}
                                                        name="title"
                                                        type="text"
                                                        value={values.title}
                                                        onChange={handleInputChange}
                                                    />
                                                    <label htmlFor="title">Title</label>
                                                </div>
                                            </div>
                                            <div className="form-group row floating-label">
                                                <div className="col-sm-12 col-12">
                                                    <input
                                                        className={"form-control" + applyErrorClass("offerCode")}
                                                        name="offerCode"
                                                        type="text"
                                                        value={values.offerCode}
                                                        onChange={handleInputChange}
                                                    />
                                                    <label htmlFor="offerCode">OfferCode</label>
                                                </div>
                                            </div>
                                            <div className="form-group row floating-label">
                                                <div className="col-sm-12 col-12">
                                                    <input
                                                        className={"form-control" + applyErrorClass("startDate")}
                                                        name="startDate"
                                                        type="date"
                                                        value={values.startDate}
                                                        onChange={handleInputChange}
                                                    />
                                                    <label htmlFor="startDate">StartDate</label>
                                                </div>
                                            </div>
                                            <div className="form-group row floating-label">
                                                <div className="col-sm-12 col-12">
                                                    <input
                                                        className={"form-control" + applyErrorClass("endDate")}
                                                        name="endDate"
                                                        type="date"
                                                        value={values.endDate}
                                                        onChange={handleInputChange}
                                                    />
                                                    <label htmlFor="endDate">EndDate</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row floating-label">
                                        <div className="col-sm-4">
                                            <button type="submit" className="btn btn-primary mr-3">
                                                Submit
                                                 </button> <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={resetForm} > Cancel
                                                </button>
                                        </div>
                                    </div>

                                    <div className="table-responsive product-list">
                        <table
                            className="table table-bordered table-striped mt-3"
                            id="offersList"
                        >
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Offer Code</th>
                                    <th>StartDate</th>
                                    <th>EndDate</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {offersList.map((off) => (
                                    <tr key={off.offerId}>
                                        <td>{off.title}</td>
                                        <td>{off.offerCode}</td>
                                        <td>{moment(off.startDate).format('Do MMMM yyyy')} </td>
                                        <td>{moment(off.endDate).format('Do MMMM yyyy')} </td>
                                        <td>

                                            <button
                                                className="btn btn-success btn-sm mr-2"
                                                onClick={() => {
                                                    showEditDetails(off);
                                                }}
                                            >
                                                <i className="fas fa-pencil-alt" />
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={(e) =>
                                                    onDelete(e, parseInt(off.offerId))
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




