import React from "react";
import '../style/NoteItemStyle.css'
import { Card, CardContent, Button, Typography } from '@mui/material';
import { NoteItemProps } from "../myInterface/noteInterfaces";

/**
 * I define an interface to handle note behaviour from parent component
 */


const NoteItem: React.FC<NoteItemProps> = ({content, title, data, /* ffor debug id,*/ deleteNote}) => {

    return (
        <Card style={{maxWidth: '250px', height: '100'}}>
            <CardContent>
                <Typography variant="h6" className="notestyle">
                    {title}
                </Typography>
                {/* 
                     for debug
                    <Typography variant="h6" >
                        {id + "ID"}
                    </Typography>
                */}
                
                <Typography  className="notestyle">
                    {data}
                </Typography>
                <Typography variant="body1" className="notestyle" style={{marginTop: '10px'}}>
                    {content}
                </Typography>
                <Button onClick={deleteNote} style={{marginTop: '10px'}}>
                    DELETE
                </Button>
            </CardContent>
        </Card>
    )
}
export default NoteItem;