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
        name: "",
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

    const submit = (e) => {
        e.preventDefault();
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

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* modal register */}

                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel
                                        htmlFor="IDnumber"
                                        value="ID Number"
                                    />

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

                                <div className="mt-4">
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email" />

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
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="email"
                                        value="Subjects/Courses:"
                                    />
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
                                                "translate(520px, -30px)",
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
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />

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

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Confirm Password"
                                    />

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

                                <div className="flex items-center justify-end mt-4">
                                    {/* <Link
                                                    href={route('login')}
                                                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                                >
                                                    Already registered?
                                                </Link> */}

                                    <PrimaryButton
                                        className="ms-4"
                                        disabled={processing}
                                    >
                                        Register
                                    </PrimaryButton>
                                </div>
                            </form>

                            {/* end modal register */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}