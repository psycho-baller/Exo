'use client';

import { Suspense } from 'react';

import Index from '@acme/app/features/questions/screen';

import { AuthShowcase } from './_components/auth-showcase';
import { CreateQuestionForm, PostCardSkeleton, PostList } from './_components/posts';

// export const runtime = "edge";

export default function HomePage() {
  return <Index />;
}
