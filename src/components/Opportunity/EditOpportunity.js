import React, { useRef, useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate, useParams } from 'react-router-dom';

function UpdateOpportunity() {

    const firstnameRef = useRef('');
    const middlenameRef = useRef('');
    const lastnameRef = useRef('');
    const contactRef = useRef('');
    const emailRef = useRef('');
    const cityRef = useRef('');
    const stateRef = useRef('');
    const countryRef = useRef('');
    const planRef = useRef('');
    const [items, setItems] = useState([]);

    const [formIsValid, setFormIsValid] = useState(true);
    const [dataIsInserted, setDataIsInserted] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost/yii/crmfinal/frontend/web/index.php/opportunities/${id}`)
            .then((res) => res.json())
            .then((result) => {
                firstnameRef.current.value = result.person.firstname;
                middlenameRef.current.value = result.person.middlename;
                lastnameRef.current.value = result.person.lastname;
                contactRef.current.value = result.person.contact_no;
                emailRef.current.value = result.person.email_id;
                cityRef.current.value = result.address.city;
                stateRef.current.value = result.address.state;
                countryRef.current.value = result.address.country;
                planRef.current.value = result.plan.plan_id;
            });
    });

    async function submitHandler(event) {
        event.preventDefault();
        if (firstnameRef.current.value.trim() === "" || lastnameRef.current.value.trim() === "" || emailRef.current.value.trim() === "" || contactRef.current.value.trim() === "" || cityRef.current.value.trim() === "" || stateRef.current.value.trim() === "" || countryRef.current.value.trim() === "" || planRef.current.value.trim() === " ") {
            setFormIsValid(false);
            // console.log("coomibnf");
            return;
        }
        else {
            setFormIsValid(true);

            const opportunity = {
                firstname: firstnameRef.current.value,
                middlename: middlenameRef.current.value,
                lastname: lastnameRef.current.value,
                email_id: emailRef.current.value,
                contact_no: Number(contactRef.current.value),
                city: cityRef.current.value,
                state: stateRef.current.value,
                country: countryRef.current.value,
                plan_id: planRef.current.value
            }
            const opportunities = await fetch(`http://localhost/yii/crmfinal/frontend/web/index.php/opportunities/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify(opportunity)
            });
            const data = await opportunities.json();

            if (opportunities.status === 200) {
                navigate('/opportunity');
            }
            else {
                setDataIsInserted(data);
            }
        }
    };
    const getPlans = async () => {
        const plan = await fetch(
            `http://localhost/yii/crmfinal/frontend/web/index.php/plans`
        );
        const planData = await plan.json();
        setItems(planData);
    };
    useEffect(() => {
        getPlans();
    }, []);
    return (
        <div >
            <Navbar />
            <div className="flex flex-col h-screen justify-center items-center">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/6 h-full" onSubmit={submitHandler}>
                    <div className="text-danger">
                        {!formIsValid && "* Indicates All fields are mandatory"}
                    </div>
                    <h3 className="text-4xl font-normal leading-normal mt-0 mb-2 text-gray-700 text-center">
                        Update Opportunity
                    </h3>
                    <span className="text-danger">
                        * Required
                    </span>
                    <div className="text-danger">
                        {dataIsInserted.map((data) => (
                            data.message
                        ))}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskname">
                            First Name<span className="text-red-500"> *</span>
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" ref={firstnameRef} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskname">
                            Middle Name (Optional)
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" ref={middlenameRef} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskname">
                            Last Name<span className="text-red-500"> *</span>
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" ref={lastnameRef} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskname">
                            Contact No<span className="text-red-500"> *</span>
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" ref={contactRef} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskname">
                            Email ID<span className="text-red-500"> *</span>
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" ref={emailRef} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskname">
                            City<span className="text-red-500"> *</span>
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" ref={cityRef} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskname">
                            State<span className="text-red-500"> *</span>
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" ref={stateRef} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskname">
                            Country<span className="text-red-500"> *</span>
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" ref={countryRef} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskname">
                            Plan<span className="text-red-500"> *</span>
                        </label>
                        <select ref={planRef}>
                            {items.map((plan) => (
                                <option key={plan.plan_id} value={plan.plan_id}
                                >{plan.plan_name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit" >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateOpportunity;