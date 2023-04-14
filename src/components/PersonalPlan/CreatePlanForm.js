import React, { useState } from 'react'
import {Dropdown} from 'semantic-ui-react';
import {TYPES, HOURS, MINUTES, AMPM} from './PlanConfiguration';
import './index.css'
const CreatePlanForm = ({
                            handleSubmit,
                            handleCancel}
) => {
    const [type, setType] = useState("");
    const [location, setLocation] = useState("");
    const [startHour, setStartHour] = useState("");
    const [startMinute, setStartMinute] = useState("");
    const [startAPM, setStartAPM] = useState("");
    const [endHour, setEndHour] = useState("");
    const [endMinute, setEndMinute] = useState("");
    const [endAPM, setEndAPM] = useState("");
    const [error, setError] = useState(null);
    const handleReset = () => {
        setType("")
        setLocation("")
        setStartHour("")
        setStartMinute("")
        setStartAPM("")
        setEndHour("")
        setEndMinute("")
        setEndAPM("")
    }
    const handleSubmitForm = (event,
                              category,
                              startTime,
                              startAPM,
                              endTime,
                              endAPM) => {

        if (category === "" || category === undefined || startTime.trim() === ':' || endTime.trim() === ':' || startAPM === '' || endAPM === '') {
            event.preventDefault()
            setError("Missing Information for New Plan")
        } else {
            // Submit form
            handleSubmit(event, category, startTime + ' ' + startAPM, endTime + ' ' + endAPM)
        }

    }
    return (
        <div className={'m-4'}>
            <form onSubmit={
                (event) =>
                    handleSubmitForm(event,
                                type,
                                startHour + ":" + startMinute,
                                startAPM.toLowerCase(),
                                endHour + ":" + endMinute,
                                endAPM.toLowerCase())
            }>
                {error && <div className={`col d-flex align-items-center justify-content-center`}>
                    <h5 className={'text-danger'}>{error}</h5>
                </div>}
                <label htmlFor="type">
                    <div className={`mb-1`}>Category:</div>
                    <Dropdown
                        className={`d-flex`}
                        placeholder="Select Category*"
                        fluid
                        required
                        selection
                        clearable
                        options={TYPES}
                        value={type}
                        id="type"
                        onChange={(e, item) => {
                            setType(item.value);
                        }}
                        style={{width:`150px`}}
                    ></Dropdown>
                </label>

                <label htmlFor="location" className={`d-block mt-3`}>
                    <div className={`mb-1`}>Location:</div>

                    <input
                        className="form-control control-input"
                        id="location"
                        name="location"
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </label>

                <label htmlFor="startHour" className={`d-block mt-3`}>
                    <div className={`mb-1`}>Start Time:</div>
                    <div className={`row`}>
                        <div className={`col`}>
                            <Dropdown
                                className={`d-flex`}
                                placeholder="Start Hour*"
                                fluid
                                required
                                selection
                                clearable
                                options={HOURS}
                                value={startHour}
                                id="startHour"
                                onChange={(e, item) => {
                                    setStartHour(item.value);
                                }}
                            ></Dropdown>
                        </div>
                        <div className={`col`}>
                            <Dropdown
                                className={`d-flex`}
                                placeholder="Start Minute*"
                                fluid
                                required
                                selection
                                clearable
                                options={MINUTES}
                                value={startMinute}
                                id="startMinute"
                                onChange={(e, item) => {
                                    setStartMinute(item.value);
                                }}
                            ></Dropdown>
                        </div>
                        <div className={`col`}>
                            <Dropdown
                                className={`d-flex`}
                                placeholder="AM/PM*"
                                fluid
                                required
                                selection
                                clearable
                                options={AMPM}
                                value={startAPM}
                                id="startAmPm"
                                onChange={(e, item) => {
                                    setStartAPM(item.value);
                                }}
                            ></Dropdown>
                        </div>
                    </div>

                </label>

                <label htmlFor="endHour" className={`d-block mt-3`}>
                    <div className={`mb-1`}>End Time:</div>

                    <div className={`row`}>
                        <div className={`col`}>
                            <Dropdown
                                className={`d-flex`}
                                placeholder="End Hour*"
                                fluid
                                required
                                selection
                                clearable
                                options={HOURS}
                                value={endHour}
                                id="endHour"
                                onChange={(e, item) => {
                                    setEndHour(item.value);
                                }}
                            ></Dropdown>
                        </div>
                        <div className={`col`}>
                            <Dropdown
                                className={`d-flex`}
                                style={{height:`10px`}}
                                placeholder="End Minute*"
                                fluid
                                required
                                selection
                                clearable
                                options={MINUTES}
                                value={endMinute}
                                id="endMinute"
                                onChange={(e, item) => {
                                    setEndMinute(item.value);
                                }}
                            ></Dropdown>
                        </div>
                        <div className={`col`}>
                            <Dropdown
                                className={`d-flex`}
                                placeholder="AM/PM*"
                                fluid
                                required
                                selection
                                clearable
                                options={AMPM}
                                value={endAPM}
                                id="endAmPm"
                                onChange={(e, item) => {
                                    setEndAPM(item.value);
                                }}
                            ></Dropdown>
                        </div>
                    </div>

                </label>

                <div className={'d-flex justify-content-center'}>
                    <div className='mt-4'>
                        <button type="submit" className={`btn btn-primary mx-2`}>Submit</button>
                        <button type="reset" className={`btn btn-primary mx-2`} onClick={handleReset}>Reset</button>
                        <button type="cancel" className={`btn btn-primary mx-2`} onClick={handleCancel}>Cancel</button>
                    </div>
                </div>


            </form>
        </div>

    )
}

export default CreatePlanForm