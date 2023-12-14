import { useSearchParams } from 'react-router-dom'

import { NotFoundError } from '../components/NotFoundError'

export const NotFoundPage = () => {
  const [searchParams] = useSearchParams()

  const message = searchParams.get('message')

  return (
    <main>
      <NotFoundError message={message} />
    </main>
  )
}
