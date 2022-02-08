import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function AddEmployee() {
    const history = useNavigate();
    const fnameRef = useRef('');
    const lnameRef = useRef('');
    const contactRef = useRef('');
    const emailRef = useRef('');
    const designationRef = useRef('');
    const salaryRef = useRef('');
    const cityRef = useRef('');
    const stateRef = useRef('');
    const countryRef = useRef('');


    const [formIsValid, setFormIsValid] = useState(true);
    const [nameIsValid, setNameIsValid] = useState(true);
    const [designationIsValid, setDesignationIsValid] = useState(true);
    const [salaryIsValid, setSalaryIsValid] = useState(true);

    const onNameChange = (event) => {
        if (event.target.value.trim() === "") {
            setNameIsValid(false);
        }
        else {
            setNameIsValid(true);
        }
    }
    const onDesignationChange = (event) => {
        if (event.target.value.trim() === "") {
            setDesignationIsValid(false);
        }
        else {
            setDesignationIsValid(true);
        }
    }
    const onsalaryChange = (event) => {
        if (event.target.value.trim() === "") {
            setSalaryIsValid(false);
        }
        else {
            setSalaryIsValid(true);
        }
    }

    const submitHandler = async (event) => {

        event.preventDefault();

        if (fnameRef.current.value.trim() === "" || designationRef.current.value.trim() === "" || salaryRef.current.value === "") {
            setFormIsValid(false);

            return;
        }
        else {
            setFormIsValid(true);
            const employee = {
                firstname: fnameRef.current.value,
                lastname: lnameRef.current.value,
                contact_no: contactRef.current.value,
                email_id: emailRef.current.value,
                designation: designationRef.current.value,
                salary: salaryRef.current.value,
                city: cityRef.current.value,
                state: stateRef.current.value,
                country: countryRef.current.value,
            };
            const response = await fetch('http://localhost:8888/yii/Employee/frontend/web/index.php/employees', {
                method: 'POST',
                body: JSON.stringify(employee),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            history('/employee');
            console.log(data);
        }
    };

    return (
        <div >
            <Navbar />
            <div className="flex flex-col h-fit justify-center items-center">
                <div className="text-danger">
                    {!formIsValid && "All fields are mandatory"}
                </div>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
                    <h3 className="text-4xl font-normal leading-normal mt-0 mb-2 text-gray-700">
                        Add Employee
                    </h3>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="planname">
                            Employee FirstName
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="employeename" type="text" placeholder="Employee name" onBlur={onNameChange} onChange={onNameChange} ref={fnameRef} />
                        {!nameIsValid &&
                            <span className="text-red-400">Name Should not be empty.</span>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="planname">
                            Employee LastName
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="employeename" type="text" placeholder="Employee name" onBlur={onNameChange} onChange={onNameChange} ref={lnameRef} />
                        {!nameIsValid &&
                            <span className="text-red-400">Name Should not be empty.</span>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="planname">
                            Contact number
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="employeename" type="number" placeholder="Employee name" onBlur={onNameChange} onChange={onNameChange} ref={contactRef} />
                        {!nameIsValid &&
                            <span className="text-red-400">Name Should not be empty.</span>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="planname">
                            Email Id
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="employeename" type="email" placeholder="Employee name" onBlur={onNameChange} onChange={onNameChange} ref={emailRef} />
                        {!nameIsValid &&
                            <span className="text-red-400">Name Should not be empty.</span>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designation">
                            Designation
                        </label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Designation" id="designation" ref={designationRef} onBlur={onDesignationChange} onChange={onDesignationChange}></textarea>
                        {!designationIsValid &&
                            <span className="text-red-400">Designation Should not be empty.</span>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">
                            Salary
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="salary" type="number" placeholder="Salary" onBlur={onsalaryChange} onChange={onsalaryChange} ref={salaryRef} />
                        {!salaryIsValid &&
                            <span className="text-red-400">Salary Should not be empty.</span>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">
                            City
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="salary" type="text" placeholder="City" onBlur={onsalaryChange} onChange={onsalaryChange} ref={cityRef} />
                        {!salaryIsValid &&
                            <span className="text-red-400"> Should not be empty.</span>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">
                            State
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="salary" type="text" placeholder="state" onBlur={onsalaryChange} onChange={onsalaryChange} ref={stateRef} />
                        {!salaryIsValid &&
                            <span className="text-red-400">Salary Should not be empty.</span>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">
                            Country
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="salary" type="text" placeholder="country" onBlur={onsalaryChange} onChange={onsalaryChange} ref={countryRef} />
                        {!salaryIsValid &&
                            <span className="text-red-400">Salary Should not be empty.</span>
                        }
                    </div>

                    <div className="flex items-center justify-between">

                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit" >
                            Add Employee
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;