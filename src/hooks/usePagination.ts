import { useMemo } from 'react';

const range = (start: number, end: number) => {
	let length = end - start + 1;
	return Array.from({ length }, (_, idx) => idx + start);
};
export const DOTS = '...';
export const usePagination = (total: number, pageSize: number, siblingCount: number = 1, currentPage: number) => {
	const paginationRange = useMemo(() => {
		const totalPageCount = Math.ceil(total / pageSize);

		// Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
		// Represent total elements displayed in pagination
		// 1 ... leftSibling1 leftSibling2 currentPage rightSibling2 rightSibling1 ... lastPage
		const totalPageNumbers = siblingCount + 5;

		/*
            Case 1: 
            If the number of pages is less than the page numbers we want to show in our paginationComponent,
            return range from [1, totalPageCount]
        */
		if (totalPageNumbers >= totalPageCount) {
			return range(1, totalPageCount);
		}

		/* Calculate left and right sibling index and make sure they are in range 1 and to totalPageCount */
		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

		const shouldShowLeftDots = leftSiblingIndex > 2;
		const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

		const firstPageIndex = 1;
		const lastPageIndex = totalPageCount;

		/*
            Case 2:
            Only shows right dots 
        */
		if (!shouldShowLeftDots && shouldShowRightDots) {
			let leftItemCount = 3 + 2 * siblingCount; // Fixed at 5
			let leftRange = range(1, leftItemCount); // From 1 to 5
			return [...leftRange, DOTS, totalPageCount]; // 1...5, "...", 57
		}
		/* 
            Case 3:
            Only shows left dots
        */
		if (shouldShowLeftDots && !shouldShowRightDots) {
			let rightItemCount = 3 + 2 * siblingCount; // Fixed at 5
			let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount); // From 53 to 57
			return [firstPageIndex, DOTS, ...rightRange]; // 1, "...", 56...57
		}

		/* 
            Case 4:
            Show both left and right dots
        */
		if (shouldShowLeftDots && shouldShowRightDots) {
			let middleRange = range(leftSiblingIndex, rightSiblingIndex); // currentPage = 23 -> leftSibling = 22, rightSibling = 24
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]; // 1, "...", 22, 23, 24, "...", 57
		}
	}, [total, pageSize, siblingCount, currentPage]);

	return paginationRange;
};
