export default function Error({ errorMessage }: { errorMessage: string }) {
  return (
    <span
      className={`${
        errorMessage ? "" : "invisible"
      } bg-red-100 p-2 text--black text-base mt-4 h-10`}
    >
      {errorMessage}
    </span>
  );
}
