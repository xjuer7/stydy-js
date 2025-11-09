import { z } from "zod";
import { validateResponse } from "./validateResponse";

export const FullNoteSchema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  userId: z.string(),
  createdAt: z.number(),
});
export type FullNote = z.infer<typeof FullNoteSchema>;

export const NotesList = z.array(FullNoteSchema);

export type NotesList = z.infer<typeof NotesList>;

export const FetchNotesListSchema = z.object({
  list: NotesList,
});

export type FetchNotesListResponse = z.infer<typeof FetchNotesListSchema>;

export async function fetchData(url: string): Promise<FetchNotesListResponse> {
  const response = await fetch(url);
  validateResponse(response);
  const data = await response.json();
  
  return FetchNotesListSchema.parse(data)
}

export const NoteSchema = z.object({
    title: z.string(),
    text: z.string()
})
export type Note = z.infer<typeof NoteSchema>

export function createNote(data:Note): Promise<void> {
    return fetch('/api/notes', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(validateResponse)
    .then(() => undefined)
}

