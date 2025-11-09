import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { Loader } from "../Loader";
import { AuthForm } from "../AuthForm";
import { UserView } from "../UserView";
import { FetchNotesListView } from "../NotesListView/FetchNotesListView.js";
import { LogoutButton } from "../LogoutButton";
import { NoteForm } from "../NoteForm";
import './Account.css'

export const Account = () => {
  const meQuery = useQuery(
    {
      queryFn: () => fetchMe(),
      queryKey: ["users", "me"],
    },
    queryClient
  );

  switch(meQuery.status) {
    case "pending":
        return <Loader />;
    case "error" :
        return <AuthForm />;
    case "success":
        return (
            <div className="notes-container">
              <UserView user={meQuery.data}/>
              <NoteForm/>
              <FetchNotesListView/>
              <LogoutButton/>
            </div>
        )
  }
};
