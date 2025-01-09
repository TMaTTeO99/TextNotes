import React from "react"
import {AllGet200ResponseInner} from '../../out/models/AllGet200ResponseInner'
/*
    Interface used to shared data in through my Context
*/
export interface dataContext {

    allNotes: AllGet200ResponseInner[] // data that has been recovered
    setAllNotes: React.Dispatch<React.SetStateAction</*NoteDataFromServer[]*/AllGet200ResponseInner[]>>,
    
    //i need a copy of my note to build search feature
    allNotesCopy: AllGet200ResponseInner[] // data that has been recovered
    setAllNotesCopy: React.Dispatch<React.SetStateAction<AllGet200ResponseInner[]>>,
}
