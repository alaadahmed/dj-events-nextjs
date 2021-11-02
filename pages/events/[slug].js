import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import AuthContext from 'context/AuthContext';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import Layout from 'components/Layout';
import BackBtn from 'components/ui/BackBtn';
import EventMap from 'components/EventMap';
import { API_URL } from 'config';
import { formatDate, parseCookies } from 'helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from 'styles/Event.module.css';

export default function EventPage({ evt, token }) {
  const { isOwner } = useContext(AuthContext);
  const router = useRouter();
  const deleteEvent = async (e) => {
    e.preventDefault();
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };
  return (
    <Layout>
      <div className={styles.event}>
        {isOwner(evt.user.id) && (
          <div className="flex items-center justify-end space-x-2">
            <Link href={`/events/edit/${evt.id}`} passHref>
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-900 bg-gray-100 border border-gray-200 rounded-md shadow-sm hover:bg-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              >
                <PencilAltIcon
                  className="-ml-0.5 mr-2 h-4 w-4 text-gray-900"
                  aria-hidden="true"
                />
                <a className="text-gray-900">Edit Event</a>
              </button>
            </Link>

            <button
              type="button"
              onClick={deleteEvent}
              className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
            >
              <TrashIcon
                className="-ml-0.5 mr-2 h-4 w-4 text-white"
                aria-hidden="true"
              />
              Delete Event
            </button>
          </div>
        )}
        <span>
          {formatDate(evt.date)} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <ToastContainer />
        <div className={styles.image}>
          <Image
            src={
              evt.image
                ? evt.image.formats.medium.url
                : '/images/event-default.png'
            }
            alt=""
            width={960}
            height={600}
          />
        </div>
        <h3>Performers</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>
        <EventMap evt={evt} />
        <BackBtn />
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/events`);
//   const events = await res.json();

//   const paths = events.map((evt) => ({ params: { slug: evt.slug } }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params: { slug } }) {
//   const res = await axios.get(`${API_URL}/events?slug=${slug}`);
//   const events = res.data;
//   return {
//     props: {
//       evt: events[0],
//     },
//     revalidate: 20,
//   };
// }

export async function getServerSideProps({ query: { slug }, req }) {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();
  return {
    props: {
      evt: events[0],
      token: token || '',
    },
  };
}
