import Layout from 'components/Layout';
import EventItem from 'components/EventItem';
import Pagination from 'components/ui/Pagination';
import { API_URL, PER_PAGE } from 'config';

export default function EventPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  const eventsRes = await fetch(
    `${API_URL}/events?_sort=date:asc&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventsRes.json();
  return {
    props: { events, page: +page, total },
  };
}
