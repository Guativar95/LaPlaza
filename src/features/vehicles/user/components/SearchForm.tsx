import { BsSearch } from 'react-icons/bs'

import { Form, InputField } from '@/components/Form'
import { Filters } from '@/hooks/useApiPagination'

export interface ShearchFormProps {
  filters: Filters
}

export type SearchValues = {
  search: string
}

export const SearchForm = ({ filters }: ShearchFormProps) => {
  const handleSubmit = (value: SearchValues) => {
    if (value.search !== '') {
      filters.add('Search', value.search)
    }
  }

  return (
    <>
      <Form<SearchValues> onSubmit={handleSubmit} options={{ mode: 'all' }}>
        {({ register }) => (
          <>
            <InputField
              leftIcon={<BsSearch className='text-lg text-gray-400' />}
              type='search'
              placeholder='Buscar'
              aria-label='Buscar vehículo'
              className='w-full rounded-xl mt-0 bg-gray-200 focus:ring-0'
              registration={register('search')}
            />
          </>
        )}
      </Form>
    </>
  )
}
