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

export const Route = createFileRoute('/register')({ component: RegisterPage })

const SUBTITLES: Record<AuthRole, string> = {
  customer: 'Buy tickets in seconds, keep them all in one place.',
  organizer: 'Create and sell out your own events.',
  staff: 'Join an event team with an invite code.',
}

function RegisterPage() {
  const [role, setRole] = useState<AuthRole>('customer')
  const navigate = useNavigate()

  function createAccount() {
    navigate({ to: '/' })
  }

  return (
    <AuthLayout>
      <AuthHeading title="Create Your Account" subtitle={SUBTITLES[role]} />
      <RoleTabs value={role} onChange={setRole} label="Sign up as" />

      <form
        className="mt-4 flex flex-col gap-3.5"
        onSubmit={(e) => {
          e.preventDefault()
          createAccount()
        }}
      >
        <AuthField
          id="name"
          label="Name"
          type="text"
          autoComplete="name"
          placeholder="Jordan Torres"
          required
        />

        {role === 'organizer' && (
          <AuthField
            id="org"
            label="Organization name"
            type="text"
            autoComplete="organization"
            placeholder="Night Owl Presents"
            required
          />
        )}
        {role === 'staff' && (
          <AuthField
            id="invite"
            label="Staff invite code"
            type="text"
            placeholder="From your event organizer"
            required
          />
        )}

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
          autoComplete="new-password"
          placeholder="At least 8 characters"
          minLength={8}
          required
        />

        <AuthSubmit>Create account</AuthSubmit>
        <OrDivider />
        <GoogleButton label="Sign up with Google" onClick={createAccount} />

        <p className="text-center text-[13px] text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary no-underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
