import * as React from 'react';
import {  styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {dataToAddNoteInSearchBar} from '../myInterface/dataForAddNote'
import { useNoteContext } from './MyContext';

import { useEffect, useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



const SearchAppBar: React.FC<dataToAddNoteInSearchBar> =  ({goToAddPage} ) => {

  
  const { allNotes, setAllNotes, allNotesCopy} = useNoteContext();
  allNotesCopy.forEach(c => console.log("after retrieve: " + c))
  
  
  
  
  /*
  const handleSearchInList = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter"){
      event.preventDefault();
      const word: string = event.currentTarget.value;

    }

  }
  */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    
    const searchValue = event.target.value.toLowerCase();

    //make a copy of my allNoteCopy
    const filteredList = JSON.parse(JSON.stringify(allNotesCopy.filter(n  => n.title?.toLowerCase().includes(searchValue))));
    

    if (filteredList.length === 0) setAllNotes(filteredList);
    else if (!searchValue || searchValue === '') setAllNotes(allNotesCopy);
    else setAllNotes(filteredList);
    
    
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: 'black'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => goToAddPage()}
            
          >
            <AddIcon />
            
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            TEXT NOTES APP
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              
              onChange={handleChange}
            />
          </Search>
          
        </Toolbar>
      </AppBar>
      
      
      
    </Box>
  );
  /*onKeyDown={handleSearchInList}*/
}
export default SearchAppBar;