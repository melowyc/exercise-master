import React from 'react'
import PersonalInfo from './PersonalInfo/index'
import '../App.css'
const ProfileSidebar = ({login, country}) => {
  return (
    <PersonalInfo className={`page-bg`} login={login} country_={country}/>
  )
}

export default ProfileSidebar