export const paginate = (pageNumber, setCurrentPage) => {
    setCurrentPage(pageNumber);
};

export const goToFirstPage = (setCurrentPage) => {
    setCurrentPage(1);
};

export const goToPrevGroup = (currentPage, setCurrentPage) => {
    const currentGroup = Math.ceil(currentPage / 5);
    if (currentGroup > 1) {
        setCurrentPage((currentGroup - 2) * 5 + 1);
    }
};

export const goToNextGroup = (currentPage, pageNumbers, setCurrentPage) => {
    const lastGroup = Math.ceil(pageNumbers.length / 5);
    const currentGroup = Math.ceil(currentPage / 5);
    if (currentGroup < lastGroup) {
        setCurrentPage(currentGroup * 5 + 1);
    }
};

export const goToLastPage = (items, itemsPerPage, setCurrentPage) => {
    const lastPage = Math.ceil(items.length / itemsPerPage);
    setCurrentPage(lastPage);
};
