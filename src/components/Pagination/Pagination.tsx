import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css'; 

interface PaginationProps {
    totalPages: number;
    onPageChange: (selectedPage: number) => void;
}

const Pagination = ({ totalPages, onPageChange }: PaginationProps) => {
    
    const Component = ReactPaginate as unknown as { default: typeof ReactPaginate };
    const RealReactPaginate = Component.default || ReactPaginate;

    return (
        <RealReactPaginate
            pageCount={totalPages} 
            onPageChange={(event: { selected: number }) => {
                onPageChange(event.selected + 1); 
            }}
            containerClassName={css.pagination}
            activeClassName={css.active}
            pageClassName={css.pageItem}
            previousLabel="<"
            nextLabel=">"
        />
    );
};

export default Pagination;