import { ReactNode } from "react";

export default function Pill({ children }: { children: ReactNode }) {
  return <div className="bg-[#333333] px-3 py-1 rounded-3xl">{children}</div>;
}
