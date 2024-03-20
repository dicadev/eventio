"use client"
import { LabeledTextField } from "src/app/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/app/components/Form"
import { ForgotPassword } from "../validations"
import forgotPassword from "../mutations/forgotPassword"
import { useMutation } from "@blitzjs/rpc"
import { useForm } from "@mantine/form"
import { Box, Button, TextInput } from "@mantine/core"

export function ForgotPasswordForm () {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  return (
    <>
      <h1>Forgot your password?</h1>
      <>
        {isSuccess ? (
          <div>
            <h2>Request Submitted</h2>
            <p>
              If your email is in our system, you will receive instructions to reset your password
              shortly.
            </p>
          </div>
        ) : (
          <Box maw={340}>
            <form
              onSubmit={form.onSubmit(async (values) => {
                try {
                  await forgotPasswordMutation(values)
                } catch (error: any) {
                  return {
                    [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
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
              <Button type="submit">Send Reset Password Instructions</Button>
            </form>
          </Box>
        )}
      </>
    </>
  )
}
