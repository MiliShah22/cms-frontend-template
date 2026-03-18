import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <p className="text-7xl mb-5">🔍</p>
      <h1 className="font-playfair text-4xl font-bold mb-3" style={{ color: "#eef0f6" }}>
        Page Not Found
      </h1>
      <p className="text-sm mb-8" style={{ color: "#8e96b5" }}>
        The page you're looking for doesn't exist.
      </p>
      <Link href="/">
        <button
          className="px-8 py-3.5 rounded-xl text-[15px] font-bold"
          style={{ background: "#c9a84c", color: "#080a0e" }}
        >
          Back to Home
        </button>
      </Link>
    </div>
  );
}
