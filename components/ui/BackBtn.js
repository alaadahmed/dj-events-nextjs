import { useRouter } from 'next/router';

export default function BackBtn() {
  const router = useRouter();
  return (
    <button
      className="mb-2 font-medium text-blue-500 hover:text-blue-600"
      onClick={() => router.back()}
    >
      {'<'} Go Back
    </button>
  );
}
