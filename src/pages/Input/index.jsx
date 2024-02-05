import {
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { registerQuery } from "../../api";

const Input = () => {
  const [query, setQuery] = useState("");
  const [age, setAge] = React.useState("gpt-3.5-turbo-0613");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("No Response");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const processQuery = async () => {
    // console.log('chk2')
    try {
      setIsLoading(true);
      // console.log("1")
      const content = await registerQuery(age, query);
      setResponse(content);
    } catch (error) {
      console.log(error);
      throw error;
    }
    setIsLoading(false);
  };

  return (
    <Container>
      Hello
      {console.log('resp', response)}
      <span>
        <TextField
          sx={{ width: "50%" }}
          label="Write your Query Here"
          id="outlined-controlled"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <FormControl>
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
        <Button
          size="large"
          variant="contained"
          endIcon={<SendIcon />}
          disabled={query.length === 0 || isLoading===true}
          onClick={processQuery}
        >
          {isLoading===true? "Loading..." : "Send"}
        </Button>
      </span>
      <TextField
        sx={{ width: "50%" }}
        id="outlined-controlled-2"
        label="GPT Output"
        value={response && response['data'] ? response?.data?.data?.choices[0]?.message?.content: "No Response"}
      />
    </Container>
  );
};

export default Input;
