import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Image
        src="/assets/dashboard/not-found.png"
        alt="Page not found"
        width={300}
        height={300}
      />
      <div className="flex flex-col items-center gap-2.5">
        <p className="text-3xl font-semibold">Page Not Found</p>
        <Button
          asChild
          variant="outline"
          className="h-12 p-4 rounded-full border-grey-800 text-grey-800 text-base font-medium"
        >
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
