/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './index.css'
const ProgressBar = ({bgcolor, percent, completed, target, category}) => {

  const filler = {
    height: '100%',
    width: `${percent}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  return (

      <div>
        <div className={`mb-3 row d-flex`}>
          <div className={`d-flex justify-content-start col mt-3`}>
            <span className={`fw-bold`}>{category}</span>
          </div>
          <div className={`d-none d-md-block col-8 mt-3`}>
            <span className={`fw-bold float-end`}>{target === "Destination" ? `You've Achieved` : `Next Target`}: {target}</span>
          </div>
          
        </div>
        <div className={"containerStyle"}>
          <div style={filler}>
            <span className={`labels me-2 ms-2`}>{`${completed}`}</span>
          </div>
        </div>
      </div>
  );
};

export default ProgressBar;