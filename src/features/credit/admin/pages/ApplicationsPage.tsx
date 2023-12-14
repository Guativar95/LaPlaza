import { useMemo } from 'react'
import { AiFillSafetyCertificate } from 'react-icons/ai'
import {
  ApplicationsSearcherForm,
  ApplicationsSearcherValues,
} from '@credit/admin/components/ApplicationsFilterForm'

import { MainLayout } from '@/components/Layout'
import { AnchorButton } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Column, Table } from '@/components/ui/Table'
import { FetchDataProps, useApiPagination } from '@/hooks/useApiPagination'

import { getApplications } from '../api/getApplications'
import { SimpleApplication } from '../types'

export const ApplicationsPage = () => {
  const fetchDataFn = async (params: FetchDataProps) => {
    const { data } = await getApplications(params)
    return data
  }

  const { items, isFetching, filters, pagination } = useApiPagination<SimpleApplication>({
    fetchDataFn,
    pageSize: 10,
  })

  const columns = useMemo<Column<SimpleApplication>[]>(
    () => [
      {
        name: 'licencePlate',
        label: 'Placa',
      },
      {
        name: 'brand',
        label: 'Marca',
      },
      {
        name: 'line',
        label: 'Línea',
      },
      {
        name: 'createdDate',
        label: 'Fecha de recepción',
        formatAs: 'date',
      },
      {
        name: 'requestStatus',
        label: 'Estado',
      },
      {
        name: 'deliveryDate',
        label: 'Fecha de entrega',
        formatAs: 'date',
      },
      {
        name: 'code',
        label: '',
        render: () => (
          <AnchorButton
            variant='text'
            href={'https://www.finanzauto.info/Docs/ActaEntrega.pdf'}
            target='_blank'
            rel='noreferrer noopener'
          >
            <AiFillSafetyCertificate className='inline-block text-xl mr-1' />
            <span>Acta de Entrega</span>
          </AnchorButton>
        ),
      },
    ],
    []
  )

  const { isFirstPage, isLastPage, nextPage, prevPage, pageIndex, pageCount } = pagination

  const onSearch = (values: ApplicationsSearcherValues) =>
    filters.add('licencePlate', values.licencePlate)

  const onReset = () => filters.remove('licencePlate')

  return (
    <MainLayout title='Solicitudes'>
      <Card>
        <h1 className='text-2xl font-semibold mb-3'>Vehículos para entregar</h1>

        <div className='my-3'>
          <ApplicationsSearcherForm onSuccess={onSearch} onReset={onReset} isLoading={isFetching} />
        </div>
        <Table
          columns={columns}
          data={items}
          pagination={{
            isFirstPage,
            isLastPage,
            currentPage: pageIndex,
            totalPages: pageCount,
            prevPage,
            nextPage,
            isLoading: isFetching,
          }}
        />
      </Card>
    </MainLayout>
  )
}
