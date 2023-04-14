import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import PersonalPlanList from './PersonalPlanList'
import {AiFillPlusCircle} from 'react-icons/ai'
import './index.css'
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from '@mui/material/Dialog';
import CreatePlanForm from "./CreatePlanForm";
import {planRoute, getPlanRoute, planProgress} from '../../utils/APIRoutes';
import {CategoryToId} from "./PlanConfiguration";
import { useDispatch, useSelector } from 'react-redux';
import { initializePlan, updatePlan, deletePlan } from '../../utils/plan-reducer';
import { updateProgress } from '../../utils/progress-reducer';

const PersonalPlan = ({login}) => {
    const username = localStorage.getItem('username');
    const dispatch = useDispatch();
    const plans = useSelector(state => state.plans)
    const [isOpen, setIsOpen] = useState(false)

    const getAllPlans = async (username) => {
        try {
            const response = await fetch(getPlanRoute + '/' + username, { mode: 'cors' });
            const data = await response.json();
            dispatch(initializePlan(data))
        } catch (e) {
            console.log(e);
        }
    }

    const insertToDB = async (data, path) => {
        try {
            const params = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            }

            await fetch(path, params);
        } catch (e) {
            console.log(e);
        }
        
    }

    const insertNewPlan = (plan) => {
        insertToDB(plan, planRoute + "/" + plan.id)
        dispatch(updatePlan(plan))
    }

    const insertNewProgress = (data) => {
        insertToDB(data, planProgress + "/" + data.id)
        const idx = CategoryToId[data.category]
        dispatch(updateProgress(idx))
    }

    const handleCancel = (event) => {
        event.preventDefault();
        setIsOpen(false);
    }

    const handleAddPlan = () => {
        setIsOpen(true);
    }

    const handleSubmit = (event, category, startTime, endTime) => {
        event.preventDefault();
        //change status
        setIsOpen(false);
        const newPlan = {
            id: Date.now(),
            username: username,
            category: category.toUpperCase(),
            location: event.target.elements.location.value,
            startTime: startTime,
            endTime: endTime
        }
        insertNewPlan(newPlan)
    }

    const handleRemovePlan = async (id) => {
        try {
            await fetch(getPlanRoute + '/' + username + '/' + id, { mode: 'cors', method: 'DELETE' });
            dispatch(deletePlan(id))
        } catch (e) {
            console.log(e);
        }
    }

    const handleSolvePlan = async (id) => {
        try {
            const plan = plans.filter((p) => id === p.id)[0]
            const data = {
                id: Date.now(),
                username: plan.username,
                category: plan.category
            }
            insertNewProgress(data)
            handleRemovePlan(id)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllPlans(localStorage.getItem('username'));
    }, [localStorage.getItem('username')]);

    return (
        <>
            <div className={'row mt-4'}>
                <div className={'col d-flex align-items-center justify-content-start mb-2'}>
                    <h5>Today's Plan</h5>
                </div>
                {login &&
                    <div className={'col d-flex align-items-center justify-content-end'}>
                        <div className={`d-flex align-items-center`} onClick={handleAddPlan}
                            onMouseOver={({target})=>target.style.color="orange"}
                            onMouseOut={({target})=>target.style.color="black"}>
                            <AiFillPlusCircle/>
                            <h5 className={`d-inline m-0 ms-2`}>Add My Plan</h5>
                        </div>
                    </div>
                }
                
            </div>
            {login && plans.length === 0 &&
                <div className={`d-flex justify-content-center align-items-center blank-plan m-4`}>
                    <div>Start to add today's plan!</div>
                </div>
            }
            {login && plans.length > 0 &&
                <PersonalPlanList handleRemove={handleRemovePlan}
                                  handleSolvePlan={handleSolvePlan}
                />
            }
            {!login && 
                <div className={`d-flex justify-content-center align-items-center`}>
                    <div className={`d-flex justify-content-center align-items-center blank-plan m-4 login-hint`}>
                        <div>
                            Please &nbsp;
                            <Link to="/login">
                                Login &nbsp;
                            </Link>
                            First!
                        </div>
                    </div>
                </div>
                
            }
            <Dialog open={isOpen} onClose={() => {setIsOpen(false)}} className="dialog_box">
                <div style={{width: 500}}>
                    <DialogTitle>{"Create a New Plan"}</DialogTitle>
                    <CreatePlanForm handleSubmit={handleSubmit} handleCancel={handleCancel}/>
                </div>
            </Dialog>
        </>


    )
}

export default PersonalPlan