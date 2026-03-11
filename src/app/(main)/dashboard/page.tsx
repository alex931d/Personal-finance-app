import { env } from "@/env";
import { validateRequest } from "@/lib/auth/validate-request";
import { Paths } from "@/lib/constants";
import { myPostsSchema } from "@/server/api/routers/post/post.input";
import { api } from "@/trpc/server";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import * as React from "react";
import { Posts } from "./_components/posts";
import { PostsSkeleton } from "./_components/posts-skeleton";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Dashboard",
  description: "Manage dashboard here",
};

interface Props {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function DashboardPage({ searchParams }: Props) {
  const { page, perPage } = myPostsSchema.parse(searchParams);

  const { user } = await validateRequest();
  if (!user) redirect(Paths.Login);

  /**
   * Passing multiple promises to `Promise.all` to fetch data in parallel to prevent waterfall requests.
   * Passing promises to the `Posts` component to make them hot promises (they can run without being awaited) to prevent waterfall requests.
   * @see https://www.youtube.com/shorts/A7GGjutZxrs
   * @see https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#parallel-data-fetching
   */
  const promises = Promise.all([
    api.post.myPosts.query({ page, perPage }),
  ]);

  return (
    <div>
      <div className="mb-6">

      </div>
      <React.Suspense fallback={<PostsSkeleton />}>
        
      </React.Suspense>
    </div>
  );
}
