// Packages:
import React from 'react';
import { Tooltip, IconButton} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';


// Styles:
import {
    Wrapper,
    PageInput
  } from './styles';


// Functions:
const Pagination = ({ 
    gotoPage, 
    canPreviousPage, 
    canNextPage, 
    previousPage, 
    nextPage, 
    pageIndex, 
    pageOptions,
    pageCount 
}) => {

  // Return:
  return (
    <Wrapper>
        <Tooltip title="First">
          <span>
            <IconButton disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
              <FirstPageIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Previous">
          <span>
            <IconButton disabled={!canPreviousPage} onClick={() => previousPage()}>
              <NavigateBeforeIcon />
            </IconButton>
          </span>         
        </Tooltip>
        <span
          style={{
            fontSize: '0.8rem',
            marginLeft: '0.5rem',
            marginRight: '0.5rem'
          }}
        >
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <PageInput
              type="number"
              min={0}
              max={pageOptions.length}
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: '50px' }}
            />
          </span>
        </span>
        <Tooltip title="Next">
          <span>
            <IconButton disabled={!canNextPage} onClick={() => nextPage()}>
              <NavigateNextIcon />
            </IconButton>
          </span> 
        </Tooltip>
        <Tooltip title="Last">
          <span>
            <IconButton disabled={!canNextPage} onClick={() => gotoPage(pageCount - 1)}>
              <LastPageIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Wrapper>
  )
}


// Exports:
export default Pagination;