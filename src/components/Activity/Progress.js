/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import ProgressBar from './ProgressBar'
import {CategoryToId} from '../PersonalPlan/PlanConfiguration'
import { useSelector } from 'react-redux'
const Progress = () => {
    const bgColors = ["#195ef5", "#f7c144", "#ef6c00", "#5db873"]
    const targetArray = [2, 3, 5]
    const progress = useSelector(state => state.progress)
    
    return (
        <div className={`rounded-4 p-3 pt-0 mt-3 activity`}>
            {progress.map((item, idx) => {
                const nextTarget = targetArray.filter(a => a > item)
                const target = nextTarget.length === 0 ? "Destination" : nextTarget[0]
                return (
                    <ProgressBar key={idx} 
                                bgcolor={bgColors[idx]} 
                                percent={target === "Destination" ? 100 : (item / target) * 100} 
                                completed={item} 
                                target={target}
                                category={Object.keys(CategoryToId)[idx]} />
                )
            })}
        </div>  
    )
}

export default Progress