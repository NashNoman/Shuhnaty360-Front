import { cn } from "@/lib/utils";

type ShipmentSectionWrapperProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const ShipmentSectionWrapper = ({
  title,
  children,
  className,
}: ShipmentSectionWrapperProps) => {
  return (
    <>
      <h1 className="font-bold text-xl sm:text-2xl">{title}</h1>
      <div className={cn("w-full grid gap-10 my-10 md:grid-cols-2", className)}>
        {children}
      </div>
    </>
  );
};

export default ShipmentSectionWrapper;
