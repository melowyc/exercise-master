import React from 'react';
import './index.css';
import {BsThreeDots} from "react-icons/bs";
import { Link } from "react-router-dom";

const LikedItem = ({like}) => {
    return (
        <div className={`row w-100 p-2 m-0`}>
            <div className={`col-3 col-lg-4 text-dark d-none d-md-flex justify-content-center align-items-center bg-warning rounded-pill`}>
                <h4 className={` text-nowrap`}>{like.bodyPart[0].toUpperCase() + like.bodyPart.slice(1)}</h4>
            </div>
            <div className={`col text-dark d-flex justify-content-start align-items-center`}>
                <h4 className={`fw-normal`}>{like.name[0].toUpperCase() + like.name.slice(1)}</h4>
            </div>
            <div className={`col-1 p-0 text-primary d-flex justify-content-center align-items-center`}>
                <Link to={`/exercise/${like.exerciseId}`}>
                    <BsThreeDots size={20}/>
                </Link>
                
            </div>
        </div>
    )
}

export default LikedItem;