import React, { useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";

function AddPlan(props) {
    const nameRef = useRef('');
    const descriptionRef = useRef('');
    const [nameIsValid, setNameIsValid] = useState(true);
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

    function submitHandler(event) {

        event.preventDefault();

        // could add validation here...

        const task = {
            task_name: nameRef.current.value,
            task_description: descriptionRef.current.value,
        };

        props.onAddPlan(task);
    };
    return (
        <div >
            <Navbar />
            <div className="flex flex-col h-screen justify-center items-center">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
                    <h3 className="text-4xl font-normal leading-normal mt-0 mb-2 text-gray-700">
                        Add Task
                    </h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskname">
                            Task Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="taskname" type="text" placeholder="Task name" onBlur={onNameChange} onChange={onNameChange} ref={nameRef} />
                        {!nameIsValid &&
                            <span className="text-red-400">Task Name Should not be empty.</span>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Task Description
                        </label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Task Description" id="description" ref={descriptionRef} onBlur={onDescriptionChange} onChange={onDescriptionChange}></textarea>
                        {!descriptionIsValid &&
                            <span className="text-red-400">Task Description Should not be empty.</span>
                        }
                    </div>
                    <div className="flex items-center justify-between">

                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit" >
                            Add
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPlan;