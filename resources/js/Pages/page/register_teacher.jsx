import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function QuizPage({ auth }) {

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
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-md shadow-sm p-12 mb-4 flex">
                    <table
                            className="table max-w-7xl mx-auto"
                            id="resizable"
                        >
                            <thead className="table-dark">
                                <tr>
                                    <th>Teacher Number</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                               <tr key="">
                                    <td>19010585</td>
                                    <td>marcelo</td>
                                    <td>marcelo@gmail.com</td>
                                    <td>*********</td>
                                    <td>
                                        <PrimaryButton>view</PrimaryButton>
                                    </td>
                               </tr>
                                     
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}