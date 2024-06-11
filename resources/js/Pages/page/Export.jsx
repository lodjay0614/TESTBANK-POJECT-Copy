import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ApplicationLogo from "@/Components/ApplicationLogo";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { ComponentToPrint } from "./PrintButton";
import {useReactToPrint} from "react-to-print";
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
    const getQuizdata = async () => {
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


    // print page
    function shuffleList() {
        const myList = [...new Set(records.map((data) => data.Aa))];

         myList.map((data, index) =>{
            const id = document.getElementById(data);
            for (let i = id.children.length; i >= 0; i--) {
                id.appendChild(id.children[Math.random() * i | 0]);
              }
        });
      
    }


    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'TestBank',
        onafterPrint: () => alert('print success')
    });

    // end print page
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
                                    onClick={setLvl}
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
                                    onChange={setData}
                                    type="number"
                                    name="item"
                                    id="item"
                                    className="p-2 rounded-md cursor-pointer border-gray-500/50"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end items-center m-2 relative w-50">
                            <PrimaryButton
                                onClick={getQuizdata}
                                className="h-50"
                            >
                                Fetch/Filter
                            </PrimaryButton>
                        </div>
                    </div>
                    {records.length > 1  && 
                      
                        <div className="dark:bg-gray-800 overflow-hidden p-12 ">
                            <div>
                            <div className="flex mb-6">
                                <button onClick={getQuizdata} className="mr-12 flex">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-clockwise mr-1" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                                    </svg>
                                    Random List
                                </button>
                                <button onClick={()=>shuffleList()} className="mr-12 flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-shuffle mr-1" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"/>
                                <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192"/>
                                </svg>
                                    Shuffle Choices
                                </button>
                                <button onClick={handlePrint} className="mr-4 flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-printer-fill mr-2" viewBox="0 0 16 16">
                                <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1"/>
                                <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                                </svg>
                                Print
                                </button>
                                </div>
                                <div className="flex justify-center items-center mb-4 font-bold">
                                    <h1 className="opacity-75">
                                        -Page Preview-
                                    </h1>
                                </div>
                               
                            </div>
                          
                            <>
                            <div className="flex justify-between p-2">
                                <h1 className="mb-2 ml-4 opacity-50">
                                    Page 1
                                </h1>  
                            </div>

                        <div className="shadow-sm bg-white p-12 text-gray-900 dark:text-gray-100" style={{height:"200vh"}}>
                            <div ref={componentRef}>
                                <div className="bg-transparent p-12 text-gray-900 dark:text-gray-100">
                                    <div className="flex justify-center items-center">
                                        <ApplicationLogo className="w-25 h-25 fill-current text-gray-500 mb-6" />
                                    </div>
                                    <div className="flex justify-between p-10">
                                        <div className="flex flex-column mb-6 gap-2">
                                            <label htmlFor="">
                                                Name:___________________________________
                                            </label>
                                            <label htmlFor="">
                                                Year & Course:___________________________________
                                            </label>
                                        </div>
                                        <div className="flex flex-column mb-6 gap-2">
                                            <label htmlFor="">
                                                Date:___________________________________
                                            </label>
                                            <label htmlFor="">
                                                Score:___________________________________
                                            </label>
                                        </div>
                                    </div>

                                    {records.map((item, index) => (
                                        <div key={index}>
                                            <div className="w-100 h-full">
                                                <ol>
                                                    <li>
                                                        {index + 1}.&nbsp;
                                                        {item.Question}
                                                    </li>
                                                </ol>
                                                        <ul
                                                            id={`${item.Aa}`}
                                                            key={index}
                                                            className="py-2"
                                                            style={{
                                                                paddingLeft: "50px",
                                                            }}
                                                        >
                                                            <li
                                                                style={{
                                                                    listStyleType: "lower-alpha",
                                                                    margin: "3px",
                                                                }}
                                                            >
                                                                {item.Aa}
                                                            </li>
                                                            <li
                                                                style={{
                                                                    listStyleType: "lower-alpha",
                                                                    margin: "3px",
                                                                }}
                                                            >
                                                            {item.Ab}
                                                            </li>
                                                            <li
                                                                style={{
                                                                    listStyleType: "lower-alpha",
                                                                    margin: "3px",
                                                                }}
                                                            >
                                                                {item.Ac}
                                                            </li>
                                                            <li
                                                                style={{
                                                                    listStyleType: "lower-alpha",
                                                                    margin: "3px",
                                                                }}
                                                            >
                                                                {item.Ad}
                                                            </li>
                                                        </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
        </>
                         
                        </div>
                       
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


export default QuizPage;