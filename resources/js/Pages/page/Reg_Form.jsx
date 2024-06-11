import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function register_student({ auth }) {
    const [courseRecords, setcourseRecords] = useState([]);
    useEffect(() => {
        const getCoursedata = async () => {
            const reqdata = await fetch("http://127.0.0.1:8000/jsoncourse");
            const resdata = await reqdata.json();
            // setUserdata(resdata);
            setcourseRecords(resdata);
        };
        getCoursedata();
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        role: "Teacher",
        IDnumber: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password_confirmation: "",
        course: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = () => {
      
        post(route("register"));
    };
    // const [selectedOptions, setSelectedOptions] = useState([]);

    // const handleSelectChange = (e) => {
    //     const selectedValues = Array.from(
    //         e.target.selectedOptions,
    //         (option) => option.value
    //     );
    //     setSelectedOptions(selectedValues);
    //     setData("course", selectedValues);
    // };
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionClick = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(
                selectedOptions.filter((item) => item !== option)
            );
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };
    useEffect(() => {
        setData("course", selectedOptions);
    }, [selectedOptions]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight w-100 inline-flex">
                    Register Teacher{" "}
                    <span className="flex justify-center items-center px-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-chevron-right"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                            />
                        </svg>
                    </span>
                    <h2 className="opacity-50 underline">Form</h2>
                </h2>
            }
        >
            <Head title="Exam" />
<form onSubmit={submit}>
<div className="container-fluid">

<div className="container">
 
  <div className="d-flex justify-content-between align-items-lg-center py-3 flex-column flex-lg-row">
    <h2 className="h5 mb-3 mb-lg-0"><a href="../../pages/admin/customers.html" className="text-muted"><i className="bi bi-arrow-left-square me-2"></i></a> Create new account</h2>
    <div className="hstack gap-3">
      <button className="btn btn-light btn-sm btn-icon-text"><i className="bi bi-x"></i> <span className="text">Cancel</span></button>
      <button type="submit" disabled={processing} className="btn btn-primary btn-sm btn-icon-text"><i className="bi bi-save"></i> <span className="text">Save</span></button>
    </div>
  </div>


  <div className="row">

    <div className="col-lg-8">

      <div className="card mb-4">
        <div className="card-body">
          <h3 className="h6 mb-4">Basic information</h3>
          <div className="row">
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">First name</label>
                   <TextInput
                                        id="firstname"
                                        name="firstname"
                                        value={data.firstname}
                                        className="mt-1 block w-full"
                                        autoComplete="firstname"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("firstname", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.firstname}
                                        className="mt-2"
                                    />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Last name</label>
                   <TextInput
                                        id="lastname"
                                        name="lastname"
                                        value={data.lastname}
                                        className="mt-1 block w-full"
                                        autoComplete="lastname"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("lastname", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.lastname}
                                        className="mt-2"
                                    />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Email</label>
                  <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">ID number</label>
                  <TextInput
                                        type="number"
                                        id="IDnumber"
                                        name="IDnumber"
                                        value={data.IDnumber}
                                        className="mt-1 block w-full"
                                        autoComplete="IDnumber"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("IDnumber", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.IDno}
                                        className="mt-2"
                                    />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h3 className="h6 mb-4">Security</h3>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
          </div>
          
       
        </div>
      </div>
    </div>

    <div className="col-lg-4">

      <div className="card mb-4">
        <div className="card-body">
          <h3 className="h6">Course</h3>
                            <TextInput
                                        data-bs-toggle="modal"
                                        data-bs-target="#CourseModal"
                                        id="course"
                                        type="text"
                                        name="course"
                                        value={selectedOptions.join(", ")}
                                        className="mt-1 block w-full shadow-none cursor-pointer"
                                    />
                                       <a
                                        className="absolute opacity-50"
                                        style={{
                                            transform:
                                                "translate(320px, -30px)",
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            class="bi bi-chevron-down"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                                            />
                                        </svg>
                                    </a>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h3 className="h6">Avatar</h3>
          <input className="form-control" type="file"/>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h3 className="h6">Notes</h3>
          <textarea className="form-control" rows="3"></textarea>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h3 className="h6">Notification Settings</h3>
          <ul className="list-group list-group-flush mx-n2">
            <li className="list-group-item px-0 d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <h6 className="mb-0">News and updates</h6>
                <small>News about product and feature updates.</small>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch"/>
              </div>
            </li>
            <li className="list-group-item px-0 d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <h6 className="mb-0">Tips and tutorials</h6>
                <small>Tips on getting more out of the platform.</small>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" defaultChecked/>
              </div>
            </li>
            <li className="list-group-item px-0 d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <h6 className="mb-0">User Research</h6>
                <small>Get involved in our beta testing program.</small>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

  </div>
           
                              
                </form>    




            {/* modal Courses */}
                <div
                                    className="modal fade"
                                    id="CourseModal"
                                    tabIndex="-1"
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                >
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5
                                                    className="modal-title"
                                                    id="exampleModalLabel"
                                                >
                                                    List of Courses
                                                </h5>
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                ></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="pt-2">
                                                    {courseRecords.map(
                                                        (course, index) => (
                                                            <div
                                                                className="row"
                                                                key={index}
                                                            >
                                                                <div className="col-xl-12">
                                                                    <div
                                                                        className="task-list-box"
                                                                        id="landing-task"
                                                                    >
                                                                        <div id="task-item-1">
                                                                            <div className="card task-box rounded-3">
                                                                                <div className="card-body">
                                                                                    <div className="row align-items-center">
                                                                                        <div className="col-xl-6 col-sm-5">
                                                                                            <div className="checklist form-check font-size-15">
                                                                                                <input
                                                                                                    name="course"
                                                                                                    type="checkbox"
                                                                                                    className="form-check-input"
                                                                                                    id={`${course.course_code}`}
                                                                                                    checked={selectedOptions.includes(
                                                                                                        course.course_code
                                                                                                    )}
                                                                                                    onClick={() =>
                                                                                                        handleOptionClick(
                                                                                                            course.course_code
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                                <label
                                                                                                    className="form-check-label ms-1 task-title"
                                                                                                    htmlFor={`${course.course_code}`}
                                                                                                >
                                                                                                    {
                                                                                                        course.course_code
                                                                                                    }
                                                                                                </label>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                </div>
            {/* end modal Course */}
        </AuthenticatedLayout>
    );
}