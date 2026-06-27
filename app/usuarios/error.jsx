"use client"
export default function Error({ error }) {
  return (
    <div>
      <h2>Algo salió mal </h2>
      <p>{error.message}</p>
    </div>
  );
}
