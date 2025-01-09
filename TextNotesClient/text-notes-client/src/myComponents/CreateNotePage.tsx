import '../style/AddNotePageStyle.css';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useNoteContext } from './MyContext';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import appClient from '../httpServiceByManifest';
import {AllGet200ResponseInner} from '../../out/models/AllGet200ResponseInner'
import {AddNotePostOperationRequest, UpdateNotePutOperationRequest, IdGetRequest} from '../../out/apis'

/*
  Function to add note from UpBar in notes list 
*/
async function AddNotesInList (note: AddNotePostOperationRequest) {

  try {
    const noteAdded: AllGet200ResponseInner = await appClient.addNotePost(note);// addNewNoteInServer(note);
    return noteAdded;
  }
  catch(error) {
    console.log(error);
  }  
  
}

/*
  Function to update note 
*/
async function UpDateNote (note: UpdateNotePutOperationRequest) {

    try {
      const noteAdded: AllGet200ResponseInner = await appClient.updateNotePut(note);//updateNote(note);
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
  const [title, setTitle] = useState<string | undefined>('');
  const [content, setContent] = useState<string | undefined>('');
  const [isModified, setIsModified] = useState(false);
  const [noteRetrieve, setNoteRetrieve] = useState<AllGet200ResponseInner>();


  console.log("value toSave: " + toSave + " toSave type :" + typeof toSave );

  if(id && id !== ''){

    useEffect(() => {
      
      const doGetNote = async (id: string, setTitle: React.Dispatch<React.SetStateAction<string | undefined>>, setContent: React.Dispatch<React.SetStateAction<string | undefined>> ) => {
        
        console.log("id: " + id);
        const param: IdGetRequest = {id: id}
        const note = await appClient.idGet(param)// getNote(id);

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


  const doAddNote = async (title: string | undefined/*null*/, content: string | undefined/*null*/) => {
    

    const objNote: AddNotePostOperationRequest = {
        addNotePostRequest: {
          title: title,
          content: content
        }        
    }
    var newNote = await AddNotesInList(objNote);
    if(newNote){
      setAllNotes([...allNotes, newNote]);
      setAllNotesCopy([...allNotes, newNote]);
    }
    else console.log("row 52: doAddNote (newNote undefined) ")
    navigate("/");
  }

  const doModifyNote = async (title: string | undefined, content: string | undefined, id: string) => {


    const objNote: UpdateNotePutOperationRequest = {

      updateNotePutRequest: {
        title: title,
        content: content,
        id: id
      }
        
    }
    
    var newNote = await UpDateNote(objNote);
    
    if(newNote){

      //update the previus note in my list
      
      const newList = allNotes.map(note => note.id === newNote?.id ? newNote : note) as AllGet200ResponseInner[];
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
                    else doModifyNote(title, content, id!)
                }}
            >
                Save
            </Button>        
        }
      </div>
    </Box>
  );
}
