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
import { GoogleButton } from '#/components/auth/google-button'

export const Route = createFileRoute('/login')({ component: LoginPage })

function LoginPage() {
  const navigate = useNavigate()

  // Organizers land on the dashboard; everyone else on Discover.
  // Those routes aren't built yet, so we route to the app root for now.
  function signIn() {
    navigate({ to: '/' })
  }

  const form = useForm({
    defaultValues: { email: '', password: '' },
    validators: {
      onSubmit: z.object({
        email: z
          .string()
          .min(1, 'Enter your email')
          .email('Enter a valid email'),
        password: z.string().min(1, 'Enter your password'),
      }),
    },
    onSubmit: () => signIn(),
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

        <form.Subscribe selector={(s) => s.isSubmitting}>
          {(isSubmitting) => (
            <AuthSubmit disabled={isSubmitting}>Log in</AuthSubmit>
          )}
        </form.Subscribe>

        <OrDivider />
        <GoogleButton label="Sign in with Google" onClick={signIn} />

        <p className="text-center text-[13px] text-muted-foreground">
          New here?{' '}
          <Link
            to="/register"
            className="font-semibold text-primary no-underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
