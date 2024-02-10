// Packages:
import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { useDeepCompareEffect } from "react-use";
import { Chip, CircularProgress } from "@mui/material";
import Pagination from "../Pagination";

// Components:
// import Pagination from '../Pagination'

// Imports:
import { getChatActions } from "../../redux/actions/chatActions";
import { ColumnFilter } from "./ColumnFilter";
import { Wrapper, RecordsTable, Header, Body, Title, Filters } from "./styles";
import moment from "moment";

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
    // console.log("props", props.startDate, props.endDate);
    chatActions.fetchChatActions(moment(props.startDate).format('YYYY-MM-DD[T]HH:mm:ss'), moment(props.endDate).format('YYYY-MM-DD[T]HH:mm:ss'));
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
        accessor: (row) => row[col],
        Filter: ColumnFilter,
        disableSortBy: col === "request" || col === "response" ? true : false,
      };
    });
    setColumns(tempArray);
  }, [cols]);

  // Return:
  return (
    <Wrapper>
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
                        {column.canFilter ? column.Header !== "Status" ? column.render("Filter") : null: null}
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
                            {row.original.status ? (
                              <Chip
                                label="success"
                                color="success"
                                variant="outlined"
                              />
                            ) : (
                              <Chip
                                label="error"
                                color="error"
                                variant="outlined"
                              />
                            )}
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

      <Pagination
        gotoPage={gotoPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        nextPage={nextPage}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageCount={pageCount}
      />

      
    </Wrapper>
  );
};

// Exports:
export default Table;
