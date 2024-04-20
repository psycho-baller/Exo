'use client';

import { useState } from 'react';

import { auth } from '@acme/auth';

import { api } from '~/utils/api';
import type { RouterOutputs } from '~/utils/api';

export async function CreateQuestionForm() {
  const context = api.useContext();
  const session = await auth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { mutateAsync: createQuestion, error } = api.question.create.useMutation({
    async onSuccess() {
      setTitle('');
      setContent('');
      await context.user.all.invalidate();
    },
  });

  return (
    <form
      className='flex w-full max-w-2xl flex-col'
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await createQuestion({
            text: title,
            createdByUserId: session?.user.id,
          });
          setTitle('');
          setContent('');
          await context.question.all.invalidate();
        } catch {
          // noop
        }
      }}
    >
      <input
        className='mb-2 rounded bg-white/10 p-2 text-white'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Title'
      />
      {error?.data?.zodError?.fieldErrors.title && (
        <span className='mb-2 text-red-500'>{error.data.zodError.fieldErrors.title}</span>
      )}
      <input
        className='mb-2 rounded bg-white/10 p-2 text-white'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Content'
      />
      {error?.data?.zodError?.fieldErrors.content && (
        <span className='mb-2 text-red-500'>{error.data.zodError.fieldErrors.content}</span>
      )}
      {}
      <button type='submit' className='rounded bg-pink-400 p-2 font-bold'>
        Create
      </button>
      {error?.data?.code === 'UNAUTHORIZED' && (
        <span className='mt-2 text-red-500'>You must be logged in to post</span>
      )}
    </form>
  );
}

export function PostList() {
  const [questions] = api.question.all.useSuspenseQuery();

  if (questions.length === 0) {
    return (
      <div className='relative flex w-full flex-col gap-4'>
        <PostCardSkeleton pulse={false} />
        <PostCardSkeleton pulse={false} />
        <PostCardSkeleton pulse={false} />

        <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/10'>
          <p className='text-2xl font-bold text-white'>No questions yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col gap-4'>
      {questions.map((q) => {
        return <PostCard key={q.id} question={q} />;
      })}
    </div>
  );
}

export function PostCard(props: {
  question: RouterOutputs['question']['all'][number];
}) {
  const context = api.useContext();
  const deleteQuestion = api.question.delete.useMutation();

  return (
    <div className='flex flex-row rounded-lg bg-white/10 p-4 transition-all hover:scale-[101%]'>
      <div className='flex-grow'>
        <h2 className='text-2xl font-bold text-pink-400'>{props.question.createdByUserId}</h2>
        <p className='mt-2 text-sm'>{props.question.text}</p>
      </div>
      <div>
        <button
          className='cursor-pointer text-sm font-bold uppercase text-pink-400'
          onClick={async () => {
            await deleteQuestion.mutateAsync(props.question.id);
            await context.question.all.invalidate();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export function PostCardSkeleton(props: { pulse?: boolean }) {
  const { pulse = true } = props;
  return (
    <div className='flex flex-row rounded-lg bg-white/10 p-4 transition-all hover:scale-[101%]'>
      <div className='flex-grow'>
        <h2 className={`w-1/4 rounded bg-pink-400 text-2xl font-bold ${pulse && 'animate-pulse'}`}>
          &nbsp;
        </h2>
        <p className={`mt-2 w-1/3 rounded bg-current text-sm ${pulse && 'animate-pulse'}`}>
          &nbsp;
        </p>
      </div>
    </div>
  );
}
