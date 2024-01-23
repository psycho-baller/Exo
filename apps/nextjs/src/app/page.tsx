"use client"
import { Suspense } from "react";

import { AuthShowcase } from "./_components/auth-showcase";
import {
  CreateQuestionForm,
  PostCardSkeleton,
  PostList,
} from "./_components/posts";
import Index from "@acme/app/features/home/screen";

// export const runtime = "edge";

export default function HomePage() {
  return (
      <Index />
  );
}
