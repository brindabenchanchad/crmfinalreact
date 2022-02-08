import React from "react";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="Navbar sticky top-0 z-50">
            <nav className="dark:bg-slate-400 bg-dark w-full">
                <div className="mx-5 px-2 sm:px-6 lg:px-8">
                    <nav className="relative flex items-center justify-between h-16">
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0  font-bold text-4xl tracking-wider text-white">
                                CRM
                            </div>
                            <div className="">
                                <div className="flex ml-0 lg:ml-72 space-x-4 text-white text-xl">
                                    <NavLink to="/" exact="true" className="no-underline text-white">
                                        <li className="list-none px-3 py-2 rounded-md">Home</li>
                                    </NavLink>
                                    <NavLink to="/plan" className="no-underline text-white">
                                        <li className="list-none px-3 py-2 rounded-md">Plan</li>
                                    </NavLink>
                                    <NavLink to="/employee" className="no-underline text-white">
                                        <li className="list-none px-3 py-2 rounded-md">Employee</li>
                                    </NavLink>
                                    {/* <button className="float-right bg-gray-500 hover:bg-gray-700 text-white font-bold rounded">
                                        <NavLink to="/task/add"><li className="list-none  px-3 py-2 rounded-md ">Add Task</li></NavLink>
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;