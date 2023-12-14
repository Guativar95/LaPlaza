import { ChangeEvent } from 'react'

import { InputField, NumericField, SelectField } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { getFasecolda } from '@/features/vehicles/common/api/vehicleSelects'

import { useCreateVehicle } from '../../hooks/useCreateVehicle'

export interface CreateFormProps {
  onSuccess: (id: string) => void
}

export const CreateForm = ({ onSuccess }: CreateFormProps) => {
  const { form, fieldSelects, isCreated, isSubmiting, handleSubmit, validateUniqueLicencePlate } =
    useCreateVehicle({
      onSuccess,
    })

  const {
    emptyOption,
    brands,
    classes,
    lines,
    models,
    origins,
    offices,
    conditions,
    bodyworkTypes,
    transmissionTypes,
    fuelTypes,
    tractionTypes,
    municipalities,
    departments,
    services,
    selectedBrandId,
    selectedClassId,
    selectedLineId,
    onBrandChange,
    onClassChange,
    onLineChange,
    onModelChange,
    onDepartmentChange,
  } = fieldSelects

  const { formState, register } = form
  const fetchLine = async (code: string) => {
    if (code.length === 7 || code.length === 9) {
      onBrandChange('')
      onClassChange('')
      onLineChange('')
    }
    if (code.length === 8) {
      await getFasecolda(code).then((respons) => {
        if (respons.status === 200) {
          const codeBrand = code.slice(0, 3)
          const codeClass = code.slice(3, 5)
          onBrandChange(codeBrand)
          form.setValue('brandId', codeBrand)
          setTimeout(() => {
            onClassChange(codeClass)
            form.setValue('classId', codeClass)
          }, 10)
          setTimeout(() => {
            onLineChange(respons.data.id)
            form.setValue('lineId', Number(respons.data.id))
          }, 100)
        }
      })
    }
  }
  return (
    <>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3  my-2'>
          <InputField
            type='text'
            label='Código Fasecolda'
            error={formState.errors?.codeFasecolda}
            registration={register('codeFasecolda', {
              onChange: (e) => {
                fetchLine(e.target.value)
              },
            })}
          />
        </div>
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3  my-2'>
          <SelectField
            label='Marca'
            options={[emptyOption, ...brands]}
            value={selectedBrandId}
            error={formState.errors?.brandId}
            registration={register('brandId', {
              onChange: (e) => {
                const { value } = e.target
                onBrandChange(value)
              },
            })}
          />
          <SelectField
            label='Clase'
            options={[emptyOption, ...classes]}
            value={selectedClassId}
            error={formState.errors?.classId}
            registration={register('classId', {
              onChange: (e) => onClassChange(e.target.value),
            })}
          />
          <SelectField
            label='Linea'
            options={[emptyOption, ...lines]}
            value={selectedLineId}
            error={formState.errors?.lineId}
            registration={register('lineId', {
              valueAsNumber: true,
              onChange: (e) => onLineChange(e.target.value),
            })}
          />
          <SelectField
            label='Modelo'
            options={[emptyOption, ...models]}
            error={formState.errors?.modelId}
            registration={register('modelId', {
              onChange: (e) => onModelChange(e.target.value),
            })}
          />
          <SelectField
            label='Servicio'
            options={[emptyOption, ...services]}
            error={formState.errors?.serviceId}
            registration={register('serviceId', { valueAsNumber: true })}
          />
          <SelectField
            label='Origen'
            options={[emptyOption, ...origins]}
            error={formState.errors?.originId}
            registration={register('originId', { valueAsNumber: true })}
          />

          <InputField
            type='text'
            label='Placa'
            maxLength={6}
            error={formState.errors?.licencePlate}
            registration={register('licencePlate', {
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.toUpperCase()
              },
              onBlur: (e) => {
                validateUniqueLicencePlate(e.target.value)
              },
            })}
          />
          <InputField
            type='text'
            label='Número de chasis'
            error={formState.errors?.chassisNumber}
            registration={register('chassisNumber', {
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.toUpperCase()
              },
            })}
          />
          <InputField
            type='text'
            label='Motor'
            error={formState.errors?.engine}
            registration={register('engine', {
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.toUpperCase()
              },
            })}
          />
          <InputField
            type='text'
            label='Color Principal'
            error={formState.errors?.mainColor}
            registration={register('mainColor')}
          />
          <InputField
            type='text'
            label='Color Secundario'
            error={formState.errors?.secondaryColor}
            registration={register('secondaryColor')}
          />
          <SelectField
            label='Condición'
            options={[emptyOption, ...conditions]}
            error={formState.errors?.conditionId}
            registration={register('conditionId', { valueAsNumber: true })}
          />
          <NumericField
            label='Valor Bruto'
            error={formState.errors?.grossValue}
            control={form.control}
            name='grossValue'
            formatAs='currency'
          />
          <SelectField
            label='Tipo de combustible'
            options={[emptyOption, ...fuelTypes]}
            error={formState.errors?.typeFuelId}
            registration={register('typeFuelId', { valueAsNumber: true })}
          />
          <SelectField
            label='Oficina'
            options={[emptyOption, ...offices]}
            error={formState.errors?.officeId}
            registration={register('officeId', { valueAsNumber: true })}
          />
          <SelectField
            label='Tipo de carrocería'
            options={[emptyOption, ...bodyworkTypes]}
            error={formState.errors?.typeBodyworkId}
            registration={register('typeBodyworkId', { valueAsNumber: true })}
          />
          <NumericField
            type='text'
            label='Kilometraje'
            control={form.control}
            error={formState.errors?.mileage}
            name='mileage'
            thousandSeparator=','
            valueAs='string'
          />
          <InputField
            type='text'
            label='Descripción'
            error={formState.errors?.description}
            registration={register('description')}
          />
          <SelectField
            label='Tipo de transmisión'
            options={[emptyOption, ...transmissionTypes]}
            error={formState.errors?.typeTransmissionId}
            registration={register('typeTransmissionId', { valueAsNumber: true })}
          />
          <SelectField
            label='Tipo de tracción'
            options={[emptyOption, ...tractionTypes]}
            error={formState.errors?.typeTractionId}
            registration={register('typeTractionId', { valueAsNumber: true })}
          />
          <NumericField
            label='Cilindraje'
            error={formState.errors?.distplacement}
            control={form.control}
            name='distplacement'
            thousandSeparator=','
            valueAs='string'
          />
          <InputField
            type='text'
            label='Serie'
            error={formState.errors?.serie}
            registration={register('serie', {
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.toUpperCase()
              },
            })}
          />
          <InputField
            type='number'
            label='Número de puertas'
            error={formState.errors?.doors}
            registration={register('doors', { valueAsNumber: true })}
          />
          <InputField
            type='number'
            label='Capacidad de pasajeros'
            error={formState.errors?.capacity}
            registration={register('capacity', { valueAsNumber: true })}
          />
          <InputField
            type='text'
            label='VIN'
            error={formState.errors?.vinNumber}
            registration={register('vinNumber', {
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.toUpperCase()
              },
            })}
          />
          <SelectField
            label='Departamento de matrícula'
            options={[emptyOption, ...departments]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onDepartmentChange(e.target.value)}
          />
          <SelectField
            label='Ciudad de matrícula'
            options={[emptyOption, ...municipalities]}
            registration={register('cityCode')}
            error={formState.errors.cityCode}
          />
        </div>
        <div className='flex justify-end'>
          <Button
            variant='gradient'
            isLoading={isSubmiting}
            disabled={isSubmiting || isCreated}
            type='submit'
          >
            Guardar
          </Button>
        </div>
      </form>
    </>
  )
}
