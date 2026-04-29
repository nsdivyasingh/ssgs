import { cn } from "@/lib/utils";

function Skeleton({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("skeleton rounded-md bg-muted", className)} {...props}>
      {children}
    </div>
  );
}

export { Skeleton };
