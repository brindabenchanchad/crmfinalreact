import React from "react";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { NavLink, useNavigate } from "react-router-dom";

const Plan = () => {
    const history = useNavigate();
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    let limit = 5;

    useEffect(() => {
        const getComments = async () => {
            const demo = await fetch(
                `http://localhost/yii/crmfinal/frontend/web/index.php/plans`
            );
            const datademo = await demo.json();
            const total = datademo.length;
            const res = await fetch(
                `http://localhost/yii/crmfinal/frontend/web/index.php/plans?per-page=${limit}&page=1`
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
            `http://localhost/yii/crmfinal/frontend/web/index.php/plans?per-page=${limit}&page=${currentPage}`
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
            const planData = {
                is_deleted: 1,
            }
            await fetch(`http://localhost/yii/crmfinal/frontend/web/index.php/plans/${id}`, {
                method: 'PUT',
                body: JSON.stringify(planData),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        }
        else {
            alert('Problem in deletion');
        }
        window.location.reload(true);
    }
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
                                        <td colSpan="4" className="font-bold text-2xl text-center text-white px-6 py-4">Plan</td>
                                        <td colSpan="3" className="font-bold text-2xl text-center text-white px-6 py-4">
                                            <button className="float-right bg-green-300 hover:bg-green-500 text-white font-bold rounded">
                                                <NavLink to="/plan/add" className="no-underline text-white"><li className="list-none px-3 py-2 rounded-md ">+ Add Plan</li></NavLink>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>

                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Plan Name
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Plan Description
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Plan Duration
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Plan Price
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Is Deleted
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Create Date
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                            Action
                                        </th>
                                    </tr>
                                    {/* <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="plan Name"  id="plan_name" />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="plan Description" id="plan_description" />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <input type="text" className="shadow appearance-none border-4 border-slate-400 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="plan Date"  id="created_at" />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                           
                                        </td>
                                    </tr> */}
                                </thead>
                                <tbody>
                                    {items.map((plan) => (
                                        <tr key={plan.plan_id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            
                                            <td
                                                td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {plan.plan_name}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {plan.plan_description}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {plan.plan_duration}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {plan.plan_price}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {plan.is_deleted === 1 && <span className="text-red-500">Deleted</span>}
                                                {plan.is_deleted === 0 && <span className="text-green-500">Not Deleted</span>}
                                                
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {`${('0' + new Date(plan.created_at).getDate()).slice(-2)}-${('0' + new Date(plan.created_at).getMonth() + 1).slice(-2)}-${new Date(plan.created_at).getFullYear()}`}{' '}
                                                at{' '}
                                                {`${('0' + new Date(plan.created_at).getHours() % 12).slice(-2) ? ('0' + new Date(plan.created_at).getHours() % 12).slice(-2) : 12}:${('0' + new Date(plan.created_at).getMinutes()).slice(-2)} ${new Date(plan.created_at).getHours() >= 12 ? 'PM' : 'AM'}`}

                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {
                                                    plan.is_deleted && <span className="text-green-700 text-xl">
                                                    No Action Needed
                                                    </span>
                                                }
                                                {
                                                    !plan.is_deleted && <button className="list-none bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-2 rounded" onClick={() => deletefn(plan.plan_id)}>
                                                    - Delete
                                                </button>
                                                }
                                                
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

export default Plan;