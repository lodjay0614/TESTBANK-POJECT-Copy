import React from "react";
import { useState, useEffect } from "react";

export default function Details({ data }) {
    const [Courserecords, setCourseRecords] = useState([]);
    useEffect(() => {
        const getQuizdata = async () => {
            const reqdata = await fetch(
                `http://127.0.0.1:8000/jsonHandledCourses/${data.id}`
            );
            const resdata = await reqdata.json();
            setCourseRecords(resdata);
        };
        getQuizdata();
    }, []);

    const [Questionrecords, setQuestionRecords] = useState([]);
    useEffect(() => {
        const getQuizdata = async () => {
            const reqdata = await fetch(
                `http://127.0.0.1:8000/pending_question/${data.id}`
            );
            const resdata = await reqdata.json();
            const array = Object.values(resdata);
            setQuestionRecords(array);
        };
        getQuizdata();
    }, []);
    return (
        <div className="container">
            <div className="row py-4">
                <div className="col-xl-auto">
                    <div className="card" style={{backgroundColor: "rgb(153 27 27)"}}>
                        <div className="card-body pb-0">
                            <div className="row align-items-center">
                                <div className="col-md-3">
                                    <div className="text-center border-end flex flex-column items-center">
                                        <img
                                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                            className="img-fluid avatar-xxl rounded-circle"
                                            alt=""
                                        />
                                        <h4 className="text-primary font-size-20 mt-3 mb-2">
                                            {data.name}
                                        </h4>
                                        <h5 className="text-white font-size-13 mb-0">
                                            ID#: {data.IDnumber}
                                        </h5>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="ms-3">
                                        <div>
                                            <h4 className="card-title mb-2 font-light text-xl text-white">
                                                {data.role}
                                            </h4>
                                            <p className="mb-0 text-white">
                                                Hi I'm {data.firstname},has been the
                                                industry's standard dummy text
                                                To an English person alteration
                                                text.
                                            </p>
                                        </div>
                                        <div className="row my-4">
                                            <div className="col-md-12">
                                                <div>
                                                    <p className="text-white mb-2 fw-medium">
                                                        <i className="mdi mdi-email-outline me-2"></i>
                                                        {data.email}
                                                    </p>
                                                    <p className="text-muted fw-medium mb-0">
                                                        {/* <i className="mdi mdi-phone-in-talk-outline me-2"></i>
                                                        418-955-4703 */}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <ul
                                            className="nav nav-tabs nav-tabs-custom border-bottom-0 mt-3 nav-justfied"
                                            role="tablist"
                                        >
                                            <li
                                                className="nav-item"
                                                role="presentation"
                                            >
                                                <a
                                                    className="nav-link px-4 active"
                                                    data-bs-toggle="tab"
                                                    href="#course-tab"
                                                    role="tab"
                                                    aria-selected="false"
                                                    tabIndex="-1"
                                                >
                                                    <span className="d-block d-sm-none">
                                                        <i className="fas fa-home"></i>
                                                    </span>
                                                    <span className="d-none d-sm-block">
                                                        Handled Courses
                                                    </span>
                                                </a>
                                            </li>
                                            <li
                                                className="nav-item"
                                                role="presentation"
                                            >
                                                <a
                                                    className="nav-link px-4"
                                                    data-bs-toggle="tab"
                                                    href="#task-tab"
                                                    role="tab"
                                                    aria-selected="false"
                                                    tabIndex="-1"
                                                >
                                                    <span className="d-block d-sm-none">
                                                        <i className="mdi mdi-menu-open"></i>
                                                    </span>
                                                    <span className="d-none d-sm-block">
                                                        Tasks
                                                    </span>
                                                </a>
                                            </li>
                                            <li
                                                className="nav-item"
                                                role="presentation"
                                            >
                                                <a
                                                    className="nav-link px-4 "
                                                    data-bs-toggle="tab"
                                                    href="#team-tab"
                                                    role="tab"
                                                    aria-selected="false"
                                                    tabIndex="-1"
                                                >
                                                    <span className="d-block d-sm-none">
                                                        <i className="mdi mdi-account-group-outline"></i>
                                                    </span>
                                                    <span className="d-none d-sm-block">
                                                        Team
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{backgroundColor: "rgb(185 28 28)"}}>
                        <div className="tab-content p-4">
                            {/* course window */}

                            <div
                                className="tab-pane active show"
                                id="course-tab"
                                role="tabpanel"
                            >
                                <h4 className="card-title text-white mb-4">My Courses</h4>

                                <div class="task-list-box" id="design-task">
                                    <div id="task-item-2" className="flex">
                                        {Courserecords &&
                                            Courserecords.map(
                                                (course, index) => (
                                                    <div
                                                        class="card ml-2 mb-2 w-50 task-box rounded-3"
                                                        key={index}
                                                    >
                                                        <div class="card-body flex">
                                                            <div class="row align-items-center">
                                                                <div class="col-xl-6 col-sm-5 flex">
                                                                    <div class="checklist form-check font-size-15">
                                                                        <input
                                                                            type="checkbox"
                                                                            class="form-check-input"
                                                                            id="customCheck2"
                                                                            checked
                                                                        />
                                                                        <label
                                                                            class="form-check-label ms-1 task-title"
                                                                            for="customCheck2"
                                                                        >
                                                                            {
                                                                                course.course_code
                                                                            }
                                                                        </label>
                                                                    </div>
                                                                    <div className="list-inline-item dropdown ml-24">
                                                                        <a className="text-muted dropdown-toggle font-size-18 px-2" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i className="bx bx-dots-vertical-rounded"></i></a>
                                                                        <div className="dropdown-menu dropdown-menu-end">
                                                                            <a className="dropdown-item"    
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#DetailsModal"
                                                                           >delete</a>
                                                                            <a className="dropdown-item" href="#">Another action</a>
                                                                            <a className="dropdown-item" href="#">Something else here</a>
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

                            {/* end courses window */}
                            {/* task window */}
                            <div
                                className="tab-pane"
                                id="task-tab"
                                role="tabpanel"
                            >
                                <div className="d-flex align-items-center">
                                    <div className="flex-1">
                                        <h4 className="card-title mb-4 text-white">
                                            My Task
                                        </h4>
                                    </div>
                                </div>

                                <div className="row" id="all-projects">
                                    {Questionrecords &&
                                        Questionrecords.map(
                                            (data, index) =>
                                                data.Qstatus == "Pending" && (
                                                    <div
                                                        className="col-md-6 w-full"
                                                        id="project-items-3"
                                                    >
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className="d-flex mb-3">
                                                                    <div className="flex-grow-1 align-items-start">
                                                                        <div>
                                                                            <h6 className="mb-0 text-muted">
                                                                                <i className="mdi mdi-circle-medium text-warning fs-3 align-middle"></i>
                                                                                <span className="team-date">
                                                                                    08
                                                                                    Sep,
                                                                                    2021
                                                                                </span>
                                                                            </h6>
                                                                        </div>
                                                                    </div>
                                                                    <div className="dropdown ms-2">
                                                                        <a
                                                                            href="#"
                                                                            className="dropdown-toggle font-size-16 text-muted"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-haspopup="true"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <i className="mdi mdi-dots-horizontal"></i>
                                                                        </a>

                                                                        <div className="dropdown-menu dropdown-menu-end">
                                                                            <a
                                                                                className="dropdown-item flex"
                                                                                href=""
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target=".bs-example-new-project"
                                                                            >
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="16"
                                                                                    height="16"
                                                                                    fill="lightblue"
                                                                                    className="bi bi-check-lg mt-1 mr-2"
                                                                                    viewBox="0 0 16 16"
                                                                                >
                                                                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                                                                                </svg>
                                                                                Approved
                                                                            </a>
                                                                            <a
                                                                                className="dropdown-item flex"
                                                                                href=""
                                                                            >
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="16"
                                                                                    height="16"
                                                                                    fill="red"
                                                                                    className="bi bi-x mt-1 mr-2"
                                                                                    viewBox="0 0 16 16"
                                                                                >
                                                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                                                                </svg>
                                                                                Denied
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    className="mb-4"
                                                                    key={index}
                                                                >
                                                                    <h5 className="mb-1 font-size-17 team-title">
                                                                        {
                                                                            data.difficulty
                                                                        }
                                                                    </h5>
                                                                    <p className="text-muted mb-0 team-description">
                                                                        {
                                                                            data.Question
                                                                        }
                                                                    </p>
                                                                </div>

                                                                <div className="d-flex justify-end items-end">
                                                                    <div className="align-self-end">
                                                                        <span className="badge badge-soft-warning p-2 team-status">
                                                                            Pending
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                        )}
                                </div>
                            </div>
                            {/* end task window */}
                            {/* team window */}
                            <div
                                className="tab-pane"
                                id="team-tab"
                                role="tabpanel"
                            >
                                <div className="d-flex align-items-center">
                                    <div className="flex-1">
                                        <h4 className="card-title mb-4">
                                            Team
                                        </h4>
                                    </div>
                                </div>

                                <div className="row" id="all-projects">
                                    <div
                                        className="col-md-6"
                                        id="project-items-1"
                                    >
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex mb-3">
                                                    <div className="flex-grow-1 align-items-start">
                                                        <div>
                                                            <h6 className="mb-0 text-muted">
                                                                <i className="mdi mdi-circle-medium text-danger fs-3 align-middle"></i>
                                                                <span className="team-date">
                                                                    21 Jun, 2021
                                                                </span>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <div className="dropdown ms-2">
                                                        <a
                                                            href="#"
                                                            className="dropdown-toggle font-size-16 text-muted"
                                                            data-bs-toggle="dropdown"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                        >
                                                            <i className="mdi mdi-dots-horizontal"></i>
                                                        </a>

                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a
                                                                className="dropdown-item"
                                                                href=""
                                                                data-bs-toggle="modal"
                                                                data-bs-target=".bs-example-new-project"
                                                            >
                                                                Edit
                                                            </a>
                                                            <a
                                                                className="dropdown-item"
                                                                href=""
                                                            >
                                                                Share
                                                            </a>
                                                            <div className="dropdown-divider"></div>
                                                            <a
                                                                className="dropdown-item delete-item"
                                                                data-id="project-items-1"
                                                                href=""
                                                            >
                                                                Delete
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <h5 className="mb-1 font-size-17 team-title">
                                                        Marketing
                                                    </h5>
                                                    <p className="text-muted mb-0 team-description">
                                                        Every Marketing Plan
                                                        Needs
                                                    </p>
                                                </div>
                                                <div className="d-flex">
                                                    <div className="avatar-group float-start flex-grow-1 task-assigne">
                                                        <div className="avatar-group-item">
                                                            <a
                                                                href=""
                                                                className="d-inline-block"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                value="member-6"
                                                                aria-label="Terrell Soto"
                                                                data-bs-original-title="Terrell Soto"
                                                            >
                                                                <img
                                                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                                    alt=""
                                                                    className="rounded-circle avatar-sm"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="avatar-group-item">
                                                            <a
                                                                href=""
                                                                className="d-inline-block"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                value="member-1"
                                                                aria-label="Ruhi Shah"
                                                                data-bs-original-title="Ruhi Shah"
                                                            >
                                                                <img
                                                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                                    alt=""
                                                                    className="rounded-circle avatar-sm"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="avatar-group-item">
                                                            <a
                                                                href=""
                                                                className="d-block"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                value="member-15"
                                                                data-bs-original-title="Denny Silva"
                                                            >
                                                                <div className="avatar-sm">
                                                                    <div className="avatar-title rounded-circle bg-primary">
                                                                        D
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="align-self-end">
                                                        <span className="badge badge-soft-danger p-2 team-status">
                                                            Pending
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="col-md-6"
                                        id="project-items-2"
                                    >
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex mb-3">
                                                    <div className="flex-grow-1 align-items-start">
                                                        <div>
                                                            <h6 className="mb-0 text-muted">
                                                                <i className="mdi mdi-circle-medium text-success fs-3 align-middle"></i>
                                                                <span className="team-date">
                                                                    13 Aug, 2021
                                                                </span>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <div className="dropdown ms-2">
                                                        <a
                                                            href="#"
                                                            className="dropdown-toggle font-size-16 text-muted"
                                                            data-bs-toggle="dropdown"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                        >
                                                            <i className="mdi mdi-dots-horizontal"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a
                                                                className="dropdown-item"
                                                                href=""
                                                                data-bs-toggle="modal"
                                                                data-bs-target=".bs-example-new-project"
                                                            >
                                                                Edit
                                                            </a>
                                                            <a
                                                                className="dropdown-item"
                                                                href=""
                                                            >
                                                                Share
                                                            </a>
                                                            <div className="dropdown-divider"></div>
                                                            <a
                                                                className="dropdown-item delete-item"
                                                                href=""
                                                                data-id="project-items-2"
                                                            >
                                                                Delete
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <h5 className="mb-1 font-size-17 team-title">
                                                        Website Design
                                                    </h5>
                                                    <p className="text-muted mb-0 team-description">
                                                        Creating the design and
                                                        layout of a website.
                                                    </p>
                                                </div>
                                                <div className="d-flex">
                                                    <div className="avatar-group float-start flex-grow-1 task-assigne">
                                                        <div className="avatar-group-item">
                                                            <a
                                                                href=""
                                                                className="d-inline-block"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                value="member-10"
                                                                aria-label="Kelly Osborn"
                                                                data-bs-original-title="Kelly Osborn"
                                                            >
                                                                <img
                                                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                                    alt=""
                                                                    className="rounded-circle avatar-sm"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="avatar-group-item">
                                                            <a
                                                                href=""
                                                                className="d-inline-block"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                value="member-2"
                                                                aria-label="John Page"
                                                                data-bs-original-title="John Page"
                                                            >
                                                                <img
                                                                    src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                                                    alt=""
                                                                    className="rounded-circle avatar-sm"
                                                                />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="align-self-end">
                                                        <span className="badge badge-soft-success p-2 team-status">
                                                            Completed
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="col-md-6"
                                        id="project-items-3"
                                    >
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex mb-3">
                                                    <div className="flex-grow-1 align-items-start">
                                                        <div>
                                                            <h6 className="mb-0 text-muted">
                                                                <i className="mdi mdi-circle-medium text-warning fs-3 align-middle"></i>
                                                                <span className="team-date">
                                                                    08 Sep, 2021
                                                                </span>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <div className="dropdown ms-2">
                                                        <a
                                                            href="#"
                                                            className="dropdown-toggle font-size-16 text-muted"
                                                            data-bs-toggle="dropdown"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                        >
                                                            <i className="mdi mdi-dots-horizontal"></i>
                                                        </a>

                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a
                                                                className="dropdown-item"
                                                                href=""
                                                                data-bs-toggle="modal"
                                                                data-bs-target=".bs-example-new-project"
                                                            >
                                                                Edit
                                                            </a>
                                                            <a
                                                                className="dropdown-item"
                                                                href=""
                                                            >
                                                                Share
                                                            </a>
                                                            <div className="dropdown-divider"></div>
                                                            <a
                                                                className="dropdown-item delete-item"
                                                                href=""
                                                                data-id="project-items-3"
                                                            >
                                                                Delete
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <h5 className="mb-1 font-size-17 team-title">
                                                        UI / UX Design
                                                    </h5>
                                                    <p className="text-muted mb-0 team-description">
                                                        Plan and onduct user
                                                        research and analysis
                                                    </p>
                                                </div>
                                                <div className="d-flex">
                                                    <div className="avatar-group float-start flex-grow-1 task-assigne">
                                                        <div className="avatar-group-item">
                                                            <a
                                                                href=""
                                                                className="d-inline-block"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                value="member-3"
                                                                aria-label="Judy Newland"
                                                                data-bs-original-title="Judy Newland"
                                                            >
                                                                <img
                                                                    src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                                                    alt=""
                                                                    className="rounded-circle avatar-sm"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="avatar-group-item">
                                                            <a
                                                                href=""
                                                                className="d-inline-block"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                value="member-5"
                                                                aria-label="Jeffery Legette"
                                                                data-bs-original-title="Jeffery Legette"
                                                            >
                                                                <img
                                                                    src="https://bootdey.com/img/Content/avatar/avatar5.png"
                                                                    alt=""
                                                                    className="rounded-circle avatar-sm"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="avatar-group-item">
                                                            <a
                                                                href=""
                                                                className="d-inline-block"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                value="member-6"
                                                                aria-label="Jose Rosborough"
                                                                data-bs-original-title="Jose Rosborough"
                                                            >
                                                                <img
                                                                    src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                                                    alt=""
                                                                    className="rounded-circle avatar-sm"
                                                                />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="align-self-end">
                                                        <span className="badge badge-soft-warning p-2 team-status">
                                                            Progress
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="col-md-6"
                                        id="project-items-4"
                                    >
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex mb-3">
                                                    <div className="flex-grow-1 align-items-start">
                                                        <div>
                                                            <h6 className="mb-0 text-muted">
                                                                <i className="mdi mdi-circle-medium text-danger fs-3 align-middle"></i>
                                                                <span className="team-date">
                                                                    20 Sep, 2021
                                                                </span>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <div className="dropdown ms-2">
                                                        <a
                                                            href="#"
                                                            className="dropdown-toggle font-size-16 text-muted"
                                                            data-bs-toggle="dropdown"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                        >
                                                            <i className="mdi mdi-dots-horizontal"></i>
                                                        </a>

                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a
                                                                className="dropdown-item"
                                                                href=""
                                                                data-bs-toggle="modal"
                                                                data-bs-target=".bs-example-new-project"
                                                            >
                                                                Edit
                                                            </a>
                                                            <a
                                                                className="dropdown-item"
                                                                href=""
                                                            >
                                                                Share
                                                            </a>
                                                            <div className="dropdown-divider"></div>
                                                            <a
                                                                className="dropdown-item delete-item"
                                                                href=""
                                                                data-id="project-items-4"
                                                            >
                                                                Delete
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <h5 className="mb-1 font-size-17 team-title">
                                                        Testing
                                                    </h5>
                                                    <p className="text-muted mb-0 team-description">
                                                        The procurement
                                                        specifications should
                                                        describe
                                                    </p>
                                                </div>
                                                <div className="d-flex">
                                                    <div className="avatar-group float-start flex-grow-1 task-assigne">
                                                        <div className="avatar-group-item">
                                                            <a
                                                                href=""
                                                                className="d-inline-block"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                value="member-10"
                                                                aria-label="Jansh Wells"
                                                                data-bs-original-title="Jansh Wells"
                                                            >
                                                                <img
                                                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                                    alt=""
                                                                    className="rounded-circle avatar-sm"
                                                                />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="align-self-end">
                                                        <span className="badge badge-soft-danger p-2 team-status">
                                                            Pending
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="col-md-6"
                                        id="project-items-5"
                                    >
                                        <div className="card mb-lg-0">
                                            <div className="card-body">
                                                <div className="d-flex mb-3">
                                                    <div className="flex-grow-1 align-items-start">
                                                        <div>
                                                            <h6 className="mb-0 text-muted">
                                                                <i className="mdi mdi-circle-medium text-success fs-3 align-middle"></i>
                                                                <span className="team-date">
                                                                    12 April,
                                                                    2021
                                                                </span>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <div className="dropdown ms-2">
                                                        <a
                                                            href="#"
                                                            className="dropdown-toggle font-size-16 text-muted"
                                                            data-bs-toggle="dropdown"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                        >
                                                            <i className="mdi mdi-dots-horizontal"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a
                                                                className="dropdown-item"
                                                                href=""
                                                                data-bs-toggle="modal"
                                                                data-bs-target=".bs-example-new-project"
                                                            >
                                                                Edit
                                                            </a>
                                                            <a
                                                                className="dropdown-item"
                                                                href=""
                                                            >
                                                                Share
                                                            </a>
                                                            <div className="dropdown-divider"></div>
                                                            <a
                                                                className="dropdown-item delete-item"
                                                                data-id="project-items-5"
                                                                href=""
                                                            >
                                                                Delete
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <h5 className="mb-1 font-size-17 team-title">
                                                        Typography
                                                    </h5>
                                                    <p className="text-muted mb-0 team-description">
                                                        Typography is the style
                                                        or appearance of text.
                                                    </p>
                                                </div>
                                                <div className="d-flex">
                                                    <div className="avatar-group float-start flex-grow-1 task-assigne">
                                                        <div className="avatar-group-item">
                                                            <a
                                                                href=""
                                                                className="d-inline-block"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                value="member-1"
                                                                aria-label="Ruhi Luft"
                                                                data-bs-original-title="Ruhi Luft"
                                                            >
                                                                <img
                                                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                                    alt=""
                                                                    className="rounded-circle avatar-sm"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="avatar-group-item">
                                                            <a
                                                                href=""
                                                                className="d-inline-block"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                value="member-5"
                                                                aria-label="Elias Hardage"
                                                                data-bs-original-title="Elias Hardage"
                                                            >
                                                                <img
                                                                    src="https://bootdey.com/img/Content/avatar/avatar5.png"
                                                                    alt=""
                                                                    className="rounded-circle avatar-sm"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="avatar-group-item">
                                                            <a
                                                                href=""
                                                                className="d-inline-block"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                value={
                                                                    "member-10"
                                                                }
                                                                aria-label="Jansh Wells"
                                                                data-bs-original-title="Jansh Wells"
                                                            >
                                                                <img
                                                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                                    alt=""
                                                                    className="rounded-circle avatar-sm"
                                                                />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="align-self-end">
                                                        <span className="badge badge-soft-success p-2 team-status">
                                                            Completed
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end team window */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}