// Packages:
import React from 'react'
import {
    OutlinedInput, 
    InputAdornment, 
    FormControl,
    styled
  } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


// Styles:
const StyledFormControl = styled(FormControl)`
  font-size: 14px;
  background: #FFFFFF;
  & .MuiOutlinedInput-root {
    font-size: 14px;
  }
`;


// Functions:
export const ColumnFilter = ({ column }) => {
    // Constants:
    const { filterValue, setFilter } = column

    // Return:
    return (
        <span>
            <StyledFormControl variant="outlined">
                <OutlinedInput
                    type="text"
                    value={filterValue || ''}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filter"
                    endAdornment={
                        <InputAdornment position="end">
                            <SearchOutlinedIcon sx={{ fontSize: '20px' }} />
                        </InputAdornment>
                    }
                    size="small"
                />
            </StyledFormControl>
        </span>
    )
}