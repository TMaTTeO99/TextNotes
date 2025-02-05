import '../style/HomeStyle.css'

import SearchAppBar from './UpBarComponent'; 
import { Grid2 } from '@mui/material'
import NoteItem from './NoteItem';
import { useEffect, useState} from 'react';
import { deleteNoteInServer} from '../httpService';
import appClient from '../httpServiceByManifest';
import { useNavigate } from 'react-router-dom';
import { useNoteContext } from './MyContext';
import {AllGet200ResponseInner} from '../../out/models/AllGet200ResponseInner' 

/*
  Retrieve all notes from server
*/
async function retrieveData(setDataState: React.Dispatch<React.SetStateAction<boolean>>, 
                            setData: React.Dispatch<React.SetStateAction<AllGet200ResponseInner[]>>
                            /*setData: React.Dispatch<React.SetStateAction<NoteDataFromServer[]>>*/,
                            setLoading: React.Dispatch<React.SetStateAction<boolean>>,
                            setAllNotesCopy: React.Dispatch<React.SetStateAction<AllGet200ResponseInner[]>>
                            /*setAllNotesCopy: React.Dispatch<React.SetStateAction<NoteDataFromServer[]>>*/
                          ) {

  try {
    var listOfNotes: AllGet200ResponseInner[] /*NoteDataFromServer[]*/ = await appClient.allGet() //getAllNotes();
    setDataState(false);
    setData(listOfNotes); 
    setAllNotesCopy([...listOfNotes]);  
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
async function deleteNote (id: string | undefined, data: AllGet200ResponseInner[],
                          setData: React.Dispatch<React.SetStateAction<AllGet200ResponseInner[]>>,
                          setAllNotesCopy: React.Dispatch<React.SetStateAction<AllGet200ResponseInner[]>>) {

  try {

    await deleteNoteInServer(id);
    const updatedNotes = data.filter(note => note.id !== id);
    setData(updatedNotes);
    setAllNotesCopy(updatedNotes)

  }
  catch(error) {

    console.log(error);
  
  }

}

function Home() {

    const {
      allNotes, 
      setAllNotes, 
      setAllNotesCopy
    } = useNoteContext();
    
    const [dataState, setDataState] = useState(false);
    const [loading, setLoading] = useState(true);
      
    const navigate = useNavigate();
    
    useEffect(() => {

      const doRetrieveData = async () => {
        await retrieveData(setDataState, setAllNotes, setLoading, setAllNotesCopy);
      }
      
      doRetrieveData();
      console.log("data retreived");

    }, []);
    

    //function to go to add note page
    const goToAddNote = () => {
      navigate("/addNote/Crea una nuova nota/" + true + "/");
    }
    
    //function to handle note selection
    const handleSelectionNote = (id: string | undefined) => {
      navigate("/viewNote/" + id + "/Dettagli Nota/" + false + "/");
    }

    
    
    if(loading)return (<h1>Loading...</h1>);
    if(dataState)return (<h1>Impossibile recuperare i dati</h1>);

    return (
      <div className='homeContainer'>
          
        {/*Header Section*/}
        <SearchAppBar goToAddPage={goToAddNote}  />
  
        {/*Grid with All Notes*/}
        <div className='homeGrid'>
          <Grid2 container spacing={2}>
            {allNotes.map((note , idx) => (
              
              <Grid2 size={{xs: 12, md: allNotes.length === 1 ? 12 : 4}} key={idx} >
                
                <NoteItem 
                  data={note.date} 
                  content={note.content} 
                  title={note.title} 
                  deleteNote={async () => await deleteNote(note.id, allNotes, setAllNotes, setAllNotesCopy)}
                  myOnClick={() => handleSelectionNote(note.id)}/>
              </Grid2>
  
            ))}
          </Grid2>
        </div>
      </div>
    );    
}
export default Home
