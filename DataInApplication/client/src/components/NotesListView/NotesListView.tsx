import "./NotesListView.css";
import { NoteView } from "../NoteView";
import { NotesList } from "../../api/Notes";
import { FC, useState } from "react";

export interface NotesListViewProps {
  notesList: NotesList
}

export const NotesListView: FC<NotesListViewProps> = ({ notesList }) => {
  const [note, setNote] = useState('')

  function deleteNote(id: string) {
    setNote(id);
    const newList = notesList.filter(item => item.id !== id);
    console.log(newList);
  }
  
  return (
    <ul className="note-list-view">
      {notesList.map((note) => (
         <li key={note.id}>
         <NoteView note={note} onClick={() => deleteNote(note.id)}/>
       </li>
      ))}
    </ul>
  );
};

