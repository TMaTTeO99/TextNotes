import {dataContext} from '../myInterface/myContextDataInterface'
import React, { useContext, useState, createContext, useEffect } from 'react'
import { NoteDataFromServer } from '../myInterface/noteInterfaces';

const NotesContext = createContext<dataContext | null>(null);

export const useNoteContext = () => {
    const context = useContext(NotesContext);
    if (!context) {
      throw new Error('useNoteContext must be used within a NotesProvider');
    }
    return context;
} 
const loadFromLocalStorage = (key: string, defaultValue: any) => {

    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;

}

const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const MyProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    //used to save all data from server
    const [allNotes, setAllNotes] = useState<NoteDataFromServer[]>(() => loadFromLocalStorage('allNotes', []))
    
    //used to see if data are loaded from server
    const [isRetrieveData, setIsRetrieveData] = useState<boolean>(() => loadFromLocalStorage('isRetrieveData', false))
    
    //used whereas data are loaded to see loading message
    const [loading, setLoading] = useState<boolean>(() => loadFromLocalStorage('loading', false))

    //used to pass data in myform when myform is called for view note details
    const [selectedNoteTitle, setSelectedNoteTitle] = useState<string | null>(() => loadFromLocalStorage('selectedNoteTitle', ''))
    const [selectedNoteContent, setSelectedNoteContent] = useState<string | null>(() => loadFromLocalStorage('selectedNoteContent', ''))
    
    //used to change header text in myform
    const [headerText, setheaderText] = useState(() => loadFromLocalStorage('headerText', ''))
    
    //useeffect to save data in localstorage when they change
    useEffect(() => {saveToLocalStorage("allNotes", allNotes)}, [allNotes]);
    useEffect(() => {saveToLocalStorage("isRetrieveData", isRetrieveData)}, [isRetrieveData]);
    useEffect(() => {saveToLocalStorage("loading", loading)}, [loading]);
    useEffect(() => {saveToLocalStorage("selectedNoteTitle", selectedNoteTitle)}, [selectedNoteTitle]);
    useEffect(() => {saveToLocalStorage("selectedNoteContent", selectedNoteContent)}, [selectedNoteContent]);
    useEffect(() => {saveToLocalStorage("headerText", headerText)}, [headerText]);
    
    
    
    return (
        <NotesContext.Provider value={{
                isRetrieveData, 
                allNotes, 
                setIsRetrieveData, 
                setAllNotes, 
                loading, 
                setLoading,
                selectedNoteTitle, 
                setSelectedNoteTitle, 
                selectedNoteContent, 
                setSelectedNoteContent,
                headerText, 
                setheaderText
            }}>
            {children}
        </NotesContext.Provider>
    );

}
