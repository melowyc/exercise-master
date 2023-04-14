/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";

import { useSelector } from "react-redux";

import { exerciseOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';
import Loader from './Loader';
import {profileRoute} from "../utils/APIRoutes";


const Exercises = ({ exercises, setExercises, bodyPart }) => {
  // const { currentUser } = useSelector((state) => state.users);
  const [loginStatus, setLoginStatus] = useState("true");
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(6);
  const [likes, setLikes] = useState([]);
  const username = localStorage.getItem("username");

  const fetchLikedData = async (username) => {
      try {
            const response = await fetch(profileRoute + '/' + username, { mode: 'cors' });
            const data = await response.json();
            setLikes(data.likes);
        } catch (e) {
            console.log(e);
        }
  };

  const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === "all") {
        exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions
        );
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
      }

      setExercises(exercisesData);
  };

  const addLikedExercise = async(exerciseId, bodyPart, name) => {
      try {
            const newLikes = [...likes, 
                                    {
                                      exerciseId: exerciseId, 
                                      bodyPart: bodyPart, 
                                      name: name
                                    }];
            setLikes(newLikes);
            const params = {
                method: 'POST',
                body: JSON.stringify(
                  {
                    username: username, 
                    likes: newLikes}),
                headers: { 'Content-Type': 'application/json' },
            }

            await fetch(profileRoute + '/' + username, params);
        } catch (e) {
            console.log(e);
        }
  };

  const removeLikedExercise = async(exerciseId) => {
    try {
          const newLikes = likes.filter((val, id) => val.exerciseId !== exerciseId);
          setLikes(newLikes);
          const params = {
              method: 'POST',
              body: JSON.stringify({username: username, likes: newLikes}),
              headers: { 'Content-Type': 'application/json' },
          }

          await fetch(profileRoute + '/' + username, params);
        } catch (e) {
            console.log(e);
        }
  }

  useEffect(() => {
    fetchExercisesData();
    if (username != null) {
      fetchLikedData(username);
    } else {
      // handle not login
    }
  }, [bodyPart]);

  useEffect ( () => {
    if (!username) {
      setLoginStatus("false");
    }

  }, [localStorage.getItem("username")]);

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (event, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  if (!currentExercises.length) return <Loader />;

  return (
    <Box id="exercises" sx={{ mt: { lg: "109px" } }} mt="50px" p="20px">
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="46px"
      >
        Exercises Results
      </Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: "107px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercises.map((exercise, idx) => (
          <ExerciseCard key={idx + (currentPage - 1) * exercisesPerPage} 
                        exercise={exercise} 
                        loginStatus={loginStatus}
                        addLikedExercise={addLikedExercise} 
                        removeLikedExercise={removeLikedExercise}
                        liked={(likes.filter((val, id) => val.exerciseId === exercise.id)).length > 0}/>
        ))}
      </Stack>
      <Stack sx={{ mt: { lg: "114px", xs: "70px" } }} alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
