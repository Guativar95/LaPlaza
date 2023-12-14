import React from 'react'
import { BiCheckShield } from 'react-icons/bi'
import { BsTriangleFill } from 'react-icons/bs'

export type VehicleScoreProps = {
  score: number
  limit?: number
}

const MIN_QUALITY = 80

export const VehicleScore: React.FC<VehicleScoreProps> = ({ score, limit = 100 }) => {
  const scorePercentage = (score * 100) / limit
  const scoreFixed = scorePercentage % 1 === 0 ? scorePercentage : scorePercentage.toFixed(1)

  return (
    <div className='mx-4'>
      <h2 className='font-harabara-mais-demo text-center text-secondary text-3xl'>
        Calificación Carfiao
      </h2>
      <p>
        Esta calificación carfiao promedia el diagnóstico del vehículo en un porcentaje de 0 a 100%.
      </p>
      <div role='progressbar' className='relative pt-6 pb-2 my-1'>
        <div className='flex gap-1 rounded-full h-6 overflow-hidden'>
          <div className='w-full bg-red-500' />
          <div className='w-full bg-orange-400' />
          <div className='w-full bg-yellow-300' />
          <div className='w-full bg-lime-400' />
          <div className='w-full bg-green-500' />
        </div>
        <div
          className='absolute top-0 h-full flex flex-col justify-between items-center text-secondary'
          style={{
            left: `${scoreFixed}%`,
            transform: 'translate(-50%)',
          }}
        >
          <span className='font-bold text-xl'></span>
          <div>
            <BsTriangleFill className='h-4' />
          </div>
        </div>
      </div>
      {scorePercentage >= MIN_QUALITY && (
        <div className='flex items-center gap-2 mt-3'>
          <BiCheckShield className='text-primary text-4xl' />
          <p className='font-bold text-secondary text-sm'>
            Este Carfiao cumple con los estándares de calidad.
          </p>
        </div>
      )}
    </div>
  )
}
