"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { PasswordInput } from "@/components/password-input";

import { login } from "@/lib/auth/actions";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";

export function Login() {
  const [state, formAction] = useFormState(login, null);

  return (
    <div className="w-full tablet:max-w-md bg-white rounded-2xl mobile:max-w-none">
      <CardHeader className="">
        <h2 className="text-3xl accent-gray-900 font-bold">Login</h2>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid gap-4">
          <div className="space-y-2">
            <Label className="text-slate-600" htmlFor="email">Email</Label>
            <Input
              className="border border-gray-500"
              required
              id="email"
              placeholder="email@example.com"
              autoComplete="email"
              name="email"
              type="email"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-600" htmlFor="password">Password</Label>
            <PasswordInput
              className="border border-gray-500"
              id="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="********"
            />
          </div>
          <SubmitButton className="w-full" aria-label="submit-btn">
            Log In
          </SubmitButton>
          <div className="flex flex-col flex-wrap justify-center items-center gap-0.5">
            <div className="flex flex-row gap-2 justify-center items-center">
              <label className="text-slate-600 text-sm">Need to create an account?</label>
              <Button variant={"link"} className="p-0 font-bold underline" asChild>
                <Link href={"/signup"}>Sign Up</Link>
              </Button>
            </div>

            <Button variant={"link"} size={"sm"} className="p-0" asChild>
              <Link href={"/reset-password"}>Forgot password?</Link>
            </Button>
          </div>

          {state?.fieldError ? (
            <ul className="list-disc space-y-1 rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
              {Object.values(state.fieldError).map((err) => (
                <li className="ml-4" key={err}>
                  {err}
                </li>
              ))}
            </ul>
          ) : state?.formError ? (
            <p className="rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
              {state?.formError}
            </p>
          ) : null}


        </form>
      </CardContent>
    </div>
  );
}
