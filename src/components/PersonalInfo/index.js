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
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import storage from '../../utils/firebaseConfig';

const defaultFile = "/images/avatar/profile.png";
const PersonalInfo = ({login, country_}) => {
    const dispatch = useDispatch()
    const profile = useSelector(state => state.profile)
    const [profile_, setProfile_] = useState(profile)
    const [edit, setEdit] = useState(false)
    const [country, setCountry] = useState(country_)
    const [url, setUrl] = useState(profile.avatar)
    const [avatarFile, setAvatarFile] = useState();

    const handleCancel = () => {
        setCountry(country_)
        setUrl(profile.avatar)
        setProfile_({...profile_, avatar: profile.avatar});
        setEdit(false)
    }

    const writeToDB = async (url) => {
      if (url !== "") {
        dispatch(updateProfile({...profile_, avatar: url}));
      } else {
        dispatch(updateProfile(profile_));
      }
      const newProfile = url === "" ? profile_ : {...profile_, avatar: url};
        // write to userProfile collection
      const params = {
          method: 'POST',
          body: JSON.stringify(newProfile),
          headers: { 'Content-Type': 'application/json' },
      }

      const updateResponse = await fetch(
          profileRoute + "/" + profile.username,
          params
      );
      await updateResponse.json();
    }

    const removeImageFromFirebase = (url) => {
        if (url === defaultFile) return;
        const deleteRef = ref(storage, url);

        deleteObject(deleteRef).then(function () {
            // File deleted successfully
            console.log("File Deleted")
        }).catch(function (e) {
            console.log("File not exist")
        });
    }

    const handleUploadFirebase = (file) => {
        if (!file) {
            writeToDB("");
            return;
        }
        removeImageFromFirebase(profile.avatar);
        const storageRef = ref(storage, `/files/${file.name}`);
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  console.log(url)
                    setUrl(url);
                    setProfile_({...profile, avatar: url});
                    writeToDB(url);
                });
            }
        );
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      // update profile into firebase
      if (url !== profile.avatar) {
          handleUploadFirebase(avatarFile)
      } else {
          writeToDB("")
      }
      
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
    event.preventDefault();
    if (event.target.files.length === 0) {
      return;
    }
    const url = URL.createObjectURL(event.target.files[0]);
    setUrl(url);
    console.log("file changed: ", event.target.files[0])
    setAvatarFile(event.target.files[0]);
    setProfile_({...profile_, avatar: url});
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
            src={url}
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
              <div className={`mt-2`}>
                <div className={`d-flex justify-content-center`}>
                  <Button
                    variant="contained"
                    onClick={handleClick}
                    startIcon={<MdOutlineDriveFolderUpload />}
                  >
                    Upload a Profile
                  </Button>
                  <input
                    id="upload-banner"
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                </div>
                <label
                  className={`d-flex justify-content-center align-items-center mt-2 mb-2`}
                >
                  Country
                  <input
                    className="form-control w-50 d-inline ms-2"
                    id="country"
                    name="country"
                    type="text"
                    placeholder={"Country"}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </label>
              </div>
            )}
          </div>
        )}
        {login && profile && (
          <div className={`p-4 sidebar-card mb-2`}>
            {PersonalData.map((data) => {
              return (
                <PersonalInfoItem
                  key={data._id}
                  info={data}
                  edit={edit}
                  setProfile={setProfile_}
                />
              );
            })}
          </div>
        )}
        {!login && (
          <div className={`sidebar-no-login`}>
            <div className={`p-4 sidebar-card-guest`}>
              Please &nbsp;
              <Link to="/login">Login &nbsp;</Link>
              to Set Your Profile!
            </div>
          </div>
        )}
      </div>

      {edit && (
        <div className={`d-flex justify-content-center mb-2`}>
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
