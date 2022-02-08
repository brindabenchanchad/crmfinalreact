import React from "react";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { NavLink, useNavigate } from "react-router-dom";

const Employee = () => {

    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [flag, setFlag] = useState(0);
    const [trackPage, setTrackPage] = useState(1);
    let limit = 5;

    useEffect(() => {
        const getComments = async () => {
            const demo = await fetch(
                `http://localhost:8888/yii/Employee/frontend/web/index.php/employees`
            );
            const datademo = await demo.json();
            const total = datademo.length;
            const res = await fetch(
                `http://localhost:8888/yii/Employee/frontend/web/index.php/employees?per-page=${limit}&page=1`
            );
            const data = await res.json();
            // console.log(data);
            setItems(data);
            // const total = data.length;
            setpageCount(Math.ceil(total / limit));
        };
        getComments();
    }, [limit]);
    const fetchComments = async (currentPage) => {
        // console.log(currentPage);
        const res = await fetch(
            `http://localhost:8888/yii/Employee/frontend/web/index.php/employees?per-page=${limit}&page=${currentPage}`
        );
        const data = await res.json();
        return data;
    };
    const handlePageClick = async (data) => {

        let currentPage = data.selected + 1;

        const commentsFormServer = await fetchComments(currentPage);

        setItems(commentsFormServer);
        console.log(items);
    };
    const deletefn = async (id) => {
        console.log(id);
        if (window.confirm('Are you sure you want to delete ?')) {

            await fetch(`http://localhost:8888/yii/Employee/frontend/web/index.php/employees/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        }
        else {
            alert('Unable to Delete');
        }
        window.location.reload(true);
    }
    const handleSorting = async (event) => {
        if (flag === 0) {
            setFlag(1);
        }
        else {
            event = '-' + event;
            setFlag(0);
        }
        const res = await fetch(
            `http://localhost:8888/yii/Employee/frontend/web/index.php/employees?sort=${event}`
        );
        const data = await res.json();
        // console.log(data);
        setItems(data);
    }

    const handleSearching = async (column_name, event) => {
        if (column_name === 'employee_id') {
            const res = await fetch(
                `http://localhost:8888/yii/Employee/frontend/web/index.php/employees?filter[customer_id]=${event.target.value}&per-page=${limit}&page=${trackPage}`
            );
            const data = await res.json();
            setItems(data);
        }

        if (column_name === 'firstname') {
            console.log(column_name);
            const res = await fetch(
                `http://localhost:8888/yii/Employee/frontend/web/index.php/employees?filter[firstname][like]=${event.target.value}&per-page=${limit}&page=${trackPage}`
            );
            const data = await res.json();
            setItems(data);
        }

        if (column_name === 'designation') {
            const res = await fetch(
                `hhttp://localhost:8888/yii/Employee/frontend/web/index.php/employees?filter[designation][like]=${event.target.value}&per-page=${limit}&page=${trackPage}`
            );
            const data = await res.json();
            setItems(data);
        }

        if (column_name === 'salary') {
            const res = await fetch(
                `http://localhost:8888/yii/Employee/frontend/web/index.php/employees?filter[salary][like]=${event.target.value}&per-page=${limit}&page=${trackPage}`
            );
            const data = await res.json();
            setItems(data);
        }
    };
    return (
        <>
            <Navbar />
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">

                        <div className="overflow-hidden">

                            <table className="min-w-full">
                                <thead className="bg-white border-b">
                                    <tr className="bg-gray-400 border-b tran    tion duration-300 ease-in-out">
                                        <td colSpan="4" className="font-bold text-2xl text-center text-white px-6 py-4">Employee</td>
                                        <td colSpan="3" className="font-bold text-2xl text-center text-white px-6 py-4">
                                            <button className="float-right bg-green-300 hover:bg-green-500 text-white font-bold rounded">
                                                <NavLink to="/employee/add" className="no-underline text-white"><li className="list-none px-3 py-2 rounded-md ">+ Add Employee</li></NavLink>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('employee_id')}>ID▼</th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('firstname')} style={{ cursor: 'pointer' }}>
                                            Name▼
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('designation')} style={{ cursor: 'pointer' }}>
                                            Designation▼
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('salary')} style={{ cursor: 'pointer' }}>
                                            Salary▼
                                        </th>

                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4" onClick={() => handleSorting('created_at')} style={{ cursor: 'pointer' }}>
                                            Created Date▼
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Action
                                        </th>
                                    </tr>
                                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="id" id="employee_id" onChange={(event) => handleSearching('customer_id', event)} />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder=" Name" id="employee_name" onChange={(event) => handleSearching('firstname', event)} />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Designation" id="designation" onChange={(event) => handleSearching('designation', event)} />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Salary" id="salary" onChange={(event) => handleSearching('salary', event)} />
                                        </td>

                                    </tr>

                                </thead>
                                <tbody>
                                    {items.map((employee) => (
                                        <tr key={employee.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {employee.employee_id}

                                            </td>
                                            <td
                                                td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {employee.person.firstname}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {employee.designation}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {employee.salary}
                                            </td>


                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {`${('0' + new Date(employee.created_at).getDate()).slice(-2)}-${('0' + new Date(employee.created_at).getMonth() + 1).slice(-2)}-${new Date(employee.created_at).getFullYear()}`}{' '}
                                                at{' '}
                                                {`${('0' + new Date(employee.created_at).getHours() % 12).slice(-2) ? ('0' + new Date(employee.created_at).getHours() % 12).slice(-2) : 12}:${('0' + new Date(employee.created_at).getMinutes()).slice(-2)} ${new Date(employee.created_at).getHours() >= 12 ? 'PM' : 'AM'}`}

                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <NavLink to={`update/${employee.employee_id}`} className="list-none bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 rounded" >
                                                    Edit
                                                </NavLink>
                                                <button className="list-none bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-2 rounded" onClick={() => deletefn(employee.employee_id)}>
                                                    Delete
                                                </button>



                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={4}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />

        </>

    );
};

export default Employee;