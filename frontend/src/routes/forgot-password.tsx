import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { AuthLayout } from '#/components/auth/AuthLayout'
import {
  AuthField,
  AuthHeading,
  AuthSubmit,
} from '#/components/auth/AuthFields'

export const Route = createFileRoute('/forgot-password')({
  component: ForgotPasswordPage,
})

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)

  return (
    <AuthLayout>
      <AuthHeading title="Reset Your Password" />
      <p className="mt-2.5 text-center text-[13px] leading-normal text-muted-foreground">
        Enter your account email and we'll send you a link to reset it.
      </p>

      {sent ? (
        <div
          role="status"
          className="mt-[18px] rounded-xl bg-ok-bg px-4 py-3.5 text-center text-[13px] font-semibold leading-normal text-ok"
        >
          Reset link sent — check your inbox.
        </div>
      ) : (
        <form
          className="mt-[18px] flex flex-col gap-3.5"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <AuthField
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
          <AuthSubmit>Send Reset Link</AuthSubmit>
        </form>
      )}

      <p className="mt-4 text-center text-[13px] text-muted-foreground">
        <Link to="/login" className="font-semibold text-primary no-underline">
          Back To Log In
        </Link>
      </p>
    </AuthLayout>
  )
}
