import '../style/HomeStyle.css'

import SearchAppBar from './UpBarComponent'; 
import {  Grid, Grid2 } from '@mui/material'
import NoteItem from './NoteItem';
import { NoteDataFromServer } from '../myInterface/noteInterfaces';
import { useEffect, useState} from 'react';
import { getAllNotes, deleteNoteInServer} from '../httpService';
import { useNavigate } from 'react-router-dom';
import { useNoteContext } from './MyContext';
/*
  Retrieve all notes from server
*/
async function retrieveData(setDataState: React.Dispatch<React.SetStateAction<boolean>>, 
                            setData: React.Dispatch<React.SetStateAction<NoteDataFromServer[]>>,
                            setLoading: React.Dispatch<React.SetStateAction<boolean>>) {

  try {
    var listOfNotes: NoteDataFromServer[] = await getAllNotes();
    setDataState(false);
    setData(listOfNotes);   
  }
  catch(error){

    console.log(error)
    setDataState(true);
    setData([])
  }

  setLoading(false);
}

/*
  delete a single note
*/
async function deleteNote (id: string | undefined, data: NoteDataFromServer[], setData: React.Dispatch<React.SetStateAction<NoteDataFromServer[]>>) {

  try {

    await deleteNoteInServer(id);
    const updatedNotes = data.filter(note => note.id !== id);
    updatedNotes.forEach(n => console.log(n))
    setData(updatedNotes);

  }
  catch(error) {

    console.log(error);
  
  }

}




function Home() {

    const {
      isRetrieveData,
      allNotes, 
      setIsRetrieveData, 
      setAllNotes, 
      loading, 
      setLoading,
      setSelectedNoteTitle, 
      setSelectedNoteContent, 
      setheaderText,
      setIdNoteToChange,
      setToSave,
    } = useNoteContext();
    
    const [dataState, setDataState] = useState(false);

    const navigate = useNavigate();
    

    useEffect(() => {

      if(isRetrieveData != null && !isRetrieveData){
      
        setIsRetrieveData(true);
        
        const doRetrieveData = async () => {
          await retrieveData(setDataState, setAllNotes, setLoading);
        }
        doRetrieveData();
        console.log("recuperati")
      }
    }, []);

    //function to go to add note page
    const goToAddNote = () => {
      setheaderText("Crea una nuova nota")
      setSelectedNoteTitle("");
      setSelectedNoteContent("");
      setToSave(true);
      navigate("/addNote");
    }
    
    //function to handle note selection
    const handleSelectionNote = (title: string | null, content: string | null, note: string | null | undefined, id: string | undefined) => {
      

      setheaderText("Dettagli Nota");
      setSelectedNoteTitle(title);
      setSelectedNoteContent(content); 
      setIdNoteToChange(id);
      setToSave(false);
      navigate("/viewNote");


    }

    //data.forEach(n => console.log(n.id));
    if(loading)return (<h1>Loading...</h1>);
    if(dataState)return (<h1>Impossibile recuperare i dati</h1>);

    return (
      <div className='homeContainer'>
          
        {/*Header Section*/}
        <SearchAppBar goToAddPage={goToAddNote} />
  
        {/*Grid with All Notes*/}
        <div className='homeGrid'>
          <Grid2 container spacing={2}>
            {allNotes.map((note , idx) => (
              
              <Grid2 size={{xs: 12, md: 4}} key={idx} >
                <NoteItem 
                  data={note.date} 
                  content={note.content} 
                  title={note.title} 
                  deleteNote={async () => await deleteNote(note.id, allNotes, setAllNotes)}
                  myOnClick={() => handleSelectionNote(note.title, note.content, note.date, note.id)}/>
              </Grid2>
  
            ))}
          </Grid2>
        </div>
      </div>
    );
    
}
export default Home
