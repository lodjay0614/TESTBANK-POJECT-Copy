import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ApplicationLogo from "@/Components/ApplicationLogo";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Document, Packer, Paragraph, VerticalAlign } from "docx";
import { saveAs } from "file-saver";
import Docxtemplater from "docxtemplater";
import PrimaryButton from "@/Components/PrimaryButton";
import { ComponentToPrint } from "./PrintButton";
import ReactDOM from "react-dom";
import { createPortal } from 'react-dom';


function QuizPage({ auth }) {
    
    const [LimitItem, setLimitItem] = useState(0);
    const setData = (e) => {
        const item = e.target.value;
        if (item <= 0) {
            setLimitItem(1);
        } else {
            setLimitItem(item);
        }
    };
    const [LvlItem, setLvlItem] = useState();
    const setLvl = (e) => {
        setLvlItem(e.target.value);
    };

    const [records, setRecords] = useState([{}]);
    const getQuizdata = async (e) => {
        const reqdata = await fetch(
            `http://127.0.0.1:8000/jsonQuizRandom/${LimitItem}/${LvlItem}`
        );
        const resdata = await reqdata.json();
        setRecords(resdata);
    };


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
                    Export ExamPaper
                </h2>
            }
        >
            <Head title="Export" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-md shadow-sm p-2 mb-4 flex">
                        <div className="flex w-full">
                            <div className="flex flex-column m-2 h-full w-50">
                                <label
                                    htmlFor="lvl"
                                    className="opacity-50 text-sm"
                                >
                                    Level of Difficulty:
                                </label>
                                <select
                                    onClick={(e) => setLvl(e)}
                                    name="lvl"
                                    id="lvl"
                                    className="p-2 rounded-md cursor-pointer  border-gray-500/50"
                                >
                                    <option value="Easy">Easy</option>
                                    <option value="Average">Average</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>
                            <div className="flex flex-column h-full m-2">
                                <label
                                    htmlFor="item"
                                    className="opacity-50 text-sm"
                                >
                                    Number of Items:
                                </label>
                                <input
                                    value={LimitItem}
                                    onChange={(e) => setData(e)}
                                    type="number"
                                    name="item"
                                    id="item"
                                    className="p-2 rounded-md cursor-pointer border-gray-500/50"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end items-center m-2 relative w-50">
                            <PrimaryButton
                                onClick={()=>getQuizdata()}
                                className="h-50"
                            >
                                Fetch/Filter
                            </PrimaryButton>
                        </div>
                    </div>
                    {records.length > 1  && 
                      
                        <div className="dark:bg-gray-800 overflow-hidden p-12 ">
                            <div>
                                <div className="flex justify-center items-center mb-4 font-bold">
                                    <h1 className="opacity-75">
                                        -Page Preview-
                                    </h1>
                                </div>
                               
                            </div>
                          
                            <ComponentToPrint value={records} key={records.id}/>
                         
                        </div>
                       
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


export default QuizPage;