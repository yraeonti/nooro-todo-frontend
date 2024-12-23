import { cn } from "@/lib/utils";

export default function Loader({ className }: { className: string }) {
  return <div className={cn("animate-pulse", className)}></div>;
}
