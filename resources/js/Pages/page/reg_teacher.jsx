import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

import Dropdown from "@/Components/Dropdown";
import { useEffect, useRef, useState } from "react";
import NavLink from "@/Components/NavLink";
import Details from "./Details";
export default function register_teacher({ auth }) {
    const [records, setRecords] = useState();
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

    const [search, setQuizSearch] = useState("");
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

            <div className="py-12">
                {successMessage && (
                    <div className=" bg-blue-500 px-96 py-6 mb-8">
                        {successMessage}
                    </div>
                )}

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-12 bg-white dark:bg-gray-800 overflow-hidden rounded-md shadow-sm flex flex-column">
                        <div className="w-100 p-2 flex justify-end">
                            <div className="w-75 flex justify-end">
                                <div className="w-50 flex justify-end">
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
                                            backgroundColor: "#f3f4f6",
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
                        <div className="py-2">
                            <NavLink
                                href={"./reg_form"}
                                className="inline-flex items-center px-4 py-2 pt-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-person-plus-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                    <path
                                        fill-rule="evenodd"
                                        d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
                                    />
                                </svg>
                            </NavLink>
                        </div>
                        <table className="table table-hover max-w-7xl mx-auto">
                            <thead className="table-dark">
                                <tr>
                                    <th>Teacher Number</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {records &&
                                    records
                                        .filter((item) => {
                                            return (
                                                search.toLowerCase() === ""
                                                    ? item
                                                    : item.name
                                                          .toLowerCase()
                                                          .includes(search),
                                                item.email
                                                    .toLowerCase()
                                                    .includes(search)
                                            );
                                        })
                                        .map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.IDnumber}</td>
                                                <td>{data.name}</td>
                                                <td>{data.email}</td>
                                                <td>
                                                    {" "}
                                                    <span className="badge badge-soft-success p-2 team-status">
                                                        Active
                                                    </span>
                                                </td>
                                                <td>
                                                    <a
                                                        className="bg-transparent flex justify-end pr-2 cursor-pointer"
                                                        onClick={(e) =>
                                                            toggleExamOpen(
                                                                data.id,
                                                                e
                                                            )
                                                        }
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="20"
                                                            height="20"
                                                            fill="black"
                                                            className="bi bi-three-dots"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                                        </svg>
                                                    </a>
                                                    {openID === data.id &&
                                                        openExam && (
                                                            <div
                                                                onClick={() =>
                                                                    setExamOpen(
                                                                        false
                                                                    )
                                                                }
                                                                className="absolute rounded-md shadow-sm bg-white py-2"
                                                            >
                                                                <ul>
                                                                    <Dropdown.Link
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#DetailsModal"
                                                                        onClick={() =>
                                                                            ProfileDetails(
                                                                                data.id
                                                                            )
                                                                        }
                                                                    >
                                                                        View
                                                                    </Dropdown.Link>
                                                                    <Dropdown.Link
                                                                        href={route(
                                                                            "exampage"
                                                                        )}
                                                                    >
                                                                        Edit
                                                                    </Dropdown.Link>
                                                                    <Dropdown.Link
                                                                        onClick={() =>
                                                                            handleSubmit(
                                                                                data.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </Dropdown.Link>
                                                                </ul>
                                                            </div>
                                                        )}
                                                </td>
                                            </tr>
                                        ))}
                            </tbody>
                        </table>
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