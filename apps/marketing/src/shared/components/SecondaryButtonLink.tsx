"use client";
import Link from "next/link";

import { cn, buttonVariants } from "~lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import useBrowserName from "~hooks/use-browser-name";

interface Props extends ComponentPropsWithoutRef<typeof Link> {

}

function Component({
  className,
  ...props
}: Props) {

  const browserName = useBrowserName();

  return (
    <Link
      className={cn(buttonVariants({ variant: "secondary" }), className)}
      {...props}
    >
      <span>{props.children}</span>
    </Link>
  );
}

export default Component;
