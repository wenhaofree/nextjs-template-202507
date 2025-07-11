import Link from 'next/link'
// import { Component } from "@/components/ui/404-page-not-found";
// import './globals.css'
import { NotFound as GhostNotFound } from "@/components/ui/ghost-404-page"

export default function NotFound() {
    // return <Component />;
      return (
    <div className="min-h-screen w-full bg-white">
      <GhostNotFound />
    </div>
  );

}