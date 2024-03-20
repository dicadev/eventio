'use client'
import Link from "next/link"
import { useForm } from '@mantine/form'
import { invoke } from "@/blitz-server"
import { LogoutButton } from "@/(auth)/components/LogoutButton"
import getCurrentUser from "@/users/queries/getCurrentUser"
import { Button, Group, List, Stack, Text, TextInput } from "@mantine/core"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getTodos from "@/features/todos/queries/getTodos"
import addTodo from "@/features/todos/mutations/addTodo"
import deleteAll from "@/features/todos/mutations/deleteAll"
import { Form, FORM_ERROR } from "@/components/Form"

export default function ButtonFetchTodos () {
  const [todos, { refetch }] = useQuery(getTodos, {})
  const [$addTodo] = useMutation(addTodo, {})
  const [$deleteAll] = useMutation(deleteAll, {})

  const form = useForm({
    initialValues: {
      title: '',
    },
  })

  return (
    <>
      <form onSubmit={form.onSubmit(async (values) => {
        await $addTodo({
          todoTitle: values.title
        })
      }
      )}>
        <TextInput
          label="Todo title"
          placeholder="Buy some bread"
          value={form.values.title}
          onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
          radius="md"
        />
        <Button type="submit">Add Todo</Button>
      </form>
      <Button onClick={async () => $deleteAll({})}>Delete all todos</Button>
      <List>
        {todos.map(todo => (
          <List.Item key={todo.id}>
            {todo.title}
          </List.Item>
        ))}
      </List>
    </>
  )
}