import DashboardEvent from 'components/DashboardEvent';
import Layout from 'components/Layout';
import { API_URL } from 'config';
import { parseCookies } from 'helpers';
import router from 'next/router';
import { toast, ToastContainer } from 'react-toastify';

export default function DashboardPage({ events, token }) {
  const deleteEvent = async (id) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      } else {
        router.reload();
      }
    }
  };

  return (
    <Layout title="Dashboard">
      <h1 className="font-bold">Dashboard</h1>
      <ToastContainer />
      <h3 className="mb-3 text-xl font-bold text-red-600">My Events</h3>
      <div className="space-y-3">
        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();
  return {
    props: { events, token },
  };
}
