import Image from "next/image";
import { Ripple } from "@/components/magicui/ripple";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container min-w-full min-h-screen h-fit flex bg-red-800">
      <HiphonicDescriptionSection />

      <div className="w-1/2 min-h-screen pl-[164px] pt-[160px] pb-[104px] bg-background">
        {children}
      </div>
    </section>
  );
}

function HiphonicDescriptionSection() {
  return (
    <div className="relative w-1/2 min-h-full bg-primary-600 flex flex-col gap-[60px] p-12 pr-[92px]">
      <div className="flex items-center gap-[11px]">
        <Image
          src="/assets/auth/white-logo.png"
          alt="Logo"
          width={33}
          height={33}
        />
        <p className="text-[22px] font-bold leading-[125%] -tracking-[0.35px] text-primary-foreground">
          Hiphonic
        </p>
      </div>

      <div className="w-full h-full flex flex-col items-end justify-center gap-12">
        <div className="relative overflow-hidden h-[524px] w-[500px] flex items-center justify-center">
          <Ripple numCircles={7} mainCircleSize={100} />
          <Image
            src="/assets/auth/Illustration.png"
            alt="Logo"
            width={343}
            height={409}
            className="z-10"
          />
        </div>

        <div className="flex flex-col gap-3 items-center">
          <p className="text-2xl font-bold leading-[125%] tracking-[0.2px] text-primary-foreground">
            Customizable Multipurpose Dashboard
          </p>
          <p className="text-sm text-grey-50 leading-[160%]">
            Everything you need in an easily customizable dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
