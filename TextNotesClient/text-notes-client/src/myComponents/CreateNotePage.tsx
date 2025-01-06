import '../style/AddNotePageStyle.css';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { addNewNoteInServer} from '../httpService';
import { NoteDataFromServer } from '../myInterface/noteInterfaces';
import { useState } from 'react';
import { useNoteContext } from './MyContext';

/*
  Function to add note from UpBar in notes list 
*/
async function AddNotesInList (note: NoteDataFromServer) {

  try {
    const noteAdded: NoteDataFromServer = await addNewNoteInServer(note);
    return noteAdded;
  }
  catch(error) {
    console.log(error);
  }  
  
}

export default function MyNoteForm() {

  const {isRetrieveData, allNotes, setIsRetrieveData, setAllNotes} = useNoteContext();

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const doAddNote = async (title: string, content: string) => {
    
    const objNote: NoteDataFromServer = {
        title: title,
        content: content
    }
    var newNote = await AddNotesInList(objNote);
    setAllNotes([...allNotes, newNote])
    navigate("/");
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: '100vh'
      }}
      noValidate
      autoComplete="off"
    >
      <div className="headerAddNote">
        <div className="contentHeaderAddNote">
          <ArrowBackIcon onClick={() => navigate(-1)} style={{ cursor: 'pointer', marginLeft: '1rem' }} />
          <h1 style={{ margin: 0 }}>Crea una nuova nota</h1>
        </div>
      </div>
      <TextField
        id="outlined-multiline-flexible"
        label="Title"
        multiline
        maxRows={2}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div style={{ 
        position: 'relative', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
      }}>
        <TextField
          id="outlined-multiline-static"
          label="Content"
          multiline
          rows={15}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
        />
        <Button 
          sx={{ 
            mt: 1,
            alignSelf: 'flex-end'
          }}
          onClick={() => doAddNote(title, content)}
        >
          Save
        </Button>
      </div>
    </Box>
  );
}
