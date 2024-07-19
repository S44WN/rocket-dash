"use client";
import HandRecongnizer from "@/components/HandRecongnizer";

export default function Home() {
  const setHandResults = () => {
    console.log("Hand Results");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="absolute left-3 top-3 z-30 w-24">
        <HandRecongnizer setHandResults={setHandResults} />
      </div>
    </main>
  );
}
