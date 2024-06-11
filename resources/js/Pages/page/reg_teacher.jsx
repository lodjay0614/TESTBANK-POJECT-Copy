import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

import Dropdown from "@/Components/Dropdown";
import { useEffect, useRef, useState } from "react";
import NavLink from "@/Components/NavLink";
import Details from "./Details";
export default function register_teacher({ auth }) {
    const [records, setRecords] = useState([]);
    useEffect(() => {
        const getTeacherdata = async () => {
            const reqdata = await fetch("http://127.0.0.1:8000/jsonTeacher");
            const resdata = await reqdata.json();
            // setUserdata(resdata);
            const array = Object.values(resdata);
            setRecords(array);
        };
        getTeacherdata();
    }, []);

    // pagination
    const [search, setQuizSearch] = useState("");
    const [currentPage, setCurentPage] = useState(1);
    const recordsPerPage = 7;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    // const record = records.slice(firstIndex, lastIndex);
    const npage = Math.ceil(records.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    function prePage() {
        if (currentPage !== 1) {
            setCurentPage(currentPage - 1);
        }
    }
    function changeCPage(id) {
        setCurentPage(id);
    }
    function nextPage() {
        if (currentPage !== npage) {
            setCurentPage(currentPage + 1);
        }
    }
    // end pagination

    const [openID, setOpenID] = useState();
    const [openExam, setExamOpen] = useState(false);
    const toggleExamOpen = (id, e) => {
        e.preventDefault();
        setExamOpen((previousState) => !previousState);
        setOpenID(id);
    };

    const [viewDetails, setViewDetails] = useState({});
    const ProfileDetails = async (id) => {
        const reqdata = await fetch(
            `http://127.0.0.1:8000/jsonTeacherProfile/${id}`
        );
        const resdata = await reqdata.json();
        setViewDetails(resdata);
    };

    const [isActive, setisActive] = useState({});
    useEffect(() => {
        const getStatus = async () => {
            const reqdata = await fetch("http://127.0.0.1:8000/jsonSession");
            const resdata = await reqdata.json();
            // setUserdata(resdata);
            const array = Object.values(resdata);
            setisActive(array);
        };
        getStatus();
    }, []);

    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (id) => {
        try {
            await axios.get(`./HandleTeacherDelete/${id}`);
            setSuccessMessage("Profile Deleted Successfully!");
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Register Teacher
                </h2>
            }
        >
            <Head title="Exam" />

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/boxicons/2.1.0/css/boxicons.min.css" integrity="sha512-pVCM5+SN2+qwj36KonHToF2p1oIvoU3bsqxphdOIWMYmgr4ZqD3t5DjKvvetKhXGc/ZG5REYTT6ltKfExEei/Q==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css" integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc=" crossOrigin="anonymous" />


                <div className="w-100 p-2 mt-2 flex justify-end">
                                            <div className="w-75 flex justify-end">
                                                <div className="px-12 w-50 flex justify-end">
                                                    <input
                                                        type="text"
                                                        placeholder="Search here..."
                                                        onChange={(e) =>
                                                            setQuizSearch(e.target.value)
                                                        }
                                                        className="searchhere"
                                                        style={{
                                                            padding: "10px",
                                                            borderRadius: "50px",
                                                            border: "1px solid #dee2e6",
                                                            width: "100%",
                                                                
                                                           
                                                        }}
                                                    />
                                                    <svg
                                                        style={{
                                                            display: "absolute",
                                                            transform: "translate(-40px, 12px)",
                                                        }}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        fill="currentColor"
                                                        className="bi bi-search opacity-50"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                <div className="container ">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <h5 className="card-title">Users List <span className="text-muted fw-normal ms-2">(834)</span></h5>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                                <div>
                                    <ul className="nav nav-pills">
                                        <li className="nav-item">
                                            <a
                                                aria-current="page"
                                                href="#"
                                                className="router-link-active router-link-exact-active nav-link active"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                title=""
                                                data-bs-original-title="List"
                                                aria-label="List"
                                            >
                                                <i className="bx bx-list-ul"></i>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Grid" aria-label="Grid"><i className="bx bx-grid-alt"></i></a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <a href={"./reg_form"}  className="btn btn-primary"><i className="bx bx-plus me-1"></i> Add New</a>
                                </div>
                                <div className="dropdown">
                                    <a className="btn btn-link text-muted py-1 font-size-16 shadow-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bx bx-dots-horizontal-rounded"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="">
                                <div className="table-responsive">
                                    <table className="table project-list-table table-nowrap align-middle table-borderless">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="ps-4" style={{width: "50px"}}>
                                                    <div className="form-check font-size-16"><input type="checkbox" className="form-check-input" id="contacusercheck" /><label className="form-check-label" for="contacusercheck"></label></div>
                                                </th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Position</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Projects</th>
                                                <th scope="col" style={{width: "200px"}}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>  
                                        {records &&
                                                    records
                                                        .filter((item) => {
                                                            return (
                                                                search.toLowerCase() === ""
                                                                    ? item
                                                                    : item.firstname
                                                                        .toLowerCase()
                                                                        .includes(search),
                                                                item.email
                                                                    .toLowerCase()
                                                                    .includes(search)
                                                            );
                                                        })
                                                        .map((data, index) => (        
                                            <tr key={index}>
                                                <th scope="row" className="ps-4">
                                                    <div className="form-check font-size-16"><input type="checkbox" className="form-check-input" id="contacusercheck9" /><label className="form-check-label" for="contacusercheck9"></label></div>
                                                </th>
                                                <td className="flex items-center"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="avatar-sm rounded-circle me-2" /><a href="#" className="text-body">{data.firstname}{data.lastname}</a></td>
                                                <td><span className="badge badge-soft-success mb-0">{data.role}</span></td>
                                                <td>{data.email}</td>
                                                <td>231</td>
                                                <td>
                                                    <ul className="list-inline mb-0">
                                                        <li className="list-inline-item">
                                                            <a data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" className="px-2 text-primary"><i className="bx bx-pencil font-size-18"></i></a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a onClick={() => handleSubmit(data.id)} data-bs-placement="top" title="Delete" className="px-2 text-danger cursor-pointer"><i className="bx bx-trash-alt font-size-18"></i></a>
                                                        </li>
                                                        <li className="list-inline-item dropdown">
                                                            <a className="text-muted dropdown-toggle font-size-18 px-2" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i className="bx bx-dots-vertical-rounded"></i></a>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <a className="dropdown-item"    
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#DetailsModal"
                                                                onClick={() =>
                                                                    ProfileDetails(
                                                                        data.id
                                                                    )}>Details</a>
                                                                <a className="dropdown-item" href="#">Another action</a>
                                                                <a className="dropdown-item" href="#">Something else here</a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-0 align-items-center pb-4">
                        <div className="col-sm-6">
                            <div><p className="mb-sm-0">Showing 1 to 10 of 57 entries</p></div>
                        </div>
                        <div className="col-sm-6">
                            <div className="float-sm-end">
                                <ul className="pagination mb-sm-0">
                                    <li className="page-item disabled">
                                        <a  onClick={prePage} className="page-link"><i className="mdi mdi-chevron-left"></i></a>
                                    </li>
                                    
                                    {numbers.map((n, i) => (
                                            <li
                                                className={`page-item ${
                                                    currentPage === n
                                                        ? "active"
                                                        : ""
                                                }`}
                                                key={i}
                                            >
                                                <a
                                                    href="#"
                                                    className="page-link"
                                                    onClick={() =>
                                                        changeCPage(n)
                                                    }
                                                >
                                                    {n}
                                                </a>
                                            </li>
                                        ))}
                                   
                                    <li className="page-item">
                                        <a onClick={nextPage} className="page-link"><i className="mdi mdi-chevron-right"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            {/* modal View Details */}
            <div
                className="modal fade pr-96"
                id="DetailsModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div
                        className="modal-content"
                        style={{
                            width: "100vh",
                            backgroundColor: "transparent",
                            border: "none",
                        }}
                    >
                        <div
                            className="modal-body"
                            style={{ backgroundColor: "transparent" }}
                        >
                            <Details data={viewDetails} key={viewDetails.id} />
                        </div>
                    </div>
                </div>
            </div>
            {/* end modal details */}
        </AuthenticatedLayout>
    );
}