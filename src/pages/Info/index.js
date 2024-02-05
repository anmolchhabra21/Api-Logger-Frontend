// Packages:
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import moment from 'moment';
// import { Tabs, Tab, Tooltip, IconButton } from '@mui/material';
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

// Imports:
// import { fetchChatActions } from '../../redux/actions/contentActions';
// import {getcontent}
// import { getChatActions } from '../../redux/actions/chatActions';

// import {
//   Information,
//   Table,
//   TrackingInformation,
//   TrackingTable,
//   FeedbackInformation,
//   FeedbackTable,
//   Filters
// } from '../../components';

// Styles:
import { Container, Wrapper, Options } from "./styles";
import moment from "moment";
import { getChatActions } from "../../redux/actions/chatActions";
import { Filter, Table } from "../../components";

// Functions:
const Info = () => {
  // State:
  const dispatch = useDispatch();
  //   const chatActions = getChatActions(dispatch);
  const contentActions = getChatActions(dispatch);
  // const organisation_info = useSelector((state) => state.content.org_info);
  // const orgid = organisation_info?.org_data?._id;
  const reactionRecords = useSelector((state) => state.chatRecords);
  const [feedback, setFeedback] = useState("");
  const [dateRange, setDateRange] = useState("yesterday");
  const [startDate, setStartDate] = useState(moment().subtract(1, "days"));
  const [endDate, setEndDate] = useState(moment());
  const [conversationType, setConversationType] = useState([]);

  // useEffect(() => {
  // contentActions.fetchReactions(orgid);
  // }, [orgid]);
  useEffect(() => {
    // contentActions.fetchChatActions("2017-02-03T20:40:39", "2024-02-04T20:40:39");
  }, []);

  // Event Handlers:

  const handleFeedback = useCallback((data) => setFeedback(data), []);

  const handleDateRangeChange = useCallback(
    (event) => setDateRange(event.target.value),
    []
  );

  const handleStartDateChange = useCallback(
    (newValue) => setStartDate(newValue),
    []
  );

  const handleEndDateChange = useCallback(
    (newValue) => setEndDate(newValue),
    []
  );

  const handleConversationTypeChange = (event) => {
    const {
      target: { value },
    } = event;
    setConversationType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    if (dateRange === "this week") {
      setStartDate(moment().subtract(7, "days"));
      setEndDate(moment());
    } else if (dateRange === "last 2 hours") {
      setStartDate(moment().subtract(2, "hours"));
      setEndDate(moment());
    } else if (dateRange === "last 2 days") {
      setStartDate(moment().subtract(2, "days"));
      setEndDate(moment());
    } else if (dateRange === "yesterday") {
      setStartDate(moment().subtract(1, "days"));
      setEndDate(moment());
    } else {
      setStartDate(moment().subtract(7, "days"));
      setEndDate(moment());
    }
  }, [dateRange]);

  // Return:
  return (
    <Container>
      {/* <Options> */}
      {/* <Tabs
          value={switchInfo}
          onChange={(event, newValue) => setSwitchInfo(newValue)}
        >
          <Tab value="records" label="Chats" sx={{ textTransform: 'none' }} />
          <Tab value="tracking" label="AI Monitoring" sx={{ textTransform: 'none' }} />
          <Tab value="feedback" label="Feedback" sx={{ textTransform: 'none' }} />
        </Tabs> */}
      {/* </Options> */}
      <Options>
        <Filter
            handleDateRangeChange={handleDateRangeChange}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
            startDate={startDate}
            endDate={endDate}
            dateRange={dateRange}
          />
      </Options>
      <Wrapper>
        <Table
          startDate={startDate}
          endDate={endDate}
          dateRange={dateRange}
        />
      </Wrapper>
      {console.log("anmol", reactionRecords)}
      Anmol
    </Container>
  );
};

// // Exports:
export default Info;
// import React, { useEffect } from 'react'
// import { getChatActions } from '../../redux/actions/chatActions';

// const Info = () => {
//   const dispatch = useDispatch();
//   const chatActions = getChatActions(dispatch);
//   useEffect(()=>{
//     console.log("chk")
//     // chatActions.fetchChatActions("2017-02-03T20:40:39", "2024-02-04T20:40:39");
//   }, [])
//   return (
//     <div>Info</div>
//   )
// }

// export default Info
