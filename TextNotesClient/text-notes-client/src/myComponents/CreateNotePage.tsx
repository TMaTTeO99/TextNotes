import '../style/AddNotePageStyle.css';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { addNewNoteInServer, updateNote} from '../httpService';
import { NoteDataFromServer } from '../myInterface/noteInterfaces';
import { useState } from 'react';
import { useNoteContext } from './MyContext';
import { useEffect } from 'react';


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

/*
  Function to update note 
*/
async function UpDateNote (note: NoteDataFromServer) {

    try {
      const noteAdded: NoteDataFromServer = await updateNote(note);
      return noteAdded;
    }
    catch(error) {
      console.log(error);
    }  
    
}

export default function MyNoteForm() {

  const {
    allNotes, 
    setAllNotes,
    selectedNoteTitle, 
    selectedNoteContent, 
    headerText,
    toSave, 
    setToSave,
    idNoteToChange,
  } = useNoteContext();

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    setTitle(selectedNoteTitle || '');
    setContent(selectedNoteContent || '');
    
  }, [])
  

  const doAddNote = async (title: string, content: string) => {
    
    const objNote: NoteDataFromServer = {
        title: title,
        content: content
    }
    var newNote = await AddNotesInList(objNote);
    if(newNote){
      setAllNotes([...allNotes, newNote])
    }
    else console.log("row 52: doAddNote (newNote undefined) ")
    navigate("/");
  }

  const doModifyNote = async (title: string, content: string, id: string | undefined) => {

    const objNote: NoteDataFromServer = {
        title: title,
        content: content,
        id: id
    }
    var newNote = await UpDateNote(objNote);
    
    if(newNote){

      //update the previus note in my list
      setAllNotes(allNotes.map(note => note.id === newNote?.id ? newNote : note) as NoteDataFromServer[])
      
    }
    else console.log("row 52: doAddNote (newNote undefined) ")
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
          <h1 style={{ margin: 0 }}>{headerText}</h1>
        </div>
      </div>
      <TextField
        id="Title"
        label="Title"
        multiline
        value={title}
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
          id="Content"
          label="Content"
          multiline
          rows={15}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
        />
        <Button 
          sx={{ 
            mt: 1,
            alignSelf: 'flex-end'
          }}
          onClick={() => {
            
            //check if save button is called to modify note or create note
            if(toSave) doAddNote(title, content)    
            else doModifyNote(title, content, idNoteToChange)
          }}
        >
          Save
        </Button>
      </div>
    </Box>
  );
}
