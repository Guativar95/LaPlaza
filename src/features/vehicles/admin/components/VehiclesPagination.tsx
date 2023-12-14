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
  return (
    <PaginationFooter
      currentPage={pageIndex}
      nextPage={nextPage}
      prevPage={prevPage}
      totalPages={pageCount}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
      isLoading={isLoading}
    />
  )
}
