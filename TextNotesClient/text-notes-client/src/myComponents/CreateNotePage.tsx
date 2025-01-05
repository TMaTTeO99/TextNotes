import '../style/AddNotePageStyle.css';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';

export default function MyNoteForm() {
    
  const navigate = useNavigate();

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
          fullWidth
        />
        <Button 
          sx={{ 
            mt: 1,
            alignSelf: 'flex-end'
          }}
        >
          Save
        </Button>
      </div>
    </Box>
  );
}
