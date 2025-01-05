import '../style/HomeStyle.css'

import SearchAppBar from './UpBarComponent'; 
import {  Grid } from '@mui/material'
import NoteItem from './NoteItem';
import { NoteDataFromServer } from '../myInterface/noteInterfaces';
import { useEffect, useState} from 'react';
import { getAllNotes, deleteNoteInServer} from '../httpService';
import { useNavigate } from 'react-router-dom';


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
async function deleteNote (id: string, data: NoteDataFromServer[], setData: React.Dispatch<React.SetStateAction<NoteDataFromServer[]>>) {

  try {

    const noteDeleted = await deleteNoteInServer(id);
    const updatedNotes = data.filter(note => note.id !== id);
    updatedNotes.forEach(n => console.log(n))
    setData(updatedNotes);

  }
  catch(error) {

    console.log(error);
  
  }

}




function Home() {


    const [loading, setLoading] = useState(true);
    const [dataState, setDataState] = useState(false);
    const [data, setData] = useState<NoteDataFromServer[]>([]);
    const navigate = useNavigate();
   

    useEffect(() => {
      console.log("fatta")
      const doRetrieveData = async () => {
        await retrieveData(setDataState, setData, setLoading);
      }
      doRetrieveData();
    
    }, []);
    

    //data.forEach(n => console.log(n.id));
    if(loading)return (<h1>Loading...</h1>);
    if(dataState)return (<h1>Impossibile recuperare i dati</h1>);

    return (
      <div className='homeContainer'>
          
        {/*Header Section*/}
        <SearchAppBar goToAddPage={navigate} route='/addNote'/>
  
        {/*Grid with All Notes*/}
        <div className='homeGrid'>
          <Grid container spacing={2}>
            {data.map((note, idx) => (
              
              <Grid item size={{xs: 12, md: 6}} key={idx}>
                <NoteItem data={note.date} content={note.content} title={note.title} /*id={note.id} for debug*/ deleteNote={async () => await deleteNote(note.id, data, setData)}/>
              </Grid>
  
            ))}
              
          </Grid>
        </div>
      </div>
    );
    
}
export default Home
