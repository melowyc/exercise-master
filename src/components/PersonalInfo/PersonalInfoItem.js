/* eslint-disable jsx-a11y/alt-text */
import React, {useState} from 'react'
import './index.css'
import { useSelector } from 'react-redux';

const PersonalInfoItem = ({info, edit, setProfile}) => {
    const profile = useSelector(state => state.profile)
    const key = (info.columnName.charAt(0).toLowerCase() + info.columnName.slice(1)).split(' ').join('')
    const [value, setValue] = useState(profile[key])
    let updatedValue = {}

  const handleChange = (e) => {
    updatedValue = { [key]: e.target.value };
    setValue(e.target.value);
    setProfile((profile) => ({ ...profile, ...updatedValue }));
  };

  return (
    <div className={`row sidebar-item p-3 ms-2 me-2`}>
      <div className={`col-2 d-flex align-items-center`}>
        <img
          className={`rounded-circle`}
          src={`./images/icons/${info.image}`}
          width={`30px`}
          height={`30px`}
        />
      </div>
      <div className={`col-5 d-flex align-items-center`}>
        <h4>{info.columnName} :</h4>
      </div>
      <div className={`col fw-bold d-flex align-items-center ps-0`}>
        {!edit && profile[key]}
        {edit && (
          <input
            className="form-control control-input me-2"
            id={info.id}
            name={info.columnName}
            type="text"
            placeholder={info.columnName}
            value={value}
            onChange={(e) => handleChange(e)}
          />
        )}{" "}
        {info.unit}
      </div>
    </div>
  );
};

export default PersonalInfoItem;
