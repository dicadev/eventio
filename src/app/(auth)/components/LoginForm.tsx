"use client"
import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { useForm } from "@mantine/form"
import { Box, Button, TextInput, PasswordInput } from "@mantine/core"
import { LabeledTextField } from "src/app/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/app/components/Form"
import login from "../mutations/login"
import { Login } from "../validations"
import { useMutation } from "@blitzjs/rpc"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import type { Route } from "next"
import { ForgotPasswordInput } from './ForgotPasswordInput'

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [$login] = useMutation(login)
  const router = useRouter()
  const next = useSearchParams()?.get("next")

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  return (
    <>
      <h1>Login</h1>
      <Box maw={340}>
        <form
          onSubmit={form.onSubmit(async (values) => {
            try {
              await $login(values)
              router.refresh()
              if (next) {
                router.push(next as Route)
              } else {
                router.push("/")
              }
            } catch (error: any) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
              } else {
                return {
                  [FORM_ERROR]:
                    "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                }
              }
            }
          })}
        >
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            withAsterisk
            label="Password"
            type="password"
            {...form.getInputProps('password')}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Box>

      <Link href={"/forgot-password"}>Forgot your password?</Link>
      Or <Link href="/signup">Sign Up</Link>
    </>
  )
}
