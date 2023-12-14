import { Link } from 'react-router-dom'

interface NotFoundErrorProps {
  message?: string | null
}

export const NotFoundError = ({ message }: NotFoundErrorProps) => {
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center'>
      <div className='relative'>
        <h1 className='text-9xl font-extrabold text-Black tracking-widest'>404</h1>
        <div className='bg-primary text-lg text-white px-2 rounded rotate-12 absolute top-[60%] left-10'>
          <p>Página no encontrada</p>
        </div>
      </div>
      <div className=''>
        <div className='text-center'>
          {message && <p className='text-lg font-semibold'>{message}</p>}
        </div>
        <hr className='mt-4' />
        <p className='text-gray-900'>Algunos enlaces que pueden ser de tu interes:</p>
        <ul className=''>
          <li>
            <Link to='/' className='text-primary hover:underline'>
              Inicio
            </Link>
          </li>
          <li>
            <Link to='/vehiculos' className='text-primary hover:underline'>
              Ver vehículos
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
