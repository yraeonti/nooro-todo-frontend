import TaskEditor from "@/components/task-editor";
import { BASE_URL } from "@/lib/constants";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const submit = async (data: {}) => {
    "use server";
    try {
      const resp = await axios.post(`${BASE_URL}/tasks`, {
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
      required={true}
      submit={submit}
      buttonChildren={
        <>
          <span>Add Task</span>{" "}
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
        </>
      }
    />
  );
}
