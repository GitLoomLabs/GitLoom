import { signIn } from '@/auth';
import GithubIcon from '@/components/icons/github';
import GitlabIcon from '@/components/icons/gitlab';
import GitloomIcon from '@/components/icons/gitloom';
import GitloomTextIcon from '@/components/icons/gitloom-text';
import { Button } from '@/components/ui/button';
import { generateMetadataTitleFor } from '@/lib/utils';
import { Box, FolderLock, ShieldCheck, WandSparkles } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: generateMetadataTitleFor('Login'),
};

export default async function Page() {
  return (
    <div className="grid min-h-dvh md:grid-cols-2">
      <div className="bg-card/50 hidden px-6 lg:px-0 md:grid place-items-center border-r">
        <div className="flex w-full max-w-100 flex-col gap-4">
          <ShieldCheck className="text-muted-foreground size-15 stroke-1" />
          <h4 className="text-4xl font-black">Your data is yours.</h4>
          <div className="text-muted-foreground flex gap-2 text-sm">
            <Box className="size-5 shrink-0" />
            <span>Gitloom is decentralized and doesn&apos;t rely on any cetralized database.</span>
          </div>
          <div className="text-muted-foreground flex gap-2 text-sm">
            <FolderLock className="size-5 shrink-0" />
            <span>
              Nothing is stored, ever.
              <br />
              Content stays in your repo.
            </span>
          </div>
          <div className="text-muted-foreground flex gap-2 text-sm">
            <WandSparkles className="size-5 shrink-0" />
            <span>Build fast, own forever.</span>
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-75 flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-4">
          <GitloomIcon className="size-7" />
          <GitloomTextIcon className="h-5 w-auto" />
        </div>
        <span className="text-muted-foreground text-center text-sm">
          The Git-native CMS for modern content workflows.
        </span>
        <div className="flex w-full flex-col gap-4">
          <form
            onSubmit={async () => {
              'use server';
              await signIn('github', {
                redirectTo: '/login/success',
              });
            }}
          >
            <Button size={'default'} className="w-full">
              <GithubIcon className="size-5" />
              Sign in with Github
            </Button>
          </form>
          <Button size={'default'} variant={'secondary'} disabled>
            <GitlabIcon className="fill-foreground size-5" />
            Sign in with Gitlab
          </Button>
        </div>
        <span className="text-muted-foreground mt-4 text-center text-sm">
          By signing in, you agree to our <br />
          <Link href={'/legal/terms-of-service'} className="hover:underline">
            terms of service
          </Link>{' '}
          and{' '}
          <Link href={'/legal/privacy-policy'} className="hover:underline">
            privacy policy
          </Link>
          .
        </span>
      </div>
    </div>
  );
}
