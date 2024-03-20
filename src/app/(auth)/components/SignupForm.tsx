"use client"
import { LabeledTextField } from "src/app/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/app/components/Form"
import signup from "../mutations/signup"
import { Signup } from "../validations"
import { useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"
import { useForm } from "@mantine/form"
import { Box, Button, PasswordInput, TextInput } from "@mantine/core"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [$signup] = useMutation(signup)
  const router = useRouter()

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  return (
    <div>
      <h1>Create an Account</h1>
      <Box maw={340}>
        <form
          onSubmit={form.onSubmit(async (values) => {
            try {
              await $signup(values)
              router.refresh()
              router.push("/")
            } catch (error: any) {
              if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                // This error comes from Prisma
                return { email: "This email is already being used" }
              } else {
                return { [FORM_ERROR]: error.toString() }
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
          <Button type="submit">Create Account</Button>
        </form>
      </Box>
    </div>
  )
}
