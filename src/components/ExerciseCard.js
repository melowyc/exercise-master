import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ExerciseCard = ({ exercise, 
                        loginStatus,
                        addLikedExercise, 
                        removeLikedExercise, 
                        liked }) => {

    const [like, setLike] = useState(liked);
    /*
    once the user click the like button,
    if user liked the current exercise:
        ask use if you want to unlike the exercise
    else if user unliked the current exercise
        store the exercise.id to likedExerciseIdList
        show the liked exercise in profile page
    */
    const handleLike = async () => {
        // if liked:
        // 1. frontend show a hint to unlike
        // 2. call removeLikedExercise (done)
        if (like) {
            removeLikedExercise(exercise.id)
        } else {
            // if unliked:
            // call addLikedExercise (done)
            addLikedExercise(exercise.id, exercise.bodyPart, exercise.name)
        }
        setLike(!like);
    };

    return(
    <div>
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
        <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
        <Stack direction="row">
            <Button sx={{ ml: '21px', color: '#fff', background: '#FFA9A9', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
                {exercise.bodyPart}
            </Button>
            <Button sx={{ ml: '21px', color: '#fff', background: '#FCC757', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
                {exercise.target}
            </Button>
        </Stack>
        <Typography ml="21px" color="#000" fontWeight="bold" sx={{ fontSize: { lg: '24px', xs: '20px' } }} mt="11px" pb="10px" textTransform="capitalize">
            {exercise.name}
        </Typography>
    </Link>

    {loginStatus === "true" ? 
        <>
            <Button
                sx={{ ml: '21px', color: 'red', fontSize: "30px", textTransform: 'capitalize' }}
                onClick={handleLike}
            >
                {like && <AiFillHeart />}
                {!like && <AiOutlineHeart />}
            </Button>
        </>
        :
        <></>
    }
    
    </div>
    );
};

export default ExerciseCard;
