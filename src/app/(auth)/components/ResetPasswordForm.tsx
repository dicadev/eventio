"use client"
import { LabeledTextField } from "src/app/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/app/components/Form"
import { ResetPassword } from "../validations"
import resetPassword from "../mutations/resetPassword"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useForm } from "@mantine/form"
import { Box, Button, PasswordInput } from "@mantine/core"

export function ResetPasswordForm () {
  const searchParams = useSearchParams()
  const token = searchParams?.get("token")?.toString()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  const form = useForm({
    initialValues: {
      password: '',
      passwordConfirmation: '',
    },

    validate: {
      passwordConfirmation: (value, values) =>
        value === values.password ? null : 'Passwords do not match',
    },
  })

  return (
    <div>
      <h1>Set a New Password</h1>

      {isSuccess ? (
        <div>
          <h2>Password Reset Successfully</h2>
          <p>
            Go to the <Link href="/">homepage</Link>
          </p>
        </div>
      ) : (
        <Box maw={340}>
          <form
            onSubmit={form.onSubmit(async (values) => {
              try {
                await resetPasswordMutation({ ...values, token })
              } catch (error: any) {
                if (error.name === "ResetPasswordError") {
                  return {
                    [FORM_ERROR]: error.message,
                  }
                } else {
                  return {
                    [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                  }
                }
              }
            })}
          >
            <PasswordInput
              withAsterisk
              label="Password"
              type="password"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              type="password"
              {...form.getInputProps('passwordConfirmation')}
            />
            <Button type="submit">Reset Password</Button>
          </form>
        </Box>
      )}
    </div>
  )
}
