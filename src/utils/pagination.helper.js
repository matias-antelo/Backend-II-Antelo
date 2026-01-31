export function generatePaginationLinks(paginationData, baseUrl) {
  const { totalPages, page, limit, sort, query } = paginationData;
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push({
      number: i,
      active: i === page,
      link: `${baseUrl}/?page=${i}&limit=${limit}&sort=${sort || ""}&query=${query || ""}`
    });
  }

  return pages;
}