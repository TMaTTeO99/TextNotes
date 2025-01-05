import '../style/HomeStyle.css'

import SearchAppBar from './UpBarComponent'; 
import { Grid } from '@mui/material'
import NoteItem from './NoteItem';
import { NoteDataFromServer, HomeNoteProps } from '../myInterface/noteInterfaces';

const Home: React.FC<HomeNoteProps> = ({notes}) => {

    return (
      <div className='homeContainer'>
        
        {/*Header Section*/}
        <SearchAppBar />

        {/*Grid with All Notes*/}
        <div className='homeGrid'>
          <Grid container spacing={2}>
            {notes.map((note, idx) => (
              
              <Grid item size={{xs: 12, md: 6}} key={idx}>
                <NoteItem data={note.date} content={note.content} title={note.title} deleteNote={() => console.log("ciaoooo")}/>
              </Grid>

            ))}
            
          </Grid>
        </div>
      </div>
    );
}
export default Home
