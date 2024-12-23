"use client";
import { fetcher } from "@/lib/utils";
import Link from "next/link";
import useSWR from "swr";
import Loader from "./loader";
import { BASE_URL } from "@/lib/constants";
import Pill from "./pill";
import Task from "./task";
import Image from "next/image";
import axios from "axios";
import Button from "./button";
export default function TodoPage() {
  const { data, isLoading, mutate } = useSWR(`${BASE_URL}/tasks`, fetcher);

  const completed_tasks =
    data &&
    data.data.filter((dat: { completed: boolean }) => dat.completed).length;

  return (
    <div className="w-[96%] sm:w-3/4 mx-auto lg:w-3/5 xl:w-1/2 -mt-6">
      <Link href="/create">
        <Button>
          <span>Create Task</span>{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </Button>
      </Link>

      <section className="mt-6">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-white">
            <span className="text-[#4EA8DE]">Tasks </span>{" "}
            {isLoading || !data ? (
              <Loader className="h-5 w-10" />
            ) : (
              <Pill>{data.data.length}</Pill>
            )}
          </div>

          <div className="flex items-center gap-2 text-white">
            <span className="text-[#8284FA]">Completed</span>
            {isLoading || !data ? (
              <Loader className="h-5 w-10" />
            ) : (
              <Pill>{`${completed_tasks} de ${data.data.length}`}</Pill>
            )}
          </div>
        </div>

        {isLoading || !data ? (
          Array.from({ length: 5 }, (_, i) => (
            <Loader key={i} className="h-20 w-20" />
          ))
        ) : data.data.length == 0 ? (
          <div className="flex flex-col items-center gap-6 text-white mt-20">
            <Image src="/clip.svg" alt="clip" width={56} height={56} />

            <p>You don't have any tasks registered yet.</p>

            <p> Create tasks and organize your to-do items.</p>
          </div>
        ) : (
          data.data.map(
            (dat: {
              title: string;
              completed: boolean;
              id: number;
              color: string;
            }) => <Task key={dat.id} {...dat} mutate={mutate} />
          )
        )}
      </section>
    </div>
  );
}
