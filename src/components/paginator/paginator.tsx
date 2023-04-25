import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DOTS, usePagination } from '../../hooks/usePagination';
import classes from './paginator.module.scss';
import React from 'react';
interface PaginatorProps {
	total: number;
	current: number;
	pageSize: number;
	onPageChange: (currentPage: number) => void;
	siblingCount?: number;
}
export const Paginator = ({ total, current, pageSize, onPageChange, siblingCount = 4 }: PaginatorProps) => {
	const paginationRange = usePagination(total, pageSize, siblingCount, current);

	const onNextPage = () => {
		onPageChange(current + 1);
	};

	const onPreviousPage = () => {
		onPageChange(current - 1);
	};

	const lastPage = paginationRange![paginationRange!.length - 1];

	return (
		<div className={classes['paginator']}>
			<div
				className={`${classes['page-change-btn']} ${classes['previous']} ${
					current === 1 ? `${classes['disabled']}` : ''
				}`}
				onClick={onPreviousPage}
			>
				<FontAwesomeIcon icon={faChevronLeft} className={classes['icon']} />
				<span>Previous</span>
			</div>
			{paginationRange?.map((pageNumber, idx) => {
				if (pageNumber === DOTS) {
					return <span key={idx}>&#8230;</span>;
				}

				return (
					<span
						className={`${classes['page-number']} ${pageNumber === current ? `${classes['selected']}` : ''}`}
						onClick={() => onPageChange(pageNumber as number)}
						key={idx}
					>
						{pageNumber}
					</span>
				);
			})}
			<div
				className={`${classes['page-change-btn']} ${classes['next']} ${
					current === lastPage ? `${classes['disabled']}` : ''
				}`}
				onClick={onNextPage}
			>
				<span>Next</span>
				<FontAwesomeIcon icon={faChevronRight} className={classes['icon']} />
			</div>
		</div>
	);
};
