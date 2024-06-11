import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, user }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className="p-6">
                                Hello{" "}
                                <span className="font-bold">
                                    {auth.user.role}
                                </span>
                                !
                            </h1>
                           
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
<div className="container">
    <div className="row">
        <div className="col-lg-3 col-sm-6">
            <div className="card-box bg-blue">
                <div className="inner">
                    <h3> 0 </h3>
                    <p> Student Strength </p>
                </div>
                <div className="icon">
                    <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                </div>
                <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></a>
            </div>
        </div>

        <div className="col-lg-3 col-sm-6">
            <div className="card-box bg-green">
                <div className="inner">
                    <h3> 0 </h3>
                    <p> Today’s Collection </p>
                </div>
                <div className="icon">
                    <i className="fa fa-money" aria-hidden="true"></i>
                </div>
                <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></a>
            </div>
        </div>
        <div className="col-lg-3 col-sm-6">
            <div className="card-box bg-orange">
                <div className="inner">
                    <h3> 0 </h3>
                    <p> Admin </p>
                </div>
                <div className="icon">
                    <i className="fa fa-user-plus" aria-hidden="true"></i>
                </div>
                <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></a>
            </div>
        </div>
        <div className="col-lg-3 col-sm-6">
            <div className="card-box bg-red">
                <div className="inner">
                    <h3> 0 </h3>
                    <p> Users </p>
                </div>
                <div className="icon">
                    <i className="fa fa-users"></i>
                </div>
                <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></a>
            </div>
        </div>
    </div>
   
</div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}