import { ReactNode } from "react";

export default function Button({ children }: { children: ReactNode }) {
  return (
    <button className="flex justify-center items-center gap-2 bg-[#1E6F9F] text-white w-full py-3 rounded-md">
      {children}
    </button>
  );
}
