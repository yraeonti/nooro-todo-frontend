import { BASE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Checkbox } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

interface Props {
  title: string;
  color: string;
  id: number;
  completed: boolean;
  mutate: () => {};
}

export default function Task({ title, completed, id, mutate, color }: Props) {
  const [enabled, setEnabled] = useState(false);

  const updateCheck = async (completed: boolean) => {
    const resp = await axios.put(`${BASE_URL}/tasks/${id}`, {
      completed,
    });

    console.log("update", resp);

    if (resp.status === 200) {
      mutate();
    }
  };

  return (
    <Link href={{ pathname: "/edit", query: { title, color, id } }}>
      <div className="flex w-full bg-[#333333] py-5 px-3 md:px-5  my-3">
        <div className="w-[85%] flex items-center gap-3 text-white">
          <Checkbox
            checked={enabled}
            onChange={(comp) => {
              updateCheck(comp);
              setEnabled(comp);
            }}
            className={cn(
              "group size-6 rounded-full bg-transparent p-1 ring-2 ring-[#4EA8DE] data-[checked]:bg-[#5E60CE] data-[checked]:ring-[#5E60CE]",
              completed && "bg-[#5E60CE] ring-[#5E60CE]"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={cn(
                "hidden size-4 stroke-white group-data-[checked]:block",
                completed && "block"
              )}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </Checkbox>

          <p
            className={cn(
              "self-start",
              completed && "line-through text-[#808080]"
            )}
          >
            {title}
          </p>
        </div>

        <div className="w-[15%] flex justify-end items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 stroke-[#808080]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
