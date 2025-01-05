export interface NoteItemProps {

    content: string,
    title: string,
    data: string,
    //updateNotes: (newContent: string, newTitle: string) => void,
    deleteNote: () => void

}
export interface NoteDataFromServer {

    ID: string,
    title: string,
    author: string,
    date: string
    content: string

}
export interface HomeNoteProps {
    notes: NoteDataFromServer[];
}
