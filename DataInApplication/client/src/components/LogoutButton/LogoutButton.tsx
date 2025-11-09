import { Button } from "../Button";
import "./LogoutButton.css";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { logoutUser, useBtnChanger} from "../../api/User";
import { FC } from "react";

export const LogoutButton:FC = () => {
  const {btnText, setBtnText} = useBtnChanger('Выйти')

  const logoutMutation = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess(){
      queryClient.invalidateQueries({queryKey: ['users', 'me']});
    },
  }, queryClient)

  const handleClick = () => {
    logoutMutation.mutate();
    setBtnText(`Выполнятся выход из кабинета`)
  }

  return (
    <div className="logout-button">
      <Button kind="secondary" type="button" onClick={handleClick} isLoading={logoutMutation.isPending}>{btnText}</Button>
    </div>
  );
};

//кнопку выйти всегда при авторихации
