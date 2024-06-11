import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";


export default function PendingListPage({ auth }) {


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                   Pending
                </h2>
            }
        >
            <Head title="Exam" />

           
        </AuthenticatedLayout>
    );
}