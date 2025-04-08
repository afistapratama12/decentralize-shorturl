import ErrorShorUrl from "@/components/ErrorShortUrl";

export const runtime = 'edge'

export default function ShortCodePage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ErrorShorUrl />
    </div>
  );
}