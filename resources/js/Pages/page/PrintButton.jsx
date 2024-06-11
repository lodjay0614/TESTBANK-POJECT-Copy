import React, { useEffect, useRef, useState } from "react";
import {useReactToPrint} from "react-to-print";

import PrimaryButton from "@/Components/PrimaryButton";
import ApplicationLogo from "@/Components/ApplicationLogo";

export const ComponentToPrint =({value})=> {

    // const [ansrecords, setansRecords] = useState([{}]);
    const [records, setRecords] = useState(value);

    useEffect(() => {
        
    });
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



    return ( 
    <>
        <div className="flex justify-between p-2">
            <h1 className="mb-2 ml-4 opacity-50">
                Page 1
            </h1>
            <div className="flex">
            <button onClick={()=>shuffleList()} className="mr-12 flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-shuffle mr-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"/>
            <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192"/>
            </svg>
                Shuffle List
            </button>
            <button onClick={handlePrint} className="mr-4 flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-printer-fill mr-2" viewBox="0 0 16 16">
            <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1"/>
            <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
            </svg>
            Print
            </button>
            </div>
          
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
    );
};
