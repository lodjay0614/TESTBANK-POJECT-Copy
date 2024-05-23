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
        };
        getQuizdata();
    },[]);
    console.log(limit);

    return (
        <div ref={ref}>
            <div className="bg-white p-12 text-gray-900 dark:text-gray-100">
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

                {records.map((a, index) => (
                    <div key={index}>
                        <div className="w-100 h-full">
                            <ol>
                                <li>
                                    {index + 1}.&nbsp;
                                    {a.Question}
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
                                    {a.Aa}
                                </li>
                                <li
                                    style={{
                                        listStyleType: "lower-alpha",
                                        margin: "3px",
                                    }}
                                >
                                    {a.Ab}
                                </li>
                                <li
                                    style={{
                                        listStyleType: "lower-alpha",
                                        margin: "3px",
                                    }}
                                >
                                    {a.Ac}
                                </li>
                                <li
                                    style={{
                                        listStyleType: "lower-alpha",
                                        margin: "3px",
                                    }}
                                >
                                    {a.Ad}
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
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
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="mr-2 bi bi-box-arrow-down"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1z"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"
                                        />
                                    </svg>
                                    Print
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