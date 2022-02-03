import React, {useState, useEffect, useRef} from 'react';
import Navbar from "../Navbar/Navbar";
import { useNavigate, useParams } from 'react-router-dom';

function ConvertLead() {
    const [plans, setPlans] = useState([]);
    const [person, setPerson] = useState(0);
    const planRef = useRef();
    const { id } = useParams();

    useEffect(() => {
        const getPlans = async () => {
            const demo = await fetch(
                `http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/plans`
            );
            const datademo = await demo.json();
            setPlans(datademo);
            const getLead = await fetch(
                `http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/leads/${id}`
            );
            const leads = await getLead.json();
            setPerson(leads.person.person_id);
        };
        getPlans();
    }, [id]);

    async function submitHandler(event) {
        event.preventDefault();

        const opportunity = {
            lead_id: +id,
            person_id: person,
            plan_id: +planRef.current.value
        }

        console.log(opportunity);

        const opportunities = await fetch(`http://localhost:8012/yii/crmfinalyii/frontend/web/index.php/leads/convert`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(opportunity)
        });

        // navigate('/leads');

    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-col justify-center items-center">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskname">
                            Select Plan
                        </label>
                        <select ref={planRef}>
                            {plans.map((plan) => (
                                <option key={plan.plan_id} value={plan.plan_id}>{plan.plan_name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ConvertLead;
