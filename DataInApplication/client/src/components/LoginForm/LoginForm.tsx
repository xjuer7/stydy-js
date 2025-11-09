import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { FC, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login, useBtnChanger } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import '../Account/Account.css'


export const CreateLoginSchema = z.object({
  email: z.string().min(5, 'Почта должна содержать не менее 5 символов'),
  password: z.string().min(8, 'Пароль слишком короткий'),
})

export type CreateLoginForm = z.infer<typeof CreateLoginSchema>

export const LoginForm: FC = () => {
  const {btnText, setBtnText} = useBtnChanger('Войти')

   const { register, handleSubmit, formState: { errors } } = useForm<CreateLoginForm> ({
      resolver: zodResolver(CreateLoginSchema)
    })

  const loginMutation = useMutation({
    mutationFn: login,
    onMutate() {
      setBtnText('Выполняется вход...')
    },
    onSuccess(){
      queryClient.invalidateQueries({queryKey: ['users', 'me']})
    },
    onError() {
      setBtnText('Войти')
    }
  }, queryClient)


  const handleResetError = () => {
    if(loginMutation.error) {
      loginMutation.reset()
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit((data) => loginMutation.mutate(data))}>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input 
        {...register('email')}
        onChange={handleResetError}
        />
       
      </FormField>

      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input 
        type="password"
        {...register('password')}
        onChange={handleResetError}

        />
      </FormField>

      {loginMutation.error && <span className="errorMessage">{loginMutation.error.message}</span>}

      <Button type="submit" isLoading = {loginMutation.isPending}>{btnText}</Button>
    </form>
  );
};
