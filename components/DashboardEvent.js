import Link from 'next/link';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';

export default function DashboardEvent({ evt, handleDelete }) {
  return (
    <div className="p-4 border border-gray-100 rounded shadow bg-gray-50">
      <div className="flex items-center justify-between">
        <Link href={`/events/${evt.slug}`}>
          <a className="text-xl font-semibold text-gray-700 hover:text-gray-800">
            {evt.name}
          </a>
        </Link>

        <div className="flex items-center space-x-2">
          <Link href={`/events/edit/${evt.id}`}>
            <a className="flex items-center justify-center w-16 h-8 px-2 py-0.5 space-x-1 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 hover:border-gray-400">
              <PencilAltIcon className="flex-shrink-0 w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Edit</span>
            </a>
          </Link>
          <Link href="#">
            <a
              onClick={() => handleDelete(evt.id)}
              className="flex items-center justify-center w-20 h-8 px-2 py-0.5 space-x-1 bg-red-500 border border-red-600 rounded-md hover:bg-red-600 hover:border-red-700"
            >
              <TrashIcon className="flex-shrink-0 w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Delete</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
