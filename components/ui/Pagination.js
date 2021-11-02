import Link from 'next/link';
import { PER_PAGE } from 'config';

export default function Pagination({ page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);
  return (
    <nav
      className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to{' '}
          <span className="font-medium">10</span> of{' '}
          <span className="font-medium">{total}</span> events
        </p>
      </div>
      <div className="flex justify-between flex-1 sm:justify-end">
        {page > 1 && (
          <Link href={`/events?page=${page - 1}`}>
            <a className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Previous
            </a>
          </Link>
        )}

        {page < lastPage && (
          <Link href={`/events?page=${page + 1}`}>
            <a className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Next
            </a>
          </Link>
        )}
      </div>
    </nav>
  );
}
