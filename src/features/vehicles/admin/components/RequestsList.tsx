import { FC, ReactElement } from 'react'
import { RequestResponse } from '@vehicles/common'

import { RequestStatusBadge } from '../../common/components/RequestStatusBadge'

export type RequestsListProps = {
  requests: RequestResponse[]
  renderAction?: (request: RequestResponse) => ReactElement
}

export const RequestsList: FC<RequestsListProps> = ({ requests, renderAction }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='mt-10 rounded-lg  my-5 border-spacing-2 w-full'>
        <thead>
          <tr className='font-bold text-xl mt-5  bg-purple-200 '>
            <td className='min-w-[12rem]'>Fecha Solicitud</td>
            <td className='min-w-[12rem]'>Placa</td>
            <td className='min-w-[12rem]'>Marca</td>
            <td className='min-w-[12rem]'>Estado</td>
            <td className='min-w-[12rem]'>Fecha Agendamiento</td>
            <td className='min-w-[20rem]'>Observación</td>
            {renderAction && <td className='min-w-[12rem]'></td>}
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className='shadow-md rounded'>
              <td className='px-2 py-3'>
                {request.detailRequests?.[0]?.createdDate &&
                  new Date(request.detailRequests[0].createdDate).toLocaleDateString()}
              </td>
              <td className='px-2 py-3'>{request.licencePlate}</td>
              <td className='px-2 py-3'>{request.brand}</td>
              <td className='px-2 py-3'>
                <div className='inline-block'>
                  <RequestStatusBadge status={request.statusRequestId}>
                    {request.statusRequest}
                  </RequestStatusBadge>{' '}
                </div>
              </td>
              <td className='px-2 py-3'>
                {request.scheduledDate && new Date(request.scheduledDate).toLocaleDateString()}
              </td>
              <td className='px-2 py-3'>{request.detailRequests?.[0]?.description}</td>
              {renderAction && <td className='px-2 py-3'>{renderAction(request)}</td>}
            </tr>
          ))}
          {requests.length === 0 && (
            <tr>
              <td colSpan={10} className='py-4 italic md:text-center'>
                No hay resultados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
