import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';


export default function QuizPage({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        IDnumber: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        post(route('RegisterTeacher'));
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
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div>
                        <PrimaryButton  data-bs-toggle="modal"
                                        data-bs-target="#RegisterModal"
                        >
                                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                    <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
                                    </svg>
                        </PrimaryButton>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-md shadow-sm flex">
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
                                    <td></td>
                                    <td></td>
                                    <td></td>
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
            <div>
                {/* modal register */}
                            <div
                                className="modal fade"
                                id="RegisterModal"
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
                                               Teacher Registration
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            ></button>
                                        </div>

                                        <div className="modal-body">
                                            <form onSubmit={submit}>
                                            <div>
                                                <InputLabel htmlFor="IDnumber" value="ID Number" />

                                                <TextInput
                                                    type="number"
                                                    id="IDnumber"
                                                    name="IDnumber"
                                                    value={data.IDnumber}
                                                    className="mt-1 block w-full"
                                                    autoComplete="IDnumber"
                                                    isFocused={true}
                                                    onChange={(e) => setData('IDnumber', e.target.value)}
                                                    required
                                                />

                                                <InputError message={errors.IDno} className="mt-2" />
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
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    required
                                                />

                                                <InputError message={errors.name} className="mt-2" />
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
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    required
                                                />

                                                <InputError message={errors.email} className="mt-2" />
                                            </div>

                                            <div className="mt-4">
                                                <InputLabel htmlFor="password" value="Password" />

                                                <TextInput
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    value={data.password}
                                                    className="mt-1 block w-full"
                                                    autoComplete="new-password"
                                                    onChange={(e) => setData('password', e.target.value)}
                                                    required
                                                />

                                                <InputError message={errors.password} className="mt-2" />
                                            </div>

                                            <div className="mt-4">
                                                <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                                                <TextInput
                                                    id="password_confirmation"
                                                    type="password"
                                                    name="password_confirmation"
                                                    value={data.password_confirmation}
                                                    className="mt-1 block w-full"
                                                    autoComplete="new-password"
                                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                                    required
                                                />

                                                <InputError message={errors.password_confirmation} className="mt-2" />
                                            </div>

                                            <div className="flex items-center justify-end mt-4">
                                                {/* <Link
                                                    href={route('login')}
                                                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                                >
                                                    Already registered?
                                                </Link> */}

                                                <PrimaryButton className="ms-4" disabled={processing}>
                                                    Register
                                                </PrimaryButton>
                                            </div>
                                        </form>
                                          
                                        </div>
                                    </div>
                                </div>
                            </div>
                {/* end modal register */}
                        </div>
        </AuthenticatedLayout>
    );
}