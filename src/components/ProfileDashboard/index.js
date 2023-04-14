/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./index.css";
import PersonalPlan from "../PersonalPlan";
import LikedExercise from "../LikedExercise";
import Activity from "../Activity";
import {FiEdit} from "react-icons/fi";
import {Button} from "@mui/material";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import {planProgress} from '../../utils/APIRoutes';
import { useSelector, useDispatch } from 'react-redux';
import { initializeProgress } from '../../utils/progress-reducer';

const ProfileDashboard = ({login}) => {
    const profile = useSelector(state => state.profile)
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    const dispatch = useDispatch();
    const monthList = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',' November', 'December']
    const [upload, setUpload] = useState(false)
    const [file, setFile] = useState(profile.banner)

    const CategoryToId = {"RUNNING": 0 , "BOXING": 1, "YOGA": 2, "SWIMMING": 3 }
    const progress = new Array(4).fill(0)

    const getProgressFromDB = async () => {
        try {
            const response = await fetch(planProgress + '/' + profile.username, { mode: 'cors' });
            const data = await response.json();
            console.log("progress data: ", data)
            return data;

        } catch (e) {
            console.log(e);
            return null;
        }
    }

    const getProgress = async () => {
        const progresses = await getProgressFromDB();
        let updatedProgress = [...progress]
        for (let i = 0; i < progresses.length; i++) {
            const id = CategoryToId[progresses[i].category]
            updatedProgress[id] += 1
        }
        dispatch(initializeProgress(updatedProgress))
    };

  const hiddenFileInput = React.useRef(null);
  const handleChange = (event) => {
    event.preventDefault();
    setFile(URL.createObjectURL(event.target.files[0]));
  };
  const handleCancel = () => {
    setFile("/images/profile-banner.jpeg");
    setUpload(false);
  };
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  useEffect(() => {
    getProgress();
  }, []);

  return (
    <div className={"p-4"}>
      <div className={`row`}>
        <div className={`col d-flex justify-content-start`}>
          <h3 className={"pt-2 pb-2"}>Dashboard</h3>
        </div>
        <div className={`col d-flex justify-content-end`}>
          <h3 className={"pt-2 pb-2"}>
            {date} {monthList[month]} {year}
          </h3>
        </div>
      </div>

      <div className={`position-relative`}>
        <img src={file} className={`banner`} />
        {login && (
          <div className={`position-absolute banner-text`}>
            <h3 className={`text-white`}>
              Hello {profile.username.toUpperCase()}
            </h3>
            <h1 className={`text-white`}>Welcome in Dashboard</h1>
          </div>
        )}
        {!login && (
          <div className={`position-absolute banner-text`}>
            <h3 className={`text-white`}>Hello</h3>
            <h1 className={`text-white`}>Please Login!</h1>
          </div>
        )}

        {/* {login && !upload && (
          <FiEdit
            className={`position-absolute bottom-0`}
            onClick={() => setUpload(true)}
          />
        )} */}
      </div>

      {upload && (
        <div className={`mt-2`}>
          <div className={`d-flex justify-content-center`}>
            <Button
              variant="contained"
              onClick={handleClick}
              startIcon={<MdOutlineDriveFolderUpload />}
            >
              Upload a banner
            </Button>
            <input
              id="upload-banner"
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </div>

          <div className={`d-flex justify-content-center mt-2`}>
            <button
              className={"btn btn-warning mx-2"}
              onClick={() => setUpload(false)}
            >
              Confirm
            </button>
            <button
              className={"btn btn-danger mx-2"}
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <PersonalPlan login={login}/>
      <div className={`row mt-4`}>
          <div className={'col'}>
              <LikedExercise/>
          </div>
          <div className={'col'}>
              <Activity/>
          </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
