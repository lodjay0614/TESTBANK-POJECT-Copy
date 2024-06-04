import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function register_courses({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        course_code: "",
        course_title: "",
    });
    const submit = (e) => {
        post(route("reg_courses"));
    };

    const [records, setRecords] = useState([]);
    useEffect(() => {
        const getTeacherdata = async () => {
            const reqdata = await fetch("http://127.0.0.1:8000/jsoncourse");
            const resdata = await reqdata.json();
            // setUserdata(resdata);
            setRecords(resdata);
        };
        getTeacherdata();
    }, []);

    const [profCourselist, setProfCourseList] = useState([]);
    const viewProf = async (code) => {
        try {
            const reqdata = await fetch(`./CoursesinTeacher/${code}`);
            const resdata = await reqdata.json();
            setProfCourseList(resdata);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    List of Courses
                </h2>
            }
        >
            <Head title="Exam" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* form */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit}>
                                <div className="flex gap-2">
                                    <TextInput
                                        placeholder="Enter Course code"
                                        id="course_code"
                                        name="course_code"
                                        className="mt-1 block w-full"
                                        autoComplete="course_code"
                                        isFocused={true}
                                        value={data.course_code}
                                        onChange={(e) =>
                                            setData(
                                                "course_code",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    <TextInput
                                        placeholder="Enter Subject title"
                                        id="course_title"
                                        name="course_title"
                                        className="mt-1 block w-full"
                                        autoComplete="course_title"
                                        isFocused={true}
                                        value={data.course_title}
                                        onChange={(e) =>
                                            setData(
                                                "course_title",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex justify-center gap-2 pt-4">
                                    <PrimaryButton className="w-25 flex justify-center">
                                        Save
                                    </PrimaryButton>
                                    <PrimaryButton className="w-25 flex justify-center">
                                        Edit
                                    </PrimaryButton>
                                    <PrimaryButton className="w-25 flex justify-center">
                                        Delete
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* end form */}
                    {/* table */}
                    <div className="py-8 flex gap-4">
                        <div className="p-4 w-50 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-2">
                                <h1>Course List</h1>
                            </div>
                            <table className="table table-hover max-w-7xl mx-auto">
                                <thead className="table-dark">
                                    <tr>
                                        <th>#</th>
                                        <th>Course code</th>
                                        <th>Course title</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {records.map((course, index) => (
                                        <tr
                                            key={index}
                                            className="cursor-pointer"
                                            onClick={() =>
                                                viewProf(course.course_code)
                                            }
                                        >
                                            <td>{course.id}</td>
                                            <td>{course.course_code}</td>
                                            <td>{course.course_title}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-6 w-50 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-2">
                                <h1>Handled by</h1>
                            </div>
                            <table
                                className="table max-w-7xl mx-auto"
                                id="resizable"
                            >
                                <thead className="table-dark">
                                    <tr>
                                        <th>Teacher #</th>
                                        <th>Name</th>
                                        <th>email</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {profCourselist &&
                                        profCourselist.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.prof_IDnumber}</td>
                                                <td>{data.prof_name}</td>
                                                <td>{data.prof_email}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* end table */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}