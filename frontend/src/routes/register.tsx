import { useState } from 'react'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { AuthLayout } from '#/components/auth/auth-layout'
import {
  AuthField,
  AuthHeading,
  AuthSubmit,
  OrDivider,
  firstError,
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

  const form = useForm({
    defaultValues: {
      name: '',
      org: '',
      invite: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: z
        .object({
          name: z.string().min(1, 'Enter your name'),
          org: z.string(),
          invite: z.string(),
          email: z
            .string()
            .min(1, 'Enter your email')
            .email('Enter a valid email'),
          password: z.string().min(8, 'Use at least 8 characters'),
          confirmPassword: z.string().min(1, 'Confirm your password'),
        })
        .superRefine((val, ctx) => {
          if (role === 'organizer' && !val.org.trim()) {
            ctx.addIssue({
              code: 'custom',
              path: ['org'],
              message: 'Enter your organization name',
            })
          }
          if (role === 'staff' && !val.invite.trim()) {
            ctx.addIssue({
              code: 'custom',
              path: ['invite'],
              message: 'Enter your staff invite code',
            })
          }
          if (val.confirmPassword && val.password !== val.confirmPassword) {
            ctx.addIssue({
              code: 'custom',
              path: ['confirmPassword'],
              message: "Passwords don't match",
            })
          }
        }),
    },
    onSubmit: () => createAccount(),
  })

  return (
    <AuthLayout>
      <AuthHeading title="Create Your Account" subtitle={SUBTITLES[role]} />
      <RoleTabs value={role} onChange={setRole} label="Sign up as" />

      <form
        noValidate
        className="mt-6 flex flex-col gap-3.5"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <form.Field
          name="name"
          validators={{ onBlur: z.string().min(1, 'Enter your name') }}
        >
          {(field) => (
            <AuthField
              id="name"
              label="Name"
              type="text"
              autoComplete="name"
              placeholder="Jordan Torres"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={firstError(field.state.meta.errors)}
            />
          )}
        </form.Field>

        {role === 'organizer' && (
          <form.Field
            name="org"
            validators={{
              onBlur: ({ value }) =>
                value.trim() ? undefined : 'Enter your organization name',
            }}
          >
            {(field) => (
              <AuthField
                id="org"
                label="Organization Name"
                type="text"
                autoComplete="organization"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                error={firstError(field.state.meta.errors)}
              />
            )}
          </form.Field>
        )}

        {role === 'staff' && (
          <form.Field
            name="invite"
            validators={{
              onBlur: ({ value }) =>
                value.trim() ? undefined : 'Enter your staff invite code',
            }}
          >
            {(field) => (
              <AuthField
                id="invite"
                label="Staff Invite Code"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                error={firstError(field.state.meta.errors)}
              />
            )}
          </form.Field>
        )}

        <form.Field
          name="email"
          validators={{
            onBlur: z
              .string()
              .min(1, 'Enter your email')
              .email('Enter a valid email'),
          }}
        >
          {(field) => (
            <AuthField
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={firstError(field.state.meta.errors)}
            />
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{
            onBlur: z.string().min(8, 'Use at least 8 characters'),
          }}
        >
          {(field) => (
            <AuthField
              id="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={firstError(field.state.meta.errors)}
            />
          )}
        </form.Field>

        <form.Field
          name="confirmPassword"
          validators={{
            onBlur: ({ value, fieldApi }) =>
              value === fieldApi.form.getFieldValue('password')
                ? undefined
                : "Passwords don't match",
          }}
        >
          {(field) => (
            <AuthField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              autoComplete="new-password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={firstError(field.state.meta.errors)}
            />
          )}
        </form.Field>

        <form.Subscribe selector={(s) => s.isSubmitting}>
          {(isSubmitting) => (
            <AuthSubmit disabled={isSubmitting}>Create account</AuthSubmit>
          )}
        </form.Subscribe>

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
