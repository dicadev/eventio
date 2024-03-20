import { Metadata } from 'next'
import ButtonFetchTodos from '@/components/ButtonFetchTodos'

export const metadata: Metadata = {
  title: 'Todos',
}

const TodosPage = () => {
  return (
    <div>
      <h2>Todos</h2>
      <ButtonFetchTodos />
    </div>
  )
}

export default TodosPage