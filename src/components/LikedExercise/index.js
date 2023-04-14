import React from 'react'
import './index.css'
import LikedItem from "./LikedItem";
import { useSelector } from 'react-redux';

const LikedExercise = () => {
    const {likes} = useSelector(state => state.profile);

    return (
        <div>
            <div>
                <h5>Exercises Liked</h5>
            </div>
            <div className={`rounded-4 mt-3 liked`} style={{backgroundColor: 'white'}}>
                <div className={`row w-100 m-0 p-2`}  >
                    <div className={`col-3 col-lg-4 d-none d-md-block d-flex justify-content-start rounded-pill bg-primary text-white`}>
                        <h4 className={`pt-2 pb-2`}>Category</h4>
                    </div>
                    <div className={`col d-flex justify-content-start bg-warning rounded-pill`}>
                        <h4 className={`pt-2 pb-2`}>Name</h4>
                    </div>
                    <div className={`col-1 p-0`}>
                        
                    </div>
                </div>
                {likes.map((like) => (
                        <LikedItem key={like.exerciseId} like={like}/>
                    ))}
            </div>

        </div>
    )
}

export default LikedExercise