import { useState } from 'react'
import { BsFilterLeft } from 'react-icons/bs'

import { Accordion } from '@/components/ui/Accordion/Accordion'
import { Button } from '@/components/ui/Button'
import { Filters } from '@/hooks/useApiPagination'

import { FilterBar } from './Filters/FilterBar'

export interface NewVehicleFiltersProps {
  filters: Filters
}

export const NewVehicleFilters = ({ filters }: NewVehicleFiltersProps) => {
  const [cleaned, setCleaned] = useState(false)

  return (
    <section className='relative'>
      <form>
        <div className='mb-3 flex gap-4'>
          <div className='flex items-center gap-2'>
            <BsFilterLeft size={30} className='text-gray-600' />
            <h2 className='text-primary font-semibold'>Filtros</h2>
          </div>
          <div>
            <Button
              type='reset'
              color='tertiary'
              size='none'
              variant='text'
              className=' text-sm p-2 md:block'
              onClick={() => {
                filters.clean()
                setCleaned(true)
                setTimeout(() => setCleaned(false))
              }}
            >
              Limpiar
            </Button>
          </div>
        </div>
        <Accordion>
          <FilterBar filters={filters} cleaned={cleaned} />
        </Accordion>
      </form>
    </section>
  )
}
