// Packages:
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import moment from 'moment';
// import { Tabs, Tab, Tooltip, IconButton } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

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
import { Container, Wrapper, Options } from './styles';
import moment from 'moment';
import { getChatActions } from '../../redux/actions/chatActions';

// Functions:
const Info = () => {
  // State:
  const dispatch = useDispatch();
//   const chatActions = getChatActions(dispatch);
  const contentActions = getChatActions(dispatch);
  // const organisation_info = useSelector((state) => state.content.org_info);
  // const orgid = organisation_info?.org_data?._id;
  const reactionRecords = useSelector((state) => state.chatRecords);
  const [chat, setChat] = useState('');
  const [stat, setStat] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState([]);
  const [switchInfo, setSwitchInfo] = useState('records');
  const [dateRange, setDateRange] = useState('last 4 weeks');
  const [startDate, setStartDate] = useState(moment().subtract(28, 'days'));
  const [endDate, setEndDate] = useState(moment());
  const [conversationType, setConversationType] = useState([]);
  const [type, setType] = useState([]);
  const [hideInfo, setHideInfo] = useState(true);

  // useEffect(() => {
    // contentActions.fetchReactions(orgid);
  // }, [orgid]);
  useEffect(()=>{
        console.log("chk")
        // contentActions.fetchChatActions("2017-02-03T20:40:39", "2024-02-04T20:40:39");
      }, [])

  // Event Handlers:
  
  const handleChat = useCallback((data) => setChat(data), []);

  const handleStat = useCallback((data) => setStat(data), []);

  const handleFeedback = useCallback((data) => setFeedback(data), []);

  const handleDateRangeChange = useCallback((event) => setDateRange(event.target.value), []);

  const handleStartDateChange = useCallback((newValue) => setStartDate(newValue), []);

  const handleEndDateChange = useCallback((newValue) => setEndDate(newValue), []);

  const handleRatingChange = (event) => {
    const {
      target: { value },
    } = event;
    setRating(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleConversationTypeChange = (event) => {
    const {
      target: { value },
    } = event;
    setConversationType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleTypeChange = (event) => {
    const {
      target: { value },
    } = event;
    setType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    if (dateRange === 'last 4 weeks') {
      setStartDate(moment().subtract(28, 'days'));
      setEndDate(moment());
    } else if (dateRange === 'last 2 weeks') {
      setStartDate(moment().subtract(14, 'days'));
      setEndDate(moment());
    } else if (dateRange === 'last week') {
      setStartDate(moment().subtract(14, 'days'));
      setEndDate(moment().subtract(7, 'days'));
    } else if (dateRange === 'yesterday') {
      setStartDate(moment().subtract(1, 'days'));
      setEndDate(moment().subtract(1, 'days'));
    } else {
      setStartDate(moment().subtract(7, 'days'));
      setEndDate(moment());
    }
  }, [dateRange]);

  // Return:
  return (
    <Container>
      <Options>
        {/* <Tabs
          value={switchInfo}
          onChange={(event, newValue) => setSwitchInfo(newValue)}
        >
          <Tab value="records" label="Chats" sx={{ textTransform: 'none' }} />
          <Tab value="tracking" label="AI Monitoring" sx={{ textTransform: 'none' }} />
          <Tab value="feedback" label="Feedback" sx={{ textTransform: 'none' }} />
        </Tabs> */}
      </Options>
      {/* <Wrapper>
        {switchInfo === 'records' && (
          <>
            <Filters
              handleDateRangeChange={handleDateRangeChange}
              handleStartDateChange={handleStartDateChange}
              handleEndDateChange={handleEndDateChange}
              startDate={startDate}
              endDate={endDate}
              dateRange={dateRange}
              tab="records"
              conversationType={conversationType}
              handleConversationTypeChange={handleConversationTypeChange}
            />
            <Table
              handleChat={handleChat}
              startDate={startDate}
              endDate={endDate}
              dateRange={dateRange}
              hideInfo={hideInfo}
              conversationType={conversationType}
            />
            <Information chat={chat} hideInfo={hideInfo} />
          </>
        )}
        {switchInfo === 'tracking' && (
          <>
            <Filters
              handleDateRangeChange={handleDateRangeChange}
              handleStartDateChange={handleStartDateChange}
              handleEndDateChange={handleEndDateChange}
              startDate={startDate}
              endDate={endDate}
              dateRange={dateRange}
              tab="tracking"
              type={type}
              handleTypeChange={handleTypeChange}
            />
            <TrackingTable
              handleStat={handleStat}
              startDate={startDate}
              endDate={endDate}
              dateRange={dateRange}
              hideInfo={hideInfo}
              reactions={reactionRecords}
              type={type}
            />
            <TrackingInformation
              stat={stat}
              reactions={reactionRecords}
              startDate={startDate}
              endDate={endDate}
              dateRange={dateRange}
              type={type}
              hideInfo={hideInfo}
            />
          </>
        )}
        {switchInfo === 'feedback' && (
          <>
            <Filters
              handleDateRangeChange={handleDateRangeChange}
              handleStartDateChange={handleStartDateChange}
              handleEndDateChange={handleEndDateChange}
              startDate={startDate}
              endDate={endDate}
              dateRange={dateRange}
              rating={rating}
              handleRatingChange={handleRatingChange}
              tab="feedback"
            />
            <FeedbackTable
              handleFeedback={handleFeedback}
              startDate={startDate}
              endDate={endDate}
              dateRange={dateRange}
              hideInfo={hideInfo}
              rating={rating}
            />
            <FeedbackInformation 
              feedback={feedback} 
              hideInfo={hideInfo}
            />
          </>
        )}
      </Wrapper> */}
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
