import {
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";

import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { registerQuery } from "../../api";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const Input = () => {
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 5px 5px 0 5px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  const [query, setQuery] = useState("");
  const [age, setAge] = React.useState("gpt-3.5-turbo-0613");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("No Response");
  const [email, setEmail] = useState("a@gmail.com");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const processQuery = async () => {
    try {
      setIsLoading(true);
      const content = await registerQuery(age, query, email);
      setResponse(content);
    } catch (error) {
      console.log(error);
      throw error;
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          sx={{ width: "50%", my: 5 }}
          label="Write your Query Here"
          id="outlined-controlled"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <FormControl sx={{ my: 5 }}>
          <InputLabel id="demo-simple-select-label">GPT-Model</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="GPT-Model"
            onChange={handleChange}
          >
            <MenuItem value="gpt-4-vision-preview">
              gpt-4-vision-preview
            </MenuItem>
            <MenuItem value="gpt-3.5-turbo-0613">gpt-3.5-turbo-0613</MenuItem>
            <MenuItem value="gpt-3.5-turbo-0125">gpt-3.5-turbo-0125</MenuItem>
            <MenuItem value="gpt-3.5-turbo-instruct">
              gpt-3.5-turbo-instruct
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ mt: 2.8 }}
          error={!email.includes("@gmail.com")}
          id="outlined-error-helper-text"
          label="User-Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText="Should contain '@gmail.com'"
        />
        <Button
          size="large"
          variant="contained"
          endIcon={<SendIcon />}
          disabled={query.length === 0 || isLoading === true}
          onClick={processQuery}
          sx={{ m: 5 }}
        >
          {isLoading === true ? "Loading..." : "Send"}
        </Button>
      </Box>
      <Textarea
        label="GPT Output"
        sx={{ width: "80%" }}
        aria-label="empty textarea"
        placeholder="Empty"
        value={
          response && response["data"]
            ? response?.data?.data?.choices[0]?.message?.content
            : "No Response"
        }
      />
      <Link to={"../info"}>
        <Button
          variant="contained"
          size="medium"
          sx={{
            background: "green",
            textTransform: "none",
            width: "10%",
            height: "100%",
            marginTop: "1.5rem",
          }}
        >
          Tables
        </Button>
      </Link>
    </Container>
  );
};

export default Input;
