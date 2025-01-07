import '../style/AddNotePageStyle.css';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { addNewNoteInServer, updateNote, getNote} from '../httpService';
import { NoteDataFromServer } from '../myInterface/noteInterfaces';
import React, { useState } from 'react';
import { useNoteContext } from './MyContext';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
    setAllNotesCopy
  } = useNoteContext();

  const {id, headerText, toSave} = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string | null>('');
  const [content, setContent] = useState<string | null>('');
  const [isModified, setIsModified] = useState(false);
  const [noteRetrieve, setNoteRetrieve] = useState<NoteDataFromServer>();


  console.log("value toSave: " + toSave + " toSave type :" + typeof toSave );

  if(id && id !== ''){

    useEffect(() => {
      
      const doGetNote = async (id: string, setTitle: React.Dispatch<React.SetStateAction<string | null>>, setContent: React.Dispatch<React.SetStateAction<string | null>> ) => {
        const note = await getNote(id);
        setTitle(note.title);
        setContent(note.content);
        setNoteRetrieve(note);
      }

      doGetNote(id, setTitle, setContent);
      
    }, [])
  }


  useEffect(() => {
    
    setIsModified(title !== (noteRetrieve?.title || '') || content !== (noteRetrieve?.content || ''));
    console.log(title !== (noteRetrieve?.title || '') || content !== (noteRetrieve?.content || ''));
  }, [title, content])


  const doAddNote = async (title: string | null, content: string | null) => {
    
    console.log("IN AGGIUNTA");
    const objNote: NoteDataFromServer = {
        title: title,
        content: content
    }
    var newNote = await AddNotesInList(objNote);
    if(newNote){
      setAllNotes([...allNotes, newNote]);
      setAllNotesCopy([...allNotes, newNote]);
    }
    else console.log("row 52: doAddNote (newNote undefined) ")
    navigate("/");
  }

  const doModifyNote = async (title: string | null, content: string | null, id: string | undefined) => {

    console.log("IN MODIFICA");

    const objNote: NoteDataFromServer = {
        title: title,
        content: content,
        id: id
    }
    var newNote = await UpDateNote(objNote);
    
    if(newNote){

      //update the previus note in my list
      const newList = allNotes.map(note => note.id === newNote?.id ? newNote : note) as NoteDataFromServer[];
      setAllNotes(newList);
      setAllNotesCopy(newList);
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
        {isModified && 

            <Button 
                sx={{ 
                mt: 1,
                alignSelf: 'flex-end'
                }}
                onClick={() => {
                    //check if save button is called to modify note or create note
                    if(toSave === "true") doAddNote(title, content)    
                    else doModifyNote(title, content, id)
                }}
            >
                Save
            </Button>        
        }
      </div>
    </Box>
  );
}
