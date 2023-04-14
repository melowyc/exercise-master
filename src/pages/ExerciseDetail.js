import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Detail from "../components/ExerciseDetail/Detail";
import ExerciseVideos from "../components/ExerciseDetail/ExerciseVideos";
import SimilarExercise from "../components/ExerciseDetail/SimilarExercise.js";
import { exerciseOptions, fetchData, youtubeOptions } from "../utils/fetchData";
const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscle, setTargetMuscle] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExerciseData = async () => {
      const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com";

      const exerciseDetailData = await fetchData(
        `${exerciseDbUrl}/exercises/exercise/${id}`,
        exerciseOptions
      );
      setExerciseDetail(exerciseDetailData);

      const exerciseVideosData = await fetchData(
        `${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`,
        youtubeOptions
      );
      setExerciseVideos(exerciseVideosData.contents);

      const targetMuscleData = await fetchData(
        `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
        exerciseOptions
      );
      setTargetMuscle(targetMuscleData);

      const equipmentData = await fetchData(
        `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
        exerciseOptions
      );
      setEquipment(equipmentData);
    };

    fetchExerciseData();
  }, [id]);
  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercise muscle={targetMuscle} equipment={equipment} />
    </Box>
  );
};

export default ExerciseDetail;
