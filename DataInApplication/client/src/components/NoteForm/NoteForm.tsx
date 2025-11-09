import { FormField } from "../FormField";
import { Button } from "../Button";
import "./NoteForm.css";
import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNote } from "../../api/Notes";
import { z } from "zod";

export const CreateNoteForm = z.object({
  title: z.string().min(5, 'Заголовок должен содержать не менее 5 символов'),
  text: z.string().min(10, 'Текст заметки слишком короткий').max(300, 'Ограничение заметки - 300 символов')
})

export type CreateNoteFormType = z.infer<typeof CreateNoteForm>

export const NoteForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateNoteFormType>({
    resolver: zodResolver(CreateNoteForm),
  });

  const createNoteMutation = useMutation(
    {
      mutationFn: createNote,
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        reset()
      },
    },
    queryClient);

  return (
    <form
      className="note-form"
      onSubmit={handleSubmit((data) => {
        createNoteMutation.mutate(data)
      })}
    >
      <FormField label="Заголовок" errorMessage={errors.title?.message}>
        <input type="text" {...register("title")} />
      </FormField>
      <FormField label="Текст" errorMessage={errors.text?.message}>
        <textarea {...register("text")} />
      </FormField>

      {createNoteMutation.error && <span>{createNoteMutation.error.message}</span>}

      <Button type="submit" 
      isLoading={createNoteMutation.isPending}
      >
        Сохранить
      </Button>
    </form>
  );
};
