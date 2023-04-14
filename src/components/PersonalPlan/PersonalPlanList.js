import React from 'react'
import PersonalPlanItem from "./PersonalPlanItem";
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { useSelector } from 'react-redux';

const PersonalPlanList = ({
    handleRemove,
    handleSolvePlan
}) => {
    const plans = useSelector(state => state.plans);
    return (
            <ScrollMenu>
                {plans.map((plan) => (
                    <PersonalPlanItem key={plan.id} 
                                        plan={plan} 
                                        handleRemove={handleRemove} 
                                        handleSolve={handleSolvePlan}
                                        style={{ display: 'inline-block'}}/>
                ))}
            </ScrollMenu>

    )
}

export default PersonalPlanList
