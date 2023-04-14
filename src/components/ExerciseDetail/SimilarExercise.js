import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import HorizontalScrollbar from "../HorizontalScrollbar";
import Loader from "../Loader";
const SimiliarExercise = ({ muscle, equipment }) => {
  return (
    <Box sx={{ mt: { lg: "100px", xs: "0px" } }}>
      <Typography
        variant="h3"
        mb={5}
        sx={{ fontSize: { lg: "40px", xs: "25px" }, ml: "20px" }}
        fontWeight={700}
        color="#000"
      >
        Similar{" "}
        <span style={{ color: "#FF2625", textTransform: "capitalize" }}>
          Target Muscle
        </span>{" "}
        exercises
      </Typography>
      <Stack direction="row" sx={{ p: "2", position: "relative" }} mb="30px">
        {muscle.length ? <HorizontalScrollbar data={muscle} /> : <Loader />}
      </Stack>

      <Typography
        sx={{
          fontSize: { lg: "40px", xs: "25px" },
          ml: "20px",
          mt: { lg: "100px", xs: "60px" },
        }}
        fontWeight={700}
        color="#000"
        mb="33px"
      >
        Similar{" "}
        <span style={{ color: "#FF2625", textTransform: "capitalize" }}>
          Equipment
        </span>{" "}
        exercises
      </Typography>
      <Stack direction="row" sx={{ p: 2, position: "relative" }}>
        {equipment?.length ? (
          <HorizontalScrollbar data={equipment} />
        ) : (
          <Loader />
        )}
      </Stack>
    </Box>
  );
};

export default SimiliarExercise;
