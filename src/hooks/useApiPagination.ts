import { useCallback, useEffect, useRef, useState } from 'react'

import { FetchError } from '@/types'
import { Params } from '@/utils/url'

export interface FetchDataProps extends Params {
  pageIndex: number
  pageSize: number
}

export interface FetchDataResponse<T> {
  pageCount: number
  pageIndex: number
  count: number
  data: T[]
}

export interface Pagination {
  count: number
  pageIndex: number
  pageCount: number
  isLastPage: boolean
  isFirstPage: boolean
  nextPage: () => void
  prevPage: () => void
  setPageIndex: (pageIndex: number) => void
  setPageSize: (size: number) => void
}

export interface Filters {
  add: (key: string, value: string | number | string) => void
  remove: (key: string) => void
  clean: () => void
}

export interface UseApiPaginationProps<T> {
  fetchDataFn: (data: FetchDataProps) => Promise<FetchDataResponse<T>>
  initialPage?: number
  pageSize?: number
  initialFilters?: Params
}

export interface UseApiPaginationRes<T> {
  isInitialFetching: boolean
  isFetching: boolean
  items: T[]
  error: FetchError | null
  reloadData: () => void
  pagination: Pagination
  filters: Filters
}

export const useApiPagination = <TData>({
  fetchDataFn,
  initialPage = 1,
  pageSize: pageSizeFromParams = 20,
  initialFilters = {},
}: UseApiPaginationProps<TData>): UseApiPaginationRes<TData> => {
  const mounted = useRef(false)
  const pageIndexRef = useRef(initialPage)
  const pageCountRef = useRef(0)
  const countRef = useRef(0)

  const [error, setError] = useState<FetchError | null>(null)
  const [isInitialFetching, setIsInitialFetching] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [items, setItems] = useState<TData[]>([])
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  const [isFirstPage, setIsFirstPage] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState(pageSizeFromParams)
  const [queryFilters, setQueryFilters] = useState(initialFilters)

  const fetchData = useCallback(async (params: FetchDataProps) => {
    if (!mounted.current) {
      setIsInitialFetching(true)
    }

    setIsFetching(true)
    setError(null)
    try {
      const res = await fetchDataFn(params)

      pageIndexRef.current = res.pageIndex
      pageCountRef.current = res.pageCount
      countRef.current = res.count
      setItems(res.data)
      setIsFirstPage(res.pageIndex === 1)
      setIsLastPage(res.pageCount === res.pageIndex || res.pageCount === 0)
    } catch (error: any) {
      if (error?.response) {
        const { status, message } = error.response
        const details = error.response?.data?.Message ?? message

        setError({
          msg: `${status}: ${details}`,
          couse: error,
        })
      } else {
        setError({
          msg: error.message,
          couse: error,
        })
      }
    } finally {
      setIsFetching(false)
      if (!mounted.current) {
        setIsInitialFetching(false)
        mounted.current = true
      }
    }
  }, [])

  const nextPage = () => {
    fetchData({
      pageIndex: pageIndexRef.current + 1,
      pageSize,
      ...queryFilters,
    })
  }
  const prevPage = () => {
    fetchData({
      pageIndex: pageIndexRef.current - 1,
      pageSize,
      ...queryFilters,
    })
  }

  const reloadData = () =>
    fetchData({
      pageIndex: pageIndexRef.current,
      pageSize,
      ...queryFilters,
    })

  const setPageIndex = (pageIndex: number) => {
    pageIndexRef.current = pageIndex
  }

  useEffect(() => {
    fetchData({
      pageIndex: pageIndexRef.current,
      pageSize,
      ...queryFilters,
    })
  }, [pageSize, pageIndexRef.current])

  useEffect(() => {
    pageIndexRef.current = 1

    fetchData({
      pageIndex: pageIndexRef.current,
      pageSize,
      ...queryFilters,
    })
  }, [queryFilters])

  return {
    isFetching,
    isInitialFetching,
    items,
    error,
    reloadData,
    pagination: {
      count: countRef.current,
      isLastPage,
      isFirstPage,
      pageIndex: pageIndexRef.current,
      pageCount: pageCountRef.current,
      setPageIndex,
      setPageSize,
      nextPage,
      prevPage,
    },
    filters: {
      add: (key: string, value: string | number | null) =>
        setQueryFilters((f) => ({ ...f, [key]: value })),
      remove: (key: string) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [key]: param, ...rest } = queryFilters
        setQueryFilters(rest)
      },
      clean: () => setQueryFilters({}),
    },
  }
}
