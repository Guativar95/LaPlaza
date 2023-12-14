import { FC } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import { Button } from '../Button'

export type PaginationFooterProps = {
  prevPage: () => void
  nextPage: () => void
  currentPage: number
  totalPages: number
  isFirstPage?: boolean
  isLastPage?: boolean
  isLoading?: boolean
}

export const PaginationFooter: FC<PaginationFooterProps> = ({
  prevPage,
  nextPage,
  currentPage,
  totalPages,
  isFirstPage,
  isLastPage,
  isLoading,
}) => {
  const disabledClassName = 'disabled:bg-gray-400'

  return (
    <div className='flex items-center gap-2 py-2'>
      <Button
        disabled={isFirstPage || isLoading}
        onClick={prevPage}
        className={`!p-2 ${disabledClassName}`}
        aria-label='Página anterior'
      >
        <FiChevronLeft />
      </Button>
      <span>
        {currentPage} de {totalPages || 1}
      </span>
      <Button
        disabled={isLastPage || isLoading}
        onClick={nextPage}
        className={`!p-2 ${disabledClassName}`}
        aria-label='Siguiente página'
      >
        <FiChevronRight />
      </Button>
    </div>
  )
}
