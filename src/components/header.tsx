import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-[#0D0D0D] w-full flex justify-center h-52">
      <div className="flex items-center gap-3">
        <Image src="/rocket.svg" height={36} width={22} alt="rocket" />

        <div className="text-5xl">
          <span className="text-[#4EA8DE] ">Todo</span>
          <span className="text-[#5E60CE]"> App</span>
        </div>
      </div>
    </header>
  );
}
