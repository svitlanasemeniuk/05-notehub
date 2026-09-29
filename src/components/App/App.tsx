import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal'; 
import NoteForm from '../NoteForm/NoteForm';
import SearchBox from '../SearchBox/SearchBox';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const App = () => {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearchChange = useDebouncedCallback((value: string) => {
        setSearchQuery(value);
        setPage(1); 
    }, 500); 

    
    const { data, isLoading, isError } = useQuery({
        queryKey: ['notes', page, searchQuery],
        queryFn: () => fetchNotes(page, searchQuery),
    });

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                {data && data.totalPages > 1 && (
                <Pagination
                    totalPages={data.totalPages}
                    onPageChange={setPage}
                />
            )}
                <SearchBox onChange={handleSearchChange} />
                <button className={css.button} onClick={() => setIsModalOpen(true)}>
                    Create note +
                </button>
            </header>

            {isLoading && <Loader />}
            {isError && <ErrorMessage />}

            {data && (
                data.notes.length > 0 ? (
                    <NoteList notes={data.notes} /> 
                ) : ( 
                    <p>No notes to display</p>
                )                           
            )}
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <NoteForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
}

export default App;