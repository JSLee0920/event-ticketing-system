import { useState } from 'react'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { AuthLayout } from '#/components/auth/AuthLayout'
import {
  AuthAlert,
  AuthField,
  AuthHeading,
  AuthSubmit,
  OrDivider,
  firstError,
} from '#/components/auth/AuthFields'
import { GoogleButton } from '#/components/auth/GoogleButton'
import { errorMessage } from '#/lib/api'
import { login, setToken } from '#/lib/auth'

export const Route = createFileRoute('/login')({
  component: LoginPage,
  validateSearch: (search: Record<string, unknown>) =>
    search.registered === true || search.registered === 'true'
      ? { registered: true as const }
      : {},
})

function LoginPage() {
  const navigate = useNavigate()
  const { registered } = Route.useSearch()
  const [note, setNote] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: ({ token }) => {
      setToken(token)
      // Discover/dashboard routes aren't built yet, so route to the app root.
      navigate({ to: '/' })
    },
  })

  const errorMsg = mutation.isError ? errorMessage(mutation.error) : note

  const form = useForm({
    defaultValues: { email: '', password: '' },
    validators: {
      onSubmit: z.object({
        email: z.string().min(1, 'Enter your email').pipe(z.email('Enter a valid email')),
        password: z.string().min(1, 'Enter your password'),
      }),
    },
    onSubmit: ({ value }) => {
      setNote(null)
      mutation.mutate(value)
    },
  })

  return (
    <AuthLayout>
      <AuthHeading
        title="Welcome Back"
        subtitle="Log in to see your tickets, events, and orders."
      />

      <form
        noValidate
        className="mt-6 flex flex-col gap-3.5"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        {registered && !errorMsg && (
          <AuthAlert tone="success">
            Account created — log in to continue.
          </AuthAlert>
        )}
        {errorMsg && <AuthAlert>{errorMsg}</AuthAlert>}

        <form.Field
          name="email"
          validators={{
            onBlur: z.string().min(1, 'Enter your email').pipe(z.email('Enter a valid email')),
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
          validators={{ onBlur: z.string().min(1, 'Enter your password') }}
        >
          {(field) => (
            <AuthField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={firstError(field.state.meta.errors)}
            />
          )}
        </form.Field>

        <Link
          to="/forgot-password"
          className="-mt-1.5 text-right text-xs font-semibold text-primary no-underline"
        >
          Forgot Password?
        </Link>

        <AuthSubmit disabled={mutation.isPending}>
          {mutation.isPending ? 'Logging In…' : 'Log In'}
        </AuthSubmit>

        <OrDivider />
        <GoogleButton
          label="Sign In With Google"
          onClick={() => setNote('Google sign-in is coming soon.')}
        />

        <p className="text-center text-[13px] text-muted-foreground">
          New here?{' '}
          <Link
            to="/register"
            className="font-semibold text-primary no-underline"
          >
            Create An Account
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
