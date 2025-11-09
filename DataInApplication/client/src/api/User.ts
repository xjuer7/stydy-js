import { z } from "zod";
import { validateResponse } from "./validateResponse";
import { CreateRegisterForm } from "../components/RegisterForm";
import { CreateLoginForm } from "../components/LoginForm";
import { useState } from "react";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export function fetchUser(id: string): Promise<User> {
  return fetch(`/api/users/${id}`)
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));
}

export function registerUser(data: CreateRegisterForm): Promise<void> {
  return fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then(validateResponse)
  .then(() => undefined)
   //чтобы типы сошлись
}

export function login(data:CreateLoginForm): Promise<void> {
  return fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(validateResponse) //проверяем на ошибки с сервера
    .then(() => undefined); //возвращаем пустые данные
}

export function fetchMe(): Promise<User> {
  return fetch("/api/users/me")
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));
}

export function logoutUser(): Promise<void> {
  return fetch("/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function useBtnChanger(initialText = '') {
  const [btnText, setBtnText] = useState(initialText)
  return {btnText, setBtnText}
}
