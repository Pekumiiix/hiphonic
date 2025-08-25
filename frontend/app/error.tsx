"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-full flex flex-col items-center gap-2.5 my-[150px]">
      <p className="text-3xl font-semibold">Something went wrong</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
