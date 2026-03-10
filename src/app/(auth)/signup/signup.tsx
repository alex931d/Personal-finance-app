"use client";

import { useFormState } from "react-dom";
import Link from "next/link";

import { signup } from "@/lib/auth/actions";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/password-input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { DiscordLogoIcon } from "@/components/icons";

export function Signup() {
  const [state, formAction] = useFormState(signup, null);

  return (
    <div className="w-full tablet:max-w-md bg-white rounded-2xl mobile:max-w-none">
      <CardHeader>
        <h2 className="text-3xl accent-gray-900 font-bold">Sign Up</h2>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="grid gap-4">



          {/* Email */}
          <div className="space-y-2">
            <Label className="text-slate-600" htmlFor="email">
              Email
            </Label>

            <Input
              className="border border-gray-500"
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="email@example.com"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label className="text-slate-600" htmlFor="password">
              Password
            </Label>

            <PasswordInput
              className="border border-gray-500"
              id="password"
              name="password"
              required
              autoComplete="new-password"
              placeholder="********"
            />
          </div>

          {/* Errors */}
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

          {/* Submit */}
          <SubmitButton className="w-full" aria-label="submit-btn">
            Sign Up
          </SubmitButton>

          {/* Footer */}
          <div className="flex justify-center items-center gap-2">
            <span className="text-sm text-slate-600">
              Already have an account?
            </span>

            <Button variant="link" className="p-0 font-bold underline" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>

        </form>
      </CardContent>
    </div>
  );
}