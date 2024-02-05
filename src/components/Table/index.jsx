// Packages:
import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { useDeepCompareEffect } from "react-use";
import moment from "moment";
import { Chip, CircularProgress, Button } from "@mui/material";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

// Components:
// import Pagination from '../Pagination'

// Imports:
import { getChatActions } from "../../redux/actions/chatActions";
import { ColumnFilter } from "./ColumnFilter";
import { Wrapper, RecordsTable, Header, Body, Title, Filters } from "./styles";

// Functions:
const Table = (props) => {
  // Constants:
  const dispatch = useDispatch();
  const chatActions = getChatActions(dispatch);
  const chatRecords = useSelector((state) => state.chatRecords);
  const isContentLoading = useSelector((state) => state.loading);

  // State:
  const [bit, setBit] = useState(false);
  const [records, setRecords] = useState(chatRecords);
  const [cols, setCols] = useState([]);
  const [columns, setColumns] = useState([]);
  const data = useMemo(() => records, [records]);

  const initialState = {
    sortBy: [
      {
        id: "Created At",
        desc: true,
      },
    ],
  };

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState,
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    prepareRow,
  } = tableInstance;

  const { pageIndex } = state;

  useEffect(() => {
    // chatActions.fetchChatRecords(org_id);
    // chatActions.fetchChatRecordsV3(org_id, props.startDate, props.endDate);
    chatActions.fetchChatActions("2017-02-03T20:40:39", "2024-02-06 13:02:00");
  }, [bit]);

  useDeepCompareEffect(() => {
    setRecords(chatRecords);
    chatRecords &&
      chatRecords.length > 0 &&
      setCols(Object.keys(chatRecords[0]));
  }, [chatRecords]);

  useDeepCompareEffect(() => {
    const tempArray = cols.map((col, i) => {
      const words = col.split("_");
      const capitalised = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      );
      return {
        Header: capitalised.join(" "),
        // accessor: row => col==="created_date" ? row.created_date.substring(0,10) + " " + row.created_date.substring(11,16) : row[col],
        accessor: (row) => row[col],
        Filter: ColumnFilter,
        disableSortBy: col === "request" || col === "response" ? true : false,
      };
    });
    setColumns(tempArray);
  }, [cols]);

  // useEffect(() => {
  //   if (chatRecords !== undefined && chatRecords !== null) {
  //     let filteredData = chatRecords;
  //     if(props.conversationType.length > 0) {
  //       let conversationTypeFilteredData = filteredData.filter((item) => props.conversationType.includes(item.conversation_type))
  //       setRecords(conversationTypeFilteredData);
  //     }
  //     else {
  //       setRecords(filteredData);
  //     }
  //   }
  // }, [props.startDate, props.endDate, props.conversationType, chatRecords]);

  // Return:
  return (
    <Wrapper>
      {/* {headerGroups.map((headerGroup) => (
        <Filters {...headerGroup.getHeaderGroupProps()}>
          {console.log("chk", headerGroup.headers)}
          {headerGroup.headers.map((column) => (
            <span>
              <div>{column.Header}</div>
              <div>{column.canFilter ? column.render("Filter") : null}</div>
            </span>
          ))}
        </Filters>
      ))} */}
      <RecordsTable {...getTableProps()}>
        {isContentLoading ? (
          <thead style={{ marginTop: "15rem" }}>
            <tr>
              <th>
                <CircularProgress />
              </th>
            </tr>
          </thead>
        ) : (
          <>
            <Header>
              {headerGroups.map((headerGroup) => (
                <Title {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " ⬇️"
                            : " ⬆️"
                          : ""}
                      </span>
                    </th>
                  ))}
                </Title>
              ))}
              {headerGroups.map((headerGroup) => (
                <Filters {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </th>
                  ))}
                </Filters>
              ))}
            </Header>
            <Body {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      if (cell.column.Header === "Status") {
                        return (
                          <td {...cell.getCellProps()}>
                            <Chip
                              label="click to view"
                              icon={<QuestionAnswerOutlinedIcon />}
                              color="success"
                              size="small"
                              sx={{
                                cursor: "pointer",
                                color: "#034B03",
                                fontWeight: "600",
                              }}
                              variant="outlined"
                            />
                          </td>
                        );
                      } else if (cell.column.Header === "Created At") {
                        return (
                          <td {...cell.getCellProps()}>
                            <>{row.original.created_at}</>
                          </td>
                        );
                      } else if (cell.column.Header === "Request") {
                        return (
                          <td {...cell.getCellProps()}>
                            <>{row.original.request}</>
                          </td>
                        );
                      } else if (cell.column.Header === "Response") {
                        return (
                          <td {...cell.getCellProps()}>
                            <>{row.original.response}</>
                          </td>
                        );
                      } else if (cell.column.Header === "Completion Tokens") {
                        return (
                          <td {...cell.getCellProps()}>
                            <>{row.original.completion_tokens}</>
                          </td>
                        );
                      } else if (cell.column.Header === "Prompt Tokens") {
                        return (
                          <td {...cell.getCellProps()}>
                            <>{row.original.prompt_tokens}</>
                          </td>
                        );
                      } else if (cell.column.Header === "Model") {
                        return (
                          <td {...cell.getCellProps()}>
                            <>{row.original.model}</>
                          </td>
                        );
                      } else if (cell.column.Header === "Total Tokens") {
                        return (
                          <td {...cell.getCellProps()}>
                            <>{row.original.total_tokens}</>
                          </td>
                        );
                      } else {
                        console.log("galti", cell.column.Header);
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      }
                    })}
                  </tr>
                );
              })}
            </Body>
          </>
        )}
      </RecordsTable>

      {/* <Pagination 
        gotoPage={gotoPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        nextPage={nextPage}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageCount={pageCount}
      /> */}

      {/* {records !== null && (
        <CSVLink
          filename={'records.csv'}
          data={records.map((row) => {
            let data = {
              user_email: row.user_email,
              created_date: row.created_date,
              record_id: row.record_id,
              conversation_type: row.conversation_type,
              record: row.record,
              tags: typeof row.tags === 'object' ? row.tags?.map((tag) => row.tags?.map((tag) => `${tag.value} `)) :row.tags
            };
            return data;
          })}
        >
          <Button 
            variant="contained"
            size="small"
            startIcon={<FileUploadOutlinedIcon />}
            sx={{ textTransform: 'none' }}
          >
            Export Data
          </Button>
        </CSVLink>
      )} */}
    </Wrapper>
  );
};

// Exports:
export default Table;
