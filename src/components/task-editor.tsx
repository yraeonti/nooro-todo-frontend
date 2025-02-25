"use client";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./button";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const colors = [
  "#FF3B30",
  "#FF9500",
  "#FFCC00",
  "#34C759",
  "#007AFF",
  "#5856D6",
  "#AF52DE",
  "#FF2D55",
  "#A2845E",
];

interface Props {
  buttonChildren: ReactNode;
  required?: boolean;
  color?: string;
  title?: string;
  submit: (data: {}) => Promise<boolean>;
}

export default function TaskEditor({
  buttonChildren,
  color: editColor,
  title,
  required,
  submit,
}: Props) {
  const [color, setColor] = useState(editColor || "");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  console.log(color);

  const router = useRouter();

  const onSubmit = async (data: any) => {
    if (required && !color) {
      setError("color", { type: "custom", message: "color is required" });
      return;
    }
    const body = {
      ...data,
    };

    if (color) {
      body["color"] = color;
    }

    const resp = await submit(body);
    if (resp) router.push("/");
  };
  return (
    <div className="w-[96%] sm:w-3/4 mx-auto lg:w-3/5 xl:w-1/2 mt-10">
      <Link href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 fill-white mb-10 mt-13"
        >
          <path
            fillRule="evenodd"
            d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-[#1E6F9F]">
            Title
          </label>
          <input
            {...register("title", {
              required: { value: !!required, message: "title is required" },
            })}
            defaultValue={title || ""}
            className="bg-[#333333] py-4 px-3 outline-none text-white"
            placeholder="Ex. Brush your teeth"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title?.message?.toString()}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-[#1E6F9F]">
            Color
          </label>

          <div className="flex gap-2 flex-wrap">
            {colors.map((c, i) => {
              return (
                <React.Fragment key={i}>
                  <ColorBowl
                    bgColor={c}
                    setColor={setColor}
                    clearError={clearErrors}
                    picked={color === c}
                  />
                </React.Fragment>
              );
            })}
          </div>
          {errors.color && (
            <p className="text-red-500">{errors.color?.message?.toString()}</p>
          )}
        </div>

        <div className="mt-7">
          <Button>{buttonChildren}</Button>
        </div>
      </form>
    </div>
  );
}

interface PropsColorBowl {
  bgColor: string;
  picked?: boolean;
  clearError: (arg?: any) => void;
  setColor: (col: string) => void;
}
const ColorBowl = ({
  bgColor,
  picked,
  setColor,
  clearError,
}: PropsColorBowl) => {
  return (
    <div
      style={{ borderRadius: "50%", backgroundColor: bgColor }}
      onClick={() => {
        clearError && clearError();
        setColor(bgColor);
      }}
      className={cn("size-10", picked && "border-2 border-white")}
    ></div>
  );
};
