
import { Loader } from "../Loader";
import { NotesListView } from "./NotesListView";
 import { useFetchNotes } from './useFetchNotes'

export const FetchNotesListView = () => {
  const {loading, error, refetch, notesList} = useFetchNotes()
  if (loading) return <Loader />;
  if (error) return (
    <div>
      <span>Произошла ошибка!</span>
      <div>{error.message}</div>
      <button onClick={() =>refetch()}>Повторить запрос</button>
    </div>
  );

  return <NotesListView notesList={notesList} />;
};
