import { Vehicle } from '@vehicles/common/types'

import { InputField, SelectField } from '@/components/Form'
import { Button } from '@/components/ui/Button'

import { useEditVehicle } from '../../hooks/useEditVehicle'

import { EditVehicleValues } from './types'

export interface EditFormProps {
  initialValues: Vehicle
  onSuccess?: (values: EditVehicleValues) => void
}

export const EditForm = ({ initialValues }: EditFormProps) => {
  const {
    isSubmitting,
    isDisabledEditableFields,
    isDisabledGrossValue,
    form,
    fieldSelects,
    toggleEditableFields,
    setInitialValues,
    handleSubmit,
  } = useEditVehicle({
    initialValues,
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
    statusVehicle,
    transmissionTypes,
    fuelTypes,
    tractionTypes,
    municipalities,
    services,
    selectedBrandId,
    selectedClassId,
    selectedLineId,
    onBrandChange,
    onClassChange,
    onLineChange,
    onModelChange,
  } = fieldSelects

  const { formState, register } = form

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3  my-2'>
        <InputField
          type='date'
          label='Fecha Creación'
          registration={register('dateEntry')}
          disabled
        />
        <SelectField
          label='Marca'
          options={[emptyOption, ...brands]}
          value={selectedBrandId}
          error={formState.errors?.brandId}
          registration={register('brandId', {
            onChange: (e) => onBrandChange(e.target.value),
          })}
          disabled
        />
        <SelectField
          label='Clase'
          options={[emptyOption, ...classes]}
          value={selectedClassId}
          error={formState.errors?.classId}
          registration={register('classId', {
            onChange: (e) => onClassChange(e.target.value),
          })}
          disabled
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
          disabled
        />
        <SelectField
          label='Modelo'
          options={[emptyOption, ...models]}
          error={formState.errors?.modelId}
          registration={register('modelId', {
            onChange: (e) => onModelChange(e.target.value),
          })}
          disabled={isDisabledEditableFields}
        />
        <SelectField
          label='Servicio'
          options={[emptyOption, ...services]}
          error={formState.errors?.serviceId}
          registration={register('serviceId', { valueAsNumber: true })}
          disabled={isDisabledEditableFields}
        />
        <SelectField
          label='Origen'
          options={[emptyOption, ...origins]}
          error={formState.errors?.originId}
          registration={register('originId', { valueAsNumber: true })}
          disabled
        />
        <InputField
          type='text'
          label='Código Fasecolda'
          error={formState.errors?.codeFasecolda}
          registration={register('codeFasecolda')}
          disabled
        />
        <InputField
          type='text'
          label='Placa'
          maxLength={6}
          error={formState.errors?.licencePlate}
          registration={register('licencePlate')}
          disabled
        />
        <InputField
          type='text'
          label='Número de chasis'
          error={formState.errors?.chassisNumber}
          registration={register('chassisNumber')}
          disabled={isDisabledEditableFields}
        />
        <InputField
          type='text'
          label='Motor'
          error={formState.errors?.engine}
          registration={register('engine')}
          disabled={isDisabledEditableFields}
        />
        <InputField
          type='text'
          label='Color Principal'
          error={formState.errors?.mainColor}
          registration={register('mainColor')}
          disabled={isDisabledEditableFields}
        />
        <InputField
          type='text'
          label='Color Secundario'
          error={formState.errors?.secondaryColor}
          registration={register('secondaryColor')}
          disabled={isDisabledEditableFields}
        />
        <SelectField
          label='Condición'
          options={[emptyOption, ...conditions]}
          error={formState.errors?.conditionId}
          registration={register('conditionId', { valueAsNumber: true })}
          disabled
        />
        <InputField
          type='text'
          label='Valor Bruto'
          error={formState.errors?.grossValue}
          registration={register('grossValue', { valueAsNumber: true })}
          disabled={isDisabledGrossValue}
        />
        <SelectField
          label='Estado del vehículo'
          options={[emptyOption, ...statusVehicle]}
          error={formState.errors?.statusVehicleId}
          registration={register('statusVehicleId', { valueAsNumber: true })}
          disabled
        />
        <SelectField
          label='Tipo de combustible'
          options={[emptyOption, ...fuelTypes]}
          error={formState.errors?.typeFuelId}
          registration={register('typeFuelId', { valueAsNumber: true })}
          disabled
        />
        <SelectField
          label='Oficina'
          options={[emptyOption, ...offices]}
          error={formState.errors?.officeId}
          registration={register('officeId', { valueAsNumber: true })}
          disabled
        />
        <SelectField
          label='Tipo de carrocería'
          options={[emptyOption, ...bodyworkTypes]}
          error={formState.errors?.typeBodyworkId}
          registration={register('typeBodyworkId', { valueAsNumber: true })}
          disabled
        />
        <InputField
          type='text'
          label='Kilometraje'
          error={formState.errors?.mileage}
          registration={register('mileage')}
          disabled
        />
        <InputField
          type='text'
          label='Descripción'
          error={formState.errors?.description}
          registration={register('description')}
          disabled
        />
        <SelectField
          label='Tipo de transmisión'
          options={[emptyOption, ...transmissionTypes]}
          error={formState.errors?.typeTransmissionId}
          registration={register('typeTransmissionId', { valueAsNumber: true })}
          disabled
        />
        <SelectField
          label='Tipo de tracción'
          options={[emptyOption, ...tractionTypes]}
          error={formState.errors?.typeTractionId}
          registration={register('typeTractionId', { valueAsNumber: true })}
          disabled
        />
        <InputField
          type='text'
          label='Serie'
          error={formState.errors?.serie}
          registration={register('serie')}
          disabled={isDisabledEditableFields}
        />
        <InputField
          type='text'
          label='Puertas'
          error={formState.errors?.doors}
          registration={register('doors', { valueAsNumber: true })}
          disabled
        />
        <InputField
          type='text'
          label='Capacidad'
          error={formState.errors?.capacity}
          registration={register('capacity', { valueAsNumber: true })}
          disabled
        />
        <InputField
          type='text'
          label='Numero VIN'
          error={formState.errors?.vin}
          registration={register('vin')}
          disabled={isDisabledEditableFields}
        />
        <SelectField
          label='Ciudad'
          options={[emptyOption, ...municipalities]}
          value={initialValues.cityCode}
          disabled
        />
      </div>
      <div className='flex justify-end gap-2'>
        {!isDisabledEditableFields && (
          <Button
            color='light'
            onClick={() => {
              setInitialValues()
              toggleEditableFields()
            }}
          >
            Cancelar
          </Button>
        )}
        <Button color='light' onClick={() => toggleEditableFields()}>
          {isDisabledEditableFields ? 'Habilitar' : 'Deshabilitar'}
        </Button>
        <Button
          variant='gradient'
          type='submit'
          isLoading={isSubmitting}
          disabled={isSubmitting || isDisabledEditableFields}
        >
          Guardar
        </Button>
      </div>
    </form>
  )
}
