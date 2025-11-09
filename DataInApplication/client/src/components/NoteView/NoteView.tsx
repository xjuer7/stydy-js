import { FC } from "react";
import "./NoteView.css";
import { FullNote } from "../../api/Notes";

interface NoteViewProps {
  note: FullNote,
  onClick: () => void
}


const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};


export const NoteView: FC<NoteViewProps> = ({ note, onClick }) => {
  return (
    <div className="note-view" onClick={onClick} >
      <div className="note-view__head">
        <p className="note-view__datetime">{formatDate(note.createdAt)}</p>
        <p className="note-view__title">{note.title}</p>
      </div>

      <p className="note-view__text">
        {note.text}
      </p>
    </div>
  );
};