export interface NoteItemProps {

    content: string,
    title: string,
    data: string,
    //id: string, for debug
    //updateNotes: (newContent: string, newTitle: string) => void,
    deleteNote: () => void

}
export interface NoteDataFromServer {

    id: string,
    title: string,
    author: string,
    date: string
    content: string

}
export interface HomeNoteProps {
    notes: NoteDataFromServer[];
}
