import Link from "next/link"
import React from "react"

export default function ErrorShorUrl() :React.ReactNode {
  return <div className="flex min-h-screen items-center justify-center bg-gray-dark-1">
    <div className="rounded-xl w-full max-w-md border border-gray-dark-4 bg-gray-dark-2 p-8 shadow-2xl">
      <h1 className="text-2xl mb-4 font-bold text-yellow-dark-9">Error</h1>
      <p className="mb-4 text-red-dark-11">Short URL not found or expired.</p>
      <Link
        href="/"
        className="text-yellow-dark-9 hover:text-yellow-dark-10 hover:underline"
      >
        Go back home
      </Link>
    </div>
  </div>
}