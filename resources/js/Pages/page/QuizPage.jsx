import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function QuizPage({ auth }) {
    const [categoryData, setUserdata] = useState([]);
    const [records, setRecords] = useState([]);
    useEffect(() => {
        const getQuizdata = async () => {
            const reqdata = await fetch("http://127.0.0.1:8000/jsonQuiz");
            const resdata = await reqdata.json();
            const array = Object.values(resdata);
            setUserdata(array);
            setRecords(array);
        };
        getQuizdata();
    }, []);

    const Filter = (e) => {
        if (e.target.value === "All") {
            setRecords(categoryData);
        } else {
            setRecords(
                categoryData.filter(
                    (f) =>
                        f.difficulty.includes(e.target.value) ||
                        f.FieldOf.includes(e.target.value)
                )
            );
        }
    };

    const EditQuiz = (Question, A, B, C, D, key, difficulty, id, Fieldof) => {
        const question = Question;
        const answerA = A;
        const answerB = B;
        const answerC = C;
        const answerD = D;
        const Akey = key;
        const FieldOf = Fieldof;
        const Alvl = difficulty;
        const Quizid = id;

        setData((prev) => {
            return {
                ...prev,
                question: question,
                answerA: answerA,
                answerB: answerB,
                answerC: answerC,
                answerD: answerD,
                Alvl: Alvl,
                Akey: Akey,
                Fieldof: FieldOf,
                id: Quizid,
            };
        });
    };

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

    //connection to controller / store data from database
    const { data, setData, post, processing, errors, reset } = useForm({
        question: "",
        answerA: "",
        answerB: "",
        answerC: "",
        answerD: "",
        Akey: "",
        Fieldof: "",
        Alvl: "",
        id: "",
    });
    const submitQuiz = (e) => {
        post(route("addQuiz"));
    };
    const submitEditQuiz = (e) => {
        post(route("saveEdit"));
    };
    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };
    // end here
    const [Courserecords, setCourseRecords] = useState([]);
    useEffect(() => {
        const getQuizdata = async () => {
            const reqdata = await fetch(
                `http://127.0.0.1:8000/jsonHandledCourses/${auth.user.id}`
            );
            const resdata = await reqdata.json();
            setCourseRecords(resdata);
        };
        getQuizdata();
    }, []);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Exam
                </h2>
            }
        >
            <Head title="Exam" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-12 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-end">
                            <div className="w-100 flex flex-column">
                                <div className="w-100 p-2 flex justify-end">
                                    <div className="w-75 flex justify-end">
                                        <div className="w-50 flex justify-end">
                                            <input
                                                type="text"
                                                placeholder="Search here..."
                                                onChange={(e) =>
                                                    setQuizSearch(
                                                        e.target.value
                                                    )
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
                                                    transform:
                                                        "translate(-40px, 12px)",
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
                                <div className="w-100 flex items-center pb-4">
                                    <div>
                                        <select
                                            onClick={Filter}
                                            name=""
                                            id="lvl"
                                            style={{
                                                border: "1px solid #dee2e6",
                                                borderRadius: "8px",
                                            }}
                                        >
                                            <option value="All">All</option>
                                            <option value="Easy">Easy</option>
                                            <option value="Average">
                                                Average
                                            </option>
                                            <option value="Hard">Hard</option>
                                        </select>
                                    </div>
                                    <div className="ml-2">
                                        <select
                                            onClick={Filter}
                                            name=""
                                            id=""
                                            style={{
                                                border: "1px solid #dee2e6",
                                                borderRadius: "8px",
                                            }}
                                        >
                                            <option value="All">All</option>
                                            {Courserecords &&
                                                Courserecords.map(
                                                    (data, index) => (
                                                        <option
                                                            value={`${data.course_code}`}
                                                            key={index}
                                                        >
                                                            {data.course_code}
                                                        </option>
                                                    )
                                                )}
                                        </select>
                                    </div>
                                    <div className="ml-2">
                                        <select
                                            name=""
                                            id=""
                                            style={{
                                                border: "1px solid #dee2e6",
                                                borderRadius: "8px",
                                            }}
                                        >
                                            <option value="">Approved</option>
                                            <option value="">Pending</option>
                                            <option value="">Denied</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table
                            className="table max-w-7xl mx-auto"
                            id="resizable"
                        >
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Questions</th>
                                    <th>A</th>
                                    <th>B</th>
                                    <th>C</th>
                                    <th>D</th>
                                    <th>Key</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {records
                                    .filter((item) => {
                                        return search.toLowerCase() === ""
                                            ? item
                                            : item.Question.toLowerCase().includes(
                                                  search
                                              );
                                    })
                                    .slice(firstIndex, lastIndex)
                                    .reverse()
                                    .map((rec, index) => (
                                        <tr key={index}>
                                            <td>{records.length - index}</td>
                                            <td>{rec.Question}</td>
                                            <td>{rec.Aa}</td>
                                            <td>{rec.Ab}</td>
                                            <td>{rec.Ac}</td>
                                            <td>{rec.Ad}</td>
                                            <td>{rec.Akey}</td>
                                            <td>
                                                <a
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#EditQuizModal"
                                                    onClick={() =>
                                                        EditQuiz(
                                                            rec.Question,
                                                            rec.Aa,
                                                            rec.Ab,
                                                            rec.Ac,
                                                            rec.Ad,
                                                            rec.Akey,
                                                            rec.difficulty,
                                                            rec.id,
                                                            rec.FieldOf
                                                        )
                                                    }
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="#fca903"
                                                        className="bi bi-pencil-square"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                        />
                                                    </svg>
                                                </a>
                                                <a
                                                    href={`./delete/${rec.id}`}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="#ff5147"
                                                        className="bi bi-trash-fill"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                                    </svg>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <div className="flex justify-between p-2">
                            <PrimaryButton
                                className=""
                                data-bs-toggle="modal"
                                data-bs-target="#AddQuizModal"
                            >
                                Add Row
                            </PrimaryButton>
                            {/* pagination */}
                            <div>
                                <nav>
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <a
                                                href="#"
                                                className="page-link"
                                                onClick={prePage}
                                            >
                                                Prev
                                            </a>
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
                                            <a
                                                href="#"
                                                className="page-link"
                                                onClick={nextPage}
                                            >
                                                Next
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            {/* end pagination */}
                        </div>

                        {/* modal edit */}
                        <div>
                            <div
                                className="modal fade"
                                id="EditQuizModal"
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
                                                Edit Question
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            ></button>
                                        </div>

                                        <div className="modal-body">
                                            <form onSubmit={submitEditQuiz}>
                                                <input
                                                    name="QuizID"
                                                    type="hidden"
                                                    value={data.id}
                                                    readOnly
                                                />
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="message-text"
                                                        className="col-form-label"
                                                    >
                                                        Question:
                                                    </label>
                                                    <textarea
                                                        name="question"
                                                        className="form-control"
                                                        id="message-text"
                                                        value={data.question}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                    ></textarea>
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        A:
                                                    </label>
                                                    <input
                                                        name="answerA"
                                                        type="text"
                                                        className="form-control"
                                                        id="recipient-name"
                                                        value={data.answerA}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        B:
                                                    </label>
                                                    <input
                                                        name="answerB"
                                                        type="text"
                                                        className="form-control"
                                                        id="recipient-name"
                                                        value={data.answerB}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        C:
                                                    </label>
                                                    <input
                                                        name="answerC"
                                                        type="text"
                                                        className="form-control"
                                                        id="recipient-name"
                                                        value={data.answerC}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        D:
                                                    </label>
                                                    <input
                                                        name="answerD"
                                                        type="text"
                                                        className="form-control"
                                                        id="recipient-name"
                                                        value={data.answerD}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        key:
                                                    </label>
                                                    <input
                                                        name="Akey"
                                                        type="text"
                                                        className="form-control"
                                                        id="recipient-name"
                                                        value={data.Akey}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        Field of:
                                                    </label>
                                                    <select
                                                        name="Fieldof"
                                                        className="form-control"
                                                        id="recipient-name"
                                                        value={data.Fieldof}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                    >
                                                        <option
                                                            value=""
                                                            className="text-center"
                                                        >
                                                            ---Select Course---
                                                        </option>
                                                        {Courserecords &&
                                                            Courserecords.map(
                                                                (
                                                                    data,
                                                                    index
                                                                ) => (
                                                                    <option
                                                                        value={`${data.course_code}`}
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {
                                                                            data.course_code
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        Level of Difficulty:
                                                    </label>
                                                    <select
                                                        name="Alvl"
                                                        className="form-control"
                                                        id="recipient-name"
                                                        value={data.Alvl}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                    >
                                                        <option value="Easy">
                                                            Easy
                                                        </option>
                                                        <option value="Average">
                                                            Average
                                                        </option>
                                                        <option value="Hard">
                                                            Hard
                                                        </option>
                                                    </select>
                                                </div>

                                                <PrimaryButton className="ms-4">
                                                    Save
                                                </PrimaryButton>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end modal edit */}

                        {/* modal add */}
                        <div>
                            <div
                                className="modal fade"
                                id="AddQuizModal"
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
                                                add Question
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            ></button>
                                        </div>

                                        <div className="modal-body">
                                            <form onSubmit={submitQuiz}>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="message-text"
                                                        className="col-form-label"
                                                    >
                                                        Question:
                                                    </label>
                                                    <textarea
                                                        name="question"
                                                        className="form-control"
                                                        id="message-text"
                                                        onChange={(e) =>
                                                            setData(
                                                                "question",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    ></textarea>
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        A:
                                                    </label>
                                                    <input
                                                        name="answerA"
                                                        type="text"
                                                        className="form-control"
                                                        id="recipient-name"
                                                        onChange={(e) =>
                                                            setData(
                                                                "answerA",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        B:
                                                    </label>
                                                    <input
                                                        name="answerB"
                                                        type="text"
                                                        className="form-control"
                                                        id="recipient-name"
                                                        onChange={(e) =>
                                                            setData(
                                                                "answerB",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        C:
                                                    </label>
                                                    <input
                                                        name="answerC"
                                                        type="text"
                                                        className="form-control"
                                                        id="recipient-name"
                                                        onChange={(e) =>
                                                            setData(
                                                                "answerC",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        D:
                                                    </label>
                                                    <input
                                                        name="answerD"
                                                        type="text"
                                                        className="form-control"
                                                        id="recipient-name"
                                                        onChange={(e) =>
                                                            setData(
                                                                "answerD",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        key:
                                                    </label>
                                                    <input
                                                        name="Akey"
                                                        type="text"
                                                        className="form-control"
                                                        id="recipient-name"
                                                        onChange={(e) =>
                                                            setData(
                                                                "Akey",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        Field of:
                                                    </label>
                                                    <select
                                                        name="Alvl"
                                                        className="form-control"
                                                        id="recipient-name"
                                                        onChange={(e) =>
                                                            setData(
                                                                "Fieldof",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    >
                                                        <option
                                                            value=""
                                                            className="text-center"
                                                        >
                                                            ---Select Course---
                                                        </option>
                                                        {Courserecords &&
                                                            Courserecords.map(
                                                                (
                                                                    data,
                                                                    index
                                                                ) => (
                                                                    <option
                                                                        value={`${data.course_code}`}
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {
                                                                            data.course_code
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        Level of Difficulty:
                                                    </label>
                                                    <select
                                                        name="Alvl"
                                                        className="form-control"
                                                        id="recipient-name"
                                                        onChange={(e) =>
                                                            setData(
                                                                "Alvl",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    >
                                                        <option
                                                            value=""
                                                            className="text-center"
                                                        >
                                                            ---Select Level---
                                                        </option>
                                                        <option value="Easy">
                                                            Easy
                                                        </option>
                                                        <option value="Average">
                                                            Average
                                                        </option>
                                                        <option value="Hard">
                                                            Hard
                                                        </option>
                                                    </select>
                                                </div>

                                                <PrimaryButton className="ms-4">
                                                    Add
                                                </PrimaryButton>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end modal add */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}