import React from 'react'
import { BsTrash } from 'react-icons/bs'

import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { emptySelect } from '@/utils/defaults'

import { ApplicationFormStepBaseProps } from '../types'

import { GoodForm } from './GoodForm'
import { GoodsAndVehicleValues } from './types'
import { useGoodsAndVehicleForm } from './useGoodsAndVehiclesForm'
import { VehicleForm } from './VehicleForm'

export type GoodsAndVehiclesFormProps = ApplicationFormStepBaseProps<GoodsAndVehicleValues> & {}

const MAX_GOODS = 3
const MAX_VEHICLES = 3

export const GoodsAndVehiclesForm: React.FC<GoodsAndVehiclesFormProps> = ({
  actions,
  onSuccess,
  onPrevious,
  defaultValues,
  saveProgressOnChange,
}) => {
  const {
    initialLoading,
    goodForms,
    appendGoodForm,
    removeGoodForm,
    setGoodValues,
    setDefaultGoodValues,
    vehicleForms,
    appendVehicleForm,
    removeVehicleForm,
    setVehicleValues,
    setDefaultVehicleValues,
    handleSubmit,
    selects: { brands, goodTypes },
  } = useGoodsAndVehicleForm({
    onSuccess,
    defaultValues,
    saveProgressOnChange,
  })

  if (initialLoading) {
    return <Spinner className='mx-auto' />
  }

  return (
    <div>
      <h2 className='text-2xl mb-5 font-bold'>Bienes raíces y vehículos</h2>
      <div>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl'>Inmuebles</h2>
          <Button
            variant='text'
            onClick={() => appendGoodForm()}
            disabled={goodForms.length >= MAX_GOODS}
          >
            Agregar inmueble
          </Button>
        </div>
        <div className='grid gap-5 mt-2'>
          {goodForms.map(({ id, ref, defaultValues }) => (
            <div key={`good-${id}`} className='relative p-3 pt-5 border border-gray-200 rounded-lg'>
              <button
                type='button'
                onClick={() => {
                  removeGoodForm(id)
                }}
                className='absolute top-2 right-2 text-red-500 text-xl'
              >
                <BsTrash />
              </button>
              <GoodForm
                onSucces={(values) => setGoodValues(id, values)}
                onInvalid={() => setGoodValues(id)}
                defaultValues={defaultValues}
                goodTypes={[emptySelect, ...goodTypes]}
                innerRef={ref}
                saveOnChange={(values) => setDefaultGoodValues(id, values)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='mt-5'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl'>Vehículos</h2>
          <Button
            variant='text'
            onClick={() => appendVehicleForm()}
            disabled={vehicleForms.length >= MAX_VEHICLES}
          >
            Agregar vehículo
          </Button>
        </div>

        <div className='grid gap-5 mt-2'>
          {vehicleForms.map(({ id, ref, defaultValues }) => (
            <div key={`good-${id}`} className='relative p-3 pt-5 border border-gray-200 rounded-lg'>
              <button
                type='button'
                onClick={() => {
                  removeVehicleForm(id)
                }}
                className='absolute top-2 right-2 text-red-500 text-xl'
              >
                <BsTrash />
              </button>
              <VehicleForm
                onSucces={(values) => setVehicleValues(id, values)}
                onInvalid={() => setVehicleValues(id)}
                innerRef={ref}
                brands={[emptySelect, ...brands]}
                defaultValues={defaultValues}
                saveOnChange={(values) => setDefaultVehicleValues(id, values)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col justify-between gap-3 md:flex-row'>
        <div className='flex flex-col md:flex-row'>
          {onPrevious && (
            <Button color='light' onClick={onPrevious}>
              Anterior
            </Button>
          )}
        </div>
        <div className='flex flex-col gap-2 md:flex-row'>
          {actions}
          <Button variant='gradient' onClick={handleSubmit}>
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
