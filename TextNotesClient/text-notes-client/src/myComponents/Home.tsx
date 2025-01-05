import '../style/HomeStyle.css'

import SearchAppBar from './UpBarComponent'; 
import { Grid } from '@mui/material'
import NoteItem from './NoteItem';
import { NoteDataFromServer, HomeNoteProps } from '../myInterface/noteInterfaces';
import { useEffect, useState} from 'react';
import { getAllNotes } from '../httpService';


/*
  Retrieve all notes from server
*/
function retrieveData(setDataState: React.Dispatch<React.SetStateAction<boolean>>, setData: React.Dispatch<React.SetStateAction<NoteDataFromServer[]>>) {

  getAllNotes()
    .then(listOfNotes => {
      setDataState(false);
      setData(listOfNotes)      
  })
  .catch(error => {
    console.log(error)
    setDataState(true);
    setData([])
  });

}




function Home() {


  
    const [dataState, setDataState] = useState(false);
    const [data, setData] = useState<NoteDataFromServer[]>([]);

    useEffect(() => {retrieveData(setDataState, setData)}, []);


    if(!dataState){




      
      return (
        <div className='homeContainer'>
          
          {/*Header Section*/}
          <SearchAppBar />
  
          {/*Grid with All Notes*/}
          <div className='homeGrid'>
            <Grid container spacing={2}>
              {data.map((note, idx) => (
                
                <Grid item size={{xs: 12, md: 6}} key={idx}>
                  <NoteItem data={note.date} content={note.content} title={note.title} deleteNote={() => console.log("ciaoooo")}/>
                </Grid>
  
              ))}
              
            </Grid>
          </div>
        </div>
      );
    }
    else {
      return (
        <>
          <h1>Impossibile recuperare i dati</h1>
        </>
      )
    }

   
}
export default Home
