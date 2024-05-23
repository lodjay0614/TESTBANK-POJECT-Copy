import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import ReactToPrint from "react-to-print";
import PrimaryButton from "@/Components/PrimaryButton";

export function ComponentToPrint({ value }) {
    return (
        <div>
            <div className="bg-white shadow-sm p-12 text-gray-900 dark:text-gray-100">
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

                {value.map((a, index) => (
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
}