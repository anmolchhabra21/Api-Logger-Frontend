// Packages:
import React, { useState, useEffect, useCallback } from "react";

// Styles:
import { Container, Wrapper, Options } from "./styles";
import moment from "moment";
import { Filter, Table } from "../../components";

// Functions:
const Info = () => {
  // State:
  const [dateRange, setDateRange] = useState("yesterday");
  const [startDate, setStartDate] = useState(moment().subtract(1, "days"));
  const [endDate, setEndDate] = useState(moment());

  // // useEffect(() => {
  // // contentActions.fetchReactions(orgid);
  // // }, [orgid]);
  useEffect(() => {
    // contentActions.fetchChatActions("2017-02-03T20:40:39", "2024-02-04T20:40:39");
  }, []);

  // Event Handlers:

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
    } else if (dateRange === "today") {
      setStartDate(moment().subtract(24, "hours"));
      setEndDate(moment());
    } else {
      setStartDate(moment().subtract(7, "days"));
      setEndDate(moment());
    }
  }, [dateRange]);

  // Return:
  return (
    <Container>
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
    </Container>
  );
};

// // Exports:
export default Info;
