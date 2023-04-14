/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PersonalData from './PersonalData';
import PersonalInfoItem from './PersonalInfoItem';
import './index.css'
import {FiEdit} from "react-icons/fi";
import {Button} from "@mui/material";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import {profileRoute, getUser} from "../../utils/APIRoutes";
import {useDispatch, useSelector} from "react-redux";
import { updateProfile } from '../../utils/profile-reducer';

const PersonalInfo = ({login, country_}) => {
    const dispatch = useDispatch()
    const profile = useSelector(state => state.profile)
    const [profile_, setProfile_] = useState(profile)
    const [edit, setEdit] = useState(false)
    const imgPath = "/images/avatar/profile.png"
    const [country, setCountry] = useState(country_)
    const [avatar, setAvatar] = useState(imgPath)

    const handleCancel = () => {
        setCountry(country_)
        setEdit(false)
    }

    const handleSubmit = async () => {
        dispatch(updateProfile(profile_))
        // write to userProfile collection
        const params = {
            method: 'POST',
            body: JSON.stringify(profile_),
            headers: { 'Content-Type': 'application/json' },
        }

    const updateResponse = await fetch(
      profileRoute + "/" + profile.username,
      params
    );
    await updateResponse.json();

    // update country
    if (country !== country_) {
      // write to user collection
      const paramsCountry = {
        method: "POST",
        body: JSON.stringify({ username: profile.username, country: country }),
        headers: { "Content-Type": "application/json" },
      };
      const updateResponse = await fetch(
        getUser + "/" + profile.username,
        paramsCountry
      );
      await updateResponse.json();
    }
    setEdit(false);
  };

  const handleChange = (event) => {
    setAvatar(URL.createObjectURL(event.target.files[0]));
  };

  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div className={`sidebar`}>
      {login && (
        <div
          className={`d-flex justify-content-end align-items-center`}
          onClick={() => setEdit(true)}
        >
          <FiEdit className={`${edit ? "text-color" : ""}`} />
          <div className={`m-3 ms-1 ${edit ? "text-color" : ""}`}>Edit</div>
        </div>
      )}

      <div>
        <div className={`d-flex justify-content-center`}>
            <img
              className={`rounded-circle`}
              src={avatar}
              width={"100px"}
              height={`100px`}
            />
          </div>
          {login && (
            <div className={`d-flex justify-content-center mt-2`}>
              {profile && <h2>{profile.username}</h2>}
            </div>
          )}
          {login && (
            <div className={`d-flex justify-content-center`}>
              {!edit && profile && <h3>{country}</h3>}
              {edit && (
                <input
                  className="form-control mb-2 w-50"
                  id="country"
                  name="country"
                  type="text"
                  placeholder={"Country"}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              )}
            </div>
          )}
          {login && profile && <div className={`p-4 sidebar-card`}>
              {
                  PersonalData.map(data => {
                      return (
                          <PersonalInfoItem key={data._id}
                                            info={data}
                                            edit={edit}
                                            setProfile={setProfile_}/>
                      )
                  })
              }
          </div>}
          {!login && 
            <div className={`sidebar-no-login`}>
                <div className={`p-4 sidebar-card-guest`}>
                    Please &nbsp;
                    <Link to="/login">
                        Login &nbsp;
                    </Link>
                    to Set Your Profile!
                </div>
            </div>
          }
          
      </div>
      

      {edit && (
        <div className={`d-flex justify-content-center mt-2`}>
          <div className={`btn btn-warning me-2`} onClick={handleSubmit}>
            Submit
          </div>
          <div className={`btn btn-danger ms-2`} onClick={handleCancel}>
            Cancel
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
