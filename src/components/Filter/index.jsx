// Packages:
import React, { useCallback } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  TextField,
  InputLabel,
  styled,
  Box,
  Button,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// Styles:
import { Wrapper } from "./styles";
import { useDispatch } from "react-redux";
import moment from "moment";
import { getChatActions } from "../../redux/actions/chatActions";
import { Link } from "react-router-dom";

const StyledFormControl = styled(FormControl)`
  margin-top: 1rem;
  & .MuiFormLabel-root {
    font-size: 14px;
  }
  & .MuiOutlinedInput-root {
    overflow: hidden;
    font-size: 14px;
  }
  & .MuiFormGroup-root {
    margin-left: 1rem;
    font-size: 14px;
    & .MuiTypography-root {
      font-size: 14px;
    }
  }
  &. MuiButtonBase-root-MuiMenuItem-root.Mui-selected {
    background-color: red;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  font-size: 14px;
  & .MuiTypography-root {
    font-size: 14px;
  }
`;

const StyledDesktopDatePicker = styled(DatePicker)`
  &. MuiInputBase-input-MuiOutlinedInput-input {
    font-size: 14px;
  }
  & .MuiFormControl-root {
    margin-top: 1rem;
  }
`;

// Functions:
const Filters = (props) => {
  const dispatch = useDispatch();
  const chatActions = getChatActions(dispatch);

  // Event Handlers:
  const handleDateRangeChange = useCallback(
    (event) => props.handleDateRangeChange(event),
    []
  );

  const handleStartDateChange = useCallback(
    (newValue) => props.handleStartDateChange(newValue),
    []
  );

  const handleEndDateChange = useCallback(
    (newValue) => props.handleEndDateChange(newValue),
    []
  );

  const handleApplyFilter = () => {
    chatActions.fetchChatActions(
      moment(props.startDate).format("YYYY-MM-DD[T]HH:mm:ss"),
      moment(props.endDate).format("YYYY-MM-DD[T]HH:mm:ss")
    );
  };

  // Return:
  return (
    <Wrapper sx={{ backgroundColor: "transparent" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start", // Align to the left
          gap: "1rem", // Add space between filter boxes
          alignItems: "flex-start", // Align items vertically with flex-start
        }}
      >
        <StyledFormControl sx={{ width: "10%", height: "100%" }}>
          {" "}
          {/* Set width and height */}
          <InputLabel id="date-range">Filter By</InputLabel>
          <Select
            autoWidth={false}
            id="date-range"
            value={props.dateRange}
            onChange={(event) => handleDateRangeChange(event)}
            label="Date Range"
            sx={{ fontSize: 14 }}
          >
            <StyledMenuItem value="last 2 hours" key="last 2 hours">
              Last 2 Hours
            </StyledMenuItem>
            <StyledMenuItem value="today" key="today">
              Today
            </StyledMenuItem>
            <StyledMenuItem value="yesterday" key="yesterday">
              Yesterday
            </StyledMenuItem>
            <StyledMenuItem value="last 2 days" key="last 2 days">
              Last 2 Days
            </StyledMenuItem>
            <StyledMenuItem value="this week" key="this week">
              This Week
            </StyledMenuItem>
          </Select>
        </StyledFormControl>
        <LocalizationProvider
          dateAdapter={AdapterMoment}
          sx={{ width: "10%", height: "100%" }}
        >
          {" "}
          {/* Set width and height */}
          <div style={{ marginTop: "1rem" }}>
            <StyledDesktopDatePicker
              variant="inline"
              label="Start Date"
              value={moment(props.startDate)}
              onChange={handleStartDateChange}
              //   renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </LocalizationProvider>
        <LocalizationProvider
          dateAdapter={AdapterMoment}
          sx={{ width: "10%", height: "100%" }}
        >
          <div style={{ marginTop: "1rem" }}>
            <StyledDesktopDatePicker
              label="End Date"
              value={moment(props.endDate)}
              onChange={handleEndDateChange}
              //   renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </LocalizationProvider>

        <Button
          variant="contained"
          size="medium"
          sx={{
            textTransform: "none",
            width: "10%",
            height: "100%",
            marginTop: "1.5rem",
          }}
          onClick={() => handleApplyFilter()}
        >
          Apply Filters
        </Button>
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
      </Box>
    </Wrapper>
  );
};

// Exports:
export default Filters;
