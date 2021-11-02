import Link from 'next/link';
import Image from 'next/image';
import styles from 'styles/EventItem.module.css';
import { formatDate } from 'helpers';

export default function EventItem({ evt }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            evt.image
              ? evt.image.formats.thumbnail.url
              : '/images/event-default.png'
          }
          alt=""
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <span className="text-gray-600">
          {formatDate(evt.date)} at {evt.time}
        </span>
        <h3 className="text-lg font-bold text-gray-800">{evt.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`} passHref>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700"
          >
            <a className="text-white">Details</a>
          </button>
        </Link>
      </div>
    </div>
  );
}
