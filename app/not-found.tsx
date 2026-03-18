import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 bg-[#f1f5f9]">
      <div className="text-7xl mb-5">🔍</div>
      <h1 className="font-poppins text-4xl font-bold text-[#0f172a] mb-3">Page Not Found</h1>
      <p className="text-sm text-[#64748b] mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/"
        className="px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-[#6366f1] hover:bg-[#4f46e5] transition-all shadow-sm">
        Back to Home
      </Link>
    </div>
  );
}
