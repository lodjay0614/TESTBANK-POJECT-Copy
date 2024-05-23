import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ApplicationLogo from "@/Components/ApplicationLogo";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Document, Packer, Paragraph, VerticalAlign } from "docx";
import { saveAs } from "file-saver";
import Docxtemplater from "docxtemplater";
import PrimaryButton from "@/Components/PrimaryButton";
import { Example } from "./PrintButton";
import ReactDOM from "react-dom";

export default function QuizPage({ auth }) {
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
        window.localStorage.setItem("limit", JSON.stringify(LimitItem));
        window.localStorage.setItem("level", JSON.stringify(LvlItem));
    };
    
  
    // const generateWordDocument = () => {
    //     const doc = new docx.Document();

    //     // Add content to the document
    //     doc.addSection({
    //         children: [
    //             new docx.Paragraph({
    //                 children: [
    //                     new docx.TextRun({
    //                         text: JSON.stringify(
    //                             records.map((a, b) => <>{a.Question}</>)
    //                         ),
    //                     }),
    //                 ],
    //             }),
    //         ],
    //     });
    //     docx.Packer.toBlob(doc).then((blob) => {
    //         saveAs(blob, "first.docx");
    //     });
    // };

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
                    <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-md shadow-sm p-12 mb-4 flex">
                        <div className="flex w-50">
                            <div className="flex flex-column m-2 h-full w-50">
                                <label htmlFor="lvl">
                                    Level of Difficulty:
                                </label>
                                <select
                                    onClick={(e) => setLvl(e)}
                                    name="lvl"
                                    id="lvl"
                                    className="p-2 rounded-md cursor-pointer"
                                >
                                    <option value="Easy">Easy</option>
                                    <option value="Average">Average</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>
                            <div className="flex flex-column h-full m-2">
                                <label htmlFor="item">Number of Items:</label>
                                <input
                                    value={LimitItem}
                                    onChange={(e) => setData(e)}
                                    type="number"
                                    name="item"
                                    id="item"
                                    className="p-2 rounded-md cursor-pointer"
                                />
                            </div>
                            <div id="printpaper"></div>
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
                    {records.length > 1 && (
                        <div className="dark:bg-gray-800 overflow-hidden p-12 ">
                            <div>
                                <div className="flex justify-center items-center mb-4 font-bold">
                                    <h1 className="opacity-75">
                                        -Page Preview-
                                    </h1>
                                </div>
                                <div className="flex justify-between">
                                    <h1 className="mb-2 ml-4 opacity-50">
                                        Page 1
                                    </h1>
                                </div>
                            </div>
                            <Example/>
                            {/* <ComponentToPrint value={records} /> */}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}