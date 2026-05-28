import type { PaginationProps } from "../types";

const Pagination = ({ page, pages, total, onPageChange }: PaginationProps) => {
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6">
      <p className="text-sm text-gray-500">Total: {total} tareas</p>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="text-sm px-3 py-1 rounded-lg bg-white border hover:bg-gray-50 transition disabled:opacity-40"
        >
          Anterior
        </button>
        <span className="text-sm px-3 py-1 text-gray-600">
          {page} / {pages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === pages}
          className="text-sm px-3 py-1 rounded-lg bg-white border hover:bg-gray-50 transition disabled:opacity-40"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Pagination;
