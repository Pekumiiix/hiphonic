import Image from "next/image";

export default function FormContainer({
  headline,
  description,
  children,
}: {
  headline: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-col gap-10 md:flex-row md:gap-0 items-center justify-start">
      <div className="w-full flex md:hidden items-center gap-2">
        <Image src="/assets/logo.png" alt="Logo" width={23} height={23} />
        <p className="text-[19px] font-bold leading-[125%] text-grey-900">
          Hiphonic
        </p>
      </div>

      <div className="w-full md:w-[404px] flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-[22px] xl:text-2xl font-bold leading-[125%] tracking-[0.2px] text-grey-900">
            {headline}
          </p>
          <p className="text-sm leading-[160%] text-grey-500">{description}</p>
        </div>

        {children}
      </div>
    </div>
  );
}
