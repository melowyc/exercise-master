/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { MdRemoveCircle } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import { IMAGES } from "./PlanConfiguration";
import "./index.css";
const PersonalPlanItem = ({ plan, handleRemove, handleSolve }) => {
  const handleToDelete = () => {
    handleRemove(plan.id);
  };

  const handleToSolve = () => {
    handleSolve(plan.id);
  };

  return (
    <div className={`position-relative m-4`}>
      <div
        className={`plan-card d-flex align-items-center justify-content-center rounded-4`}
      >
        <div className={`row`}>
          <div
            className={`col-3 d-flex align-items-center justify-content-center`}
          >
            <img src={IMAGES[plan.category.toLowerCase()]} width={`50px`} />
          </div>
          <div className={`col`}>
            <div className={`fw-bold mb-1`}>{plan.category}</div>
            <div className={`mb-1`}>{plan.location}</div>
            <div className={`fw-bold`}>
              {plan.startTime} - {plan.endTime}
            </div>
          </div>
        </div>
      </div>
      <div className={`position-absolute`} style={{ right: `0px`, top: `0px` }}>
        <MdRemoveCircle
          size={30}
          color={"orange"}
          onClick={() => handleToDelete()}
        />
      </div>
      <div
        className={`position-absolute`}
        style={{ right: `30px`, top: `0px` }}
      >
        <AiFillCheckCircle
          size={30}
          color={"green"}
          onClick={() => handleToSolve()}
        />
      </div>
    </div>
  );
};

export default PersonalPlanItem;
