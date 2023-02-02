export default function Error({ errorMessage }: { errorMessage: string }) {
  return (
    <span
      className={`${
        errorMessage ? "" : "invisible"
      } text-red-600 text-base h-6`}
    >
      {errorMessage}
    </span>
  );
}
