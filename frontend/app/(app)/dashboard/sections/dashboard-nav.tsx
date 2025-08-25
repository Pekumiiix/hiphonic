"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAuth } from "@/provider/auth-provider";

export default function DashboardNav({
  variant = "default",
}: {
  variant?: "default" | "mobile";
}) {
  const { user, isLoading } = useAuth();

  return (
    <div
      className={cn(
        "w-full items-center justify-between px-4 md:px-8 py-[23px] bg-white md:border-l-2 border-grey-50",
        { "flex md:hidden": variant === "mobile", flex: variant === "default" }
      )}
    >
      <div className="flex items-center gap-2.5">
        <p className="hidden md:flex text-2xl font-bold text-grey-900 leading-[125%] traking-[0.2px]">
          Dashboard
        </p>

        <div className="flex md:hidden items-center gap-2">
          <Image src="/assets/logo.png" alt="Logo" width={23} height={23} />
          <p className="text-grey-900 font-bold text-xl leading-[125%] -tracking-[0.29px]">
            Hiphonic
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Avatar title={user?.username || "Guest"} className="max-md:hidden">
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="size-10 rounded-full"
          />
          <AvatarFallback> {user ? user.username : "Guest"}</AvatarFallback>
        </Avatar>

        {isLoading ? (
          <Skeleton className="max-md:hidden h-[14px] w-24" />
        ) : (
          <p className="max-md:hidden text-sm font-bold leading-[160%] text-grey-900 capitalize">
            {user?.username}
          </p>
        )}

        <SidebarTrigger className="md:hidden" />
      </div>
    </div>
  );
}
