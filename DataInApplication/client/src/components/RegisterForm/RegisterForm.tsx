import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser, useBtnChanger } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'
import { useForm } from "react-hook-form";
import '../Account/Account.css'


export const CreateRegisterSchema = z.object({
  username: z.string().min(5, "Имя должно быть не менее 5 символов"),
  email: z.string().email('Некорректный адрес почты'),
  password: z.string().min(8, 'Пароль слишком короткий'),
})

export type CreateRegisterForm = z.infer<typeof CreateRegisterSchema>

export const RegisterForm: FC = () => {
  const {btnText, setBtnText} = useBtnChanger('Зарегистрироваться')
  const { register, handleSubmit, formState: { errors }} = useForm<CreateRegisterForm> ({
    resolver: zodResolver(CreateRegisterSchema)
  })

  const registerMutation  = useMutation(
    {
      mutationFn: registerUser,
      onMutate() {
        setBtnText('Выполняется вход...')
      },
      onSuccess() {
        queryClient.invalidateQueries({queryKey: ['users', 'me']})
      },
      onError() {
        setBtnText('Зарегистрироваться')
      }
    },
    queryClient
  );

  const handleResetError = () => {
    if(registerMutation.error) {
      registerMutation.reset()
    }
  }

  return (
    <form className="register-form" onSubmit={handleSubmit((data:CreateRegisterForm) => {
      registerMutation.mutate(data)
    })}>
      <FormField label="Имя" errorMessage={errors.username?.message}>
        <input
          {...register('username')}
          onChange={handleResetError}
        />
      </FormField>

      <FormField label="Email" errorMessage={errors.email?.message}>
        <input
          {...register('email')}
          onChange={handleResetError}
        />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input
        {...register('password')}
        type="password"
        onChange={handleResetError}
        />
      </FormField>

      {registerMutation.error && <span className="errorMessage">{registerMutation.error.message}</span>}
      <Button type="submit" isLoading={registerMutation.isPending}>{btnText}</Button>
    </form>
  );
};
