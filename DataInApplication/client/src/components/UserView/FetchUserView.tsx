import { useQuery } from "@tanstack/react-query";
import { fetchUser, User } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { FC } from "react";
import { Loader } from "../Loader";
import { UserView } from "./UserView";

interface FetchUserViewProps {
  user: User;
}

export const FetchUserView: FC<FetchUserViewProps> = ({ user }) => {
  const userQuery = useQuery(
    {
      queryFn: () => fetchUser(user.id),
      queryKey: ["users", user.id],
    },
    queryClient
  );

  switch (userQuery.status) {
    case "pending":
      return <Loader />;
    case "success":
      return <UserView user={userQuery.data} />;
    case "error":
      return (
        <div>
          <span>Произошла ошибка!</span>
          <button onClick={() => userQuery.refetch()}>Повторить запрос</button>
        </div>
      );
  }
};
