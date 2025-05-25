"use client";
import { type FC, type ComponentPropsWithoutRef, useState, type FormEvent } from "react";
// import { api } from "../../../../../packages/server-api/utils/trpc"
import Link from "next/link";
import { siteConfig } from "~config/site";

interface Props extends ComponentPropsWithoutRef<"header"> { }

export const WaitlistForm: FC<Props> = () => {
  // const { mutateAsync } = api.waitlist.create.useMutation();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // await mutateAsync({ email });
    setEmail("");


  }


  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap gap-5">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email address"
          className="rounded-full border border-stroke px-6 py-2.5 shadow-solid-2 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
        />
        <Link
          href={siteConfig.links.waitlist}>
          <button
            type="submit"
            aria-label="get started button"
            className="flex rounded-full bg-black px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
          >
            Join Waitlist
          </button>
        </Link>
      </div>
    </form>
  );
};

export default WaitlistForm;