import axios from 'axios';
import type { Note } from '../types/note'; 

const TOKEN = (import.meta.env.VITE_NOTEHUB_TOKEN || '').trim();

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${TOKEN}`
  }
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (page: number = 1, search: string = ''): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>(`/notes?page=${page}&perPage=12&search=${search}`);
  return response.data;
};

export const createNote = async (newNote: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> => {
  const response = await api.post<Note>('/notes', newNote);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${noteId}`);
  return response.data;
};