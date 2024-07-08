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
    const componentKey = useRef();
    const handlekey = useReactToPrint({
        // console.log(...new Set(records.map((data) => data.Akey)));
        content: () => componentKey.current,
        documentTitle: 'TestBank_Answerkey',
        onafterPrint: () => alert('print success')
    });

    const [Hardvalue, setHardValue] =useState(0);
    const decreaseHard=()=>{
        if (Hardvalue > 0) {
            let num = parseInt(Hardvalue);
            setHardValue(num-1);
        }

    }
    const initialHardValue=(e)=>{
        setHardValue(e.target.value);
       
    };
    const increaseHard=()=>{
        if (Hardvalue < 100) {
            let num = parseInt(Hardvalue);
            setHardValue(num+1);
        }
       
    }

    const [Averagevalue, setAverageValue] =useState(0);
    const decreaseAverage=()=>{
        if (Averagevalue > 0) {
            let num = parseInt(Averagevalue);
            setAverageValue(num-1);
        }
    }
    const initialAverageValue=(e)=>{
        setAverageValue(e.target.value);
       
    };
    const increaseAverage=()=>{
        if (Averagevalue < 100) {
            let num = parseInt(Averagevalue);
            setAverageValue(num+1);
        }
    }

    const [Easyvalue, setEasyValue] =useState(0);
    const decreaseEasy=()=>{
        if (Easyvalue > 0) {
            let num = parseInt(Easyvalue);
            setEasyValue(num-1);
        }
    }
    const initialEasyValue=(e)=>{
        setEasyValue(e.target.value);
       
    };
    const increaseEasy=()=>{
        if (Easyvalue < 100) {
            let num = parseInt(Easyvalue);
            setEasyValue(num+1);
        }
    }

    const [coursePick, setcoursePick]=useState();

      // Initialize state for range values
  const [ranges, setRanges] = useState([50, 30, 20, 40]);

  const [EasyRecords, setEasyRecords] = useState([{}]);
  const getQuizEasydata = async () => {
      const reqdata = await fetch(
          `http://127.0.0.1:8000/jsonQuizRandomEasy`
      );
      const resdata = await reqdata.json();
      
      setRecords(resdata);
  };


  // Handler for range input change
  const handleRangeChange = (index, event) => {
    const newRanges = [...ranges];
    newRanges[index] = parseInt(event.target.value, 10);
    setRanges(newRanges);
  };

  // Calculate the sum of all range values
  const totalSum = ranges.reduce((acc, value) => acc + value, 0);
  
  const [QuestionLevel, setQuestionLevel]=useState('');

  const filteredItems = records.filter(item =>
    item.FieldOf === coursePick
  );

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
                    <div className="dark:bg-gray-800 overflow-hidden rounded-md p-2 mb-4 flex justify-center items-center">
                        <div className="w-50 bg-white shadow-sm">
                        <div className="flex w-full">
                            
                            <div className="flex flex-column w-full h-full m-4">
                                <label>Course<label className="text-red-500">*</label></label>
                                <div class="select-container">
                                    <select class="styled-select" onClick={(e)=>setcoursePick(e.target.value)}>
                                    { Courserecords.map(
                                                (Course, Index) => (
                                                    <option value={`${Course.course_code}`} key={Index}>{Course.course_code}</option>
                                                        ))}
                                    </select>
                                </div>
                                <label>Level<label className="text-red-500 mt-4">*</label></label>
                                <div class="select-container">
                                    <select class="styled-select" onClick={(e)=>setQuestionLevel(e.target.value)}>
                                            <option value="Easy" >Easy</option>
                                            <option value="Average" >Average</option>
                                            <option value="Hard" >Hard</option>
                                    </select>
                                </div>

                                <label>Number of items<label className="text-red-500 mt-4">*</label></label>
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
                        <div className="flex justify-center items-center m-2 relative w-full p-4">
                        <button className="button-21" role="button" onClick={getQuizdata}>
                            Generate
                            </button>
                        </div>
                        </div>
                    </div>




                    {records.length > 1  &&  
                        <div className="dark:bg-gray-800 overflow-hidden p-12 border-2">
                            <div>
                            <div className="flex mb-6">
                                <button onClick={getQuizdata} className="button-57 mr-4 flex" role="button">
                                <span class="text">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-clockwise mr-1" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                                    </svg></span>
                                    <span>Random List!</span>
                                </button>
                                <button onClick={()=>shuffleList()} className="button-57 mr-4 flex" role="button">
                                <span class="text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-shuffle mr-1" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"/>
                                <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192"/>
                                </svg>
                                </span>
                                <span>Shuffle Choices!</span>
                                </button>
                                <button onClick={handlePrint} className="button-57 mr-4 flex" role="button">
                                <span class="text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 576 512">
                                <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V288H216c-13.3 0-24 10.7-24 24s10.7 24 24 24H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM384 336V288H494.1l-39-39c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H384zm0-208H256V0L384 128z"/>
                                </svg>
                                </span>
                                <span>
                                Export Question naire!
                                </span>
                                </button>

                                <button onClick={handlekey} className="button-57" role="button">
                                <span class="text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 384 512" className="mr-2">
                                <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
                                </svg>
                                </span>
                                <span>Export Answer Key!</span>
                                </button>
                            </div>
                                <div className="flex justify-center items-center mb-4 mt-20 font-bold">
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

                        <div className="shadow-sm bg-white p-12 text-gray-900 dark:text-gray-100">
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
                                    {filteredItems
                                    .filter(fil => 
                                    fil.difficulty === QuestionLevel)
                                    .map((item, index) => (
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
                        {/* answer key */}
                        <div className="shadow-sm bg-white mt-12 p-12 text-gray-900 dark:text-gray-100">
                            <div ref={componentKey}>
                                <div className="bg-transparent p-12 text-gray-900 dark:text-gray-100">
                                    <div className="flex justify-center items-center">
                                        <ApplicationLogo className="w-25 h-25 fill-current text-gray-500 mb-6" />
                                    </div>
                                    <div className="flex justify-between p-4">
                                        <div className="flex mb-2">
                                            <label htmlFor="" className="font-bold text-2xl">
                                                Answer Sheet
                                            </label>
                                        </div>
                                    </div>

                                    {filteredItems.filter(fil =>  fil.difficulty === QuestionLevel).map((item, index) => (
                                        <div key={index}>
                                            <div className="w-100 h-full">
                                                <ol>
                                                    <li>
                                                        {index + 1}.&nbsp;
                                                        {item.Akey}
                                                    </li>
                                                </ol>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* end answer key */}
                        
        </>
                         
                        </div>
                       
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


export default QuizPage;