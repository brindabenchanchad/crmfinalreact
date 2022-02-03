import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function AddPlan() {
    const history = useNavigate();
    const nameRef = useRef('');
    const descriptionRef = useRef('');
    const priceRef = useRef('');
    const durationRef = useRef('');
    const [formIsValid, setFormIsValid] = useState(true);
    const [dataIsInserted, setDataIsInserted] = useState([]);

    const [nameIsValid, setNameIsValid] = useState(true);
    const [durationIsValid, setDurationIsValid] = useState(true);
    const [priceIsValid, setPriceIsValid] = useState(true);
    const [descriptionIsValid, setDescriptionIsValid] = useState(true);
    const onNameChange = (event) => {
        if (event.target.value.trim() === "") {
            setNameIsValid(false);
        }
        else {
            setNameIsValid(true);
        }
    }
    const onDescriptionChange = (event) => {
        if (event.target.value.trim() === "") {
            setDescriptionIsValid(false);
        }
        else {
            setDescriptionIsValid(true);
        }
    }
    const onpriceChange = (event) => {
        if (event.target.value.trim() === "") {
            setPriceIsValid(false);
        }
        else {
            setPriceIsValid(true);
        }
    }
    const onDurationChange = (event) => {
        if (event.target.value.trim() === "") {
            setDurationIsValid(false);
        }
        else {
            setDurationIsValid(true);
        }
    }
    const submitHandler = async (event) => {

        event.preventDefault();

        if (nameRef.current.value.trim() === "" || descriptionRef.current.value.trim() === "" || priceRef.current.value === "" || durationRef.current.value === "") {
            setFormIsValid(false);
            // console.log("coomibnf");
            return;
        }
        else {
            setFormIsValid(true);
            const plan = {
                plan_name: nameRef.current.value,
                plan_description: descriptionRef.current.value,
                plan_duration: durationRef.current.value,
                plan_price: priceRef.current.value,
            };
            const response = await fetch('http://localhost/yii/crmfinal/frontend/web/index.php/plans', {
                method: 'POST',
                body: JSON.stringify(plan),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.status === 200) {
                history('/plan');
            }
            else {
                console.log(data);
                setDataIsInserted(data);
                console.log(dataIsInserted)
            }
            //
            // console.log(data);

        }
    };

    return (
        <div >
            <Navbar />
            <div className="flex flex-col h-fit justify-center items-center">

                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/6" onSubmit={submitHandler}>
                    <div className="text-danger">
                        {!formIsValid && "All fields are mandatory"}
                    </div>
                    <div className="text-danger">
                        {dataIsInserted.map((data) => (
                            data.message
                        ))} 
                    </div>
                    <h3 className="text-4xl font-normal leading-normal mt-0 mb-2 text-gray-700">
                        Add Plan
                    </h3>
                    <span className="text-danger">
                        * Required
                    </span>
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="planname">
                            Plan Name<span className="text-red-500"> *</span>
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="planname" type="text" placeholder="Plan name" onBlur={onNameChange} onChange={onNameChange} ref={nameRef}/>
                        {!nameIsValid &&
                            <span className="text-red-400">Plan Name Should not be empty.</span>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Plan Description<span className="text-red-500"> *</span>
                        </label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Plan Description" id="description" ref={descriptionRef} onBlur={onDescriptionChange} onChange={onDescriptionChange} rows="4"></textarea>
                        {!descriptionIsValid &&
                            <span className="text-red-400">Plan Description Should not be empty.</span>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="planduration">
                            Plan Duration<span className="text-red-500"> *</span>
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="planduration" type="text" placeholder="Plan Duration" onBlur={onDurationChange} onChange={onDurationChange} ref={durationRef} />
                        {!durationIsValid &&
                            <span className="text-red-400">Plan Duration Should not be empty.</span>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="planprice">
                            Plan Price<span className="text-red-500"> *</span>
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="planprice" type="text" placeholder="Plan Price" onBlur={onpriceChange} onChange={onpriceChange} ref={priceRef} />
                        {!priceIsValid &&
                            <span className="text-red-400">Plan Price Should not be empty </span>
                        }
                    </div>
                    <div className="flex items-center justify-between">

                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit" >
                            Add Plan
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPlan;