import { useState } from 'react'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { AuthLayout } from '#/components/auth/auth-layout'
import {
  AuthField,
  AuthHeading,
  AuthSubmit,
  OrDivider,
} from '#/components/auth/auth-fields'
import { RoleTabs, type AuthRole } from '#/components/auth/role-tabs'
import { GoogleButton } from '#/components/auth/google-button'

export const Route = createFileRoute('/login')({ component: LoginPage })

const SUBTITLES: Record<AuthRole, string> = {
  customer: 'Log in to see your tickets and orders.',
  organizer: 'Log in to manage your events and sales.',
  staff: 'Log in to scan tickets at the door.',
}

function LoginPage() {
  const [role, setRole] = useState<AuthRole>('customer')
  const navigate = useNavigate()

  // Organizers land on the dashboard; everyone else on Discover.
  // Those routes aren't built yet, so we route to the app root for now.
  function signIn() {
    navigate({ to: '/' })
  }

  return (
    <AuthLayout>
      <AuthHeading title="Welcome Back" subtitle={SUBTITLES[role]} />
      <RoleTabs value={role} onChange={setRole} label="Log in as" />

      <form
        className="mt-4 flex flex-col gap-3.5"
        onSubmit={(e) => {
          e.preventDefault()
          signIn()
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
        <AuthField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          required
        />
        <Link
          to="/forgot-password"
          className="-mt-1.5 text-right text-xs font-semibold text-primary no-underline"
        >
          Forgot password?
        </Link>

        <AuthSubmit>Log in</AuthSubmit>
        <OrDivider />
        <GoogleButton label="Sign in with Google" onClick={signIn} />

        <p className="text-center text-[13px] text-muted-foreground">
          New here?{' '}
          <Link to="/register" className="font-semibold text-primary no-underline">
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
