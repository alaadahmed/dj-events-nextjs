import { useContext } from 'react';
import Link from 'next/link';
import styles from 'styles/Header.module.css';
import Search from './Search';
import AuthContext from 'context/AuthContext';
import { LoginIcon, LogoutIcon } from '@heroicons/react/outline';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>DJ Events</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul className="flex items-center space-x-2">
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
          {user ? (
            // User Logged IN
            <>
              <li>
                <Link href="/events/add">
                  <a>Add Events</a>
                </Link>
              </li>
              <li>
                <Link href="/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <Link href="#" passHref>
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="inline-flex items-center px-3 py-1 text-sm font-semibold text-red-700 border-2 border-red-600 rounded-md shadow-sm hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <LogoutIcon
                      className="w-5 h-5 mr-1 -ml-1"
                      aria-hidden="true"
                    />
                    Logout
                  </button>
                </Link>
              </li>
            </>
          ) : (
            // User Logged OUT
            <li>
              <Link href="/account/login" passHref>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <LoginIcon
                    className="w-5 h-5 mr-1 -ml-1"
                    aria-hidden="true"
                  />
                  Login
                </button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
