import React, { useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import PrimaryButton from "@/Components/PrimaryButton";
import ApplicationLogo from "@/Components/ApplicationLogo";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const [limit, setLimit] = useState();
    useEffect(() => {
        setLimit(localStorage.getItem("limit"));
    });
    const [level, setLevel] = useState();
    useEffect(() => {
        setLevel(localStorage.getItem("level"));    
    });

    const [records, setRecords] = useState([{}]);
    useEffect(() => {
        const getQuizdata = async () => {
            const reqdata = await fetch(
                `http://127.0.0.1:8000/jsonQuizRandom/${limit}/${level}`
            );
            const resdata = await reqdata.json();
            setRecords(resdata);
        }
        getQuizdata();
    },[]);


    return (
        <div className="shadow-sm bg-white p-12 text-gray-900 dark:text-gray-100" style={{height:"150vh"}}>
        <div ref={ref}>
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

                {records && records.map((ask, index) => (
                    <div key={index}>
                        <div className="w-100 h-full">
                            <ol>
                                <li>
                                    {index + 1}.&nbsp;
                                    {ask.Question}
                                </li>
                            </ol>
                            <ul
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
                                    {ask.Aa}
                                </li>
                                <li
                                    style={{
                                        listStyleType: "lower-alpha",
                                        margin: "3px",
                                    }}
                                >
                                    {ask.Ab}
                                </li>
                                <li
                                    style={{
                                        listStyleType: "lower-alpha",
                                        margin: "3px",
                                    }}
                                >
                                    {ask.Ac}
                                </li>
                                <li
                                    style={{
                                        listStyleType: "lower-alpha",
                                        margin: "3px",
                                    }}
                                >
                                    {ask.Ad}
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
});

export class Example extends React.PureComponent {
    render() {
        return (
            <div>
                <ComponentToPrint ref={(el) => (this.componentRef = el)}/>
                <ReactToPrint
                    trigger={() => {
                        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                        // to the root node of the returned component as it will be overwritten.
                        return (
                            <div className="flex justify-end mt-6">
                                <PrimaryButton>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="white" viewBox="0 0 512 512"><path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
                                </PrimaryButton>
                            </div>
                        );
                    }}
                    content={() => this.componentRef}
                />
            </div>
        );
    }
}