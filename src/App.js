import { Link } from 'react-router-dom';
import './App.css';
import { Button } from '@mui/material';

function App() {
  return (
    <div className="App">
      <h1>Welcome to API-Logger</h1>
      <h3>Please headout to chat button for giving the input and chatting with gpt</h3>
      <h3>Please headout to Tables for seeing the api responses, that has sorting and searching on all fields, and the data is filterable by date, so we can select the specified date and get the data corresponding to it</h3>
      <h3>Hope you like it.</h3>
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
      {" "}
      <Link to={"../input"}>
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
          Chat
        </Button>
      </Link>
    </div>
  );
}

export default App;
