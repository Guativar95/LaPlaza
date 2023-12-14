import { FC, ReactElement } from 'react'
import { RequestResponse } from '@vehicles/common/types'

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
            <td className='p-2'>Fecha Solicitud</td>
            <td className='p-2'>Placa</td>
            <td className='p-2'>Marca</td>
            <td className='p-2'>Estado</td>
            <td className='p-2'>Fecha Agenda</td>
            <td className='p-2'>Ubicación</td>
            <td className='p-2'>Observación</td>
            {renderAction && <td></td>}
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
              <td className='px-2 py-3'>{request.statusRequest}</td>
              <td className='px-2 py-3'>
                {request.scheduledDate && new Date(request.scheduledDate).toLocaleDateString()}
              </td>
              <td className='px-2 py-3'>{request.location}</td>
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
