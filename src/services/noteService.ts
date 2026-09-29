import axios from 'axios';

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN.trim();

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${TOKEN}`
  }
});


export const fetchNotes = async (page: number = 1, search: string = '') => {
  const response = await api.get(`/notes?page=${page}&perPage=12&search=${search}`);
  return response.data;
};

export const createNote = async (newNote: { title: string; content: string; tag: string }) => {
  const response = await api.post('/notes', newNote);
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await api.delete(`/notes/${noteId}`);
  return response.data;
};