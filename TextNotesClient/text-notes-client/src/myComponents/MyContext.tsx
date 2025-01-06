import {dataContext} from '../myInterface/myContextDataInterface'
import React, { useContext, useState, createContext, useEffect } from 'react'
import { NoteDataFromServer } from '../myInterface/noteInterfaces';

const NotesContext = createContext<dataContext | null>(null);

export const useNoteContext = () => {
    return useContext(NotesContext);
} 

export const MyProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [allNotes, setAllNotes] = useState<NoteDataFromServer[]>([])
    const [isRetrieveData, setIsRetrieveData] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    return (
        <NotesContext.Provider value={{isRetrieveData, allNotes, setIsRetrieveData, setAllNotes, loading, setLoading}}>
            {children}
        </NotesContext.Provider>
    );

}
