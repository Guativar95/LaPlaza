import { PaginationFooter } from '@/components/ui/Pagination'
import { Pagination } from '@/hooks/useApiPagination'

interface VehiclesPaginationProps extends Pagination {
  isLoading?: boolean
}

export const VehiclesPagination = ({
  pageIndex,
  pageCount,
  isLastPage,
  isFirstPage,
  prevPage,
  nextPage,
  isLoading,
}: VehiclesPaginationProps) => {
  const handleScrollToTop = () => {
    const mainEl = document.querySelector('main')
    mainEl ? mainEl.scrollIntoView() : window.scrollTo({ top: 0 })
  }

  const handlePrevious = () => {
    handleScrollToTop()
    prevPage()
  }

  const handleNext = () => {
    handleScrollToTop()
    nextPage()
  }

  return (
    <PaginationFooter
      currentPage={pageIndex}
      nextPage={handleNext}
      prevPage={handlePrevious}
      totalPages={pageCount}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
      isLoading={isLoading}
    />
  )
}
