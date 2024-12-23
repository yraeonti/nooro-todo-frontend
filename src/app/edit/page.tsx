import TaskEditor from "@/components/task-editor";
import { BASE_URL } from "@/lib/constants";
import axios from "axios";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    title: string | undefined;
    color: string | undefined;
    id: string | undefined;
  }>;
}) {
  const params = await searchParams;

  console.log(params);

  const submit = async (data: {}) => {
    "use server";
    try {
      const resp = await axios.put(`${BASE_URL}/tasks/${params.id}`, {
        ...data,
      });

      if (resp.status === 200) return true;
      return false;
    } catch (error) {
      return false;
    }
  };
  return (
    <TaskEditor
      submit={submit}
      title={params.title}
      color={params.color}
      buttonChildren={
        <>
          <span>Save</span>{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke=""
            className="size-6 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </>
      }
    />
  );
}
