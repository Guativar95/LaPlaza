import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'

import { NumericField } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'
import { feeInitialOptions, feesOptions } from '@/utils/defaults'
import { formatCurrency } from '@/utils/format'

import { calculateTerm } from '../../api/calculateTerm'
import { Vehicle } from '../../types'

export type FeeSimulatorValues = {
  initialPayment: number
  fee: number
  initialFee: number
}

export type FeeSimulatorProps = {
  vehicle: Pick<Vehicle, 'vehicleId' | 'initialFee' | 'grossValue'>
  onSuccess: (values: FeeSimulatorValues) => void
  readonly?: boolean
  defaultFee?: number
}

export const FeeSimulator: FC<FeeSimulatorProps> = ({
  vehicle,
  onSuccess,
  readonly,
  defaultFee = 60,
}) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FeeSimulatorValues>({ mode: 'all' })

  const [selectedInitialFee, setSelectedInitialFee] = useState<number>(10)
  const [initialFee, setInitialFee] = useState(vehicle.initialFee)
  const [selectedFee, setSelectedFee] = useState(defaultFee)
  const [monthlyFee, setMonthlyFee] = useState(0)
  const [isOtherValue, setIsOtherValue] = useState<boolean>(true)
  const [isShowModal, setIsShowModal] = useState<boolean>(false)

  const handleCalculateTerm = async () => {
    try {
      const { data } = await calculateTerm({
        initialFee,
        term: selectedFee,
        vehicleId: vehicle.vehicleId,
      })

      setMonthlyFee(data.monthlyFee)
    } catch (error) {}
  }

  const onSubmit = (values: FeeSimulatorValues) => {
    onSuccess({
      ...values,
      fee: selectedFee,
    })
  }

  useEffect(() => {
    const resultInitialFee = (vehicle.grossValue * selectedInitialFee) / 100
    setInitialFee(resultInitialFee)
    setValue('initialPayment', resultInitialFee)
    trigger('initialPayment')
  }, [selectedInitialFee])

  useEffect(() => {
    const _porcent = (initialFee * 100) / vehicle.grossValue
    if (_porcent < 10) return
    handleCalculateTerm()
  }, [initialFee, selectedFee])

  return (
    <div>
      <h2 className='font-harabara-mais-demo text-center text-secondary text-3xl'>
        Simula tu cuota
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mt-2'>
          <span className='text-xl font-bold'>Selecciona la cuota inicial que quieres pagar</span>
          <div>
            <div className='flex gap-2 flex-wrap justify-between'>
              {feeInitialOptions.map(({ value, label }, i) => (
                <label
                  key={value as number}
                  htmlFor={`${value}_${i}`}
                  className={clsx(
                    'p-2 rounded-lg rounded-tl-md rounded-br-sm',
                    value === selectedInitialFee ? 'bg-primary text-white' : 'bg-gray-200',
                    readonly ? 'opacity-75 cursor-not-allowed' : ''
                  )}
                  aria-disabled={readonly}
                >
                  <input
                    type='radio'
                    id={`${value}_${i}`}
                    defaultChecked={value === selectedInitialFee}
                    value={value}
                    className='hidden'
                    disabled={readonly}
                    {...register('initialFee', {
                      required: 'La cuota es requerida',
                      onChange: (e: ChangeEvent<HTMLInputElement>) => {
                        if (e.target.checked) {
                          const value = Number(e.target.value)
                          setSelectedInitialFee(value)
                        }
                      },
                    })}
                  />
                  <span className='font-bold'>{`${label}%`}</span>
                </label>
              ))}
            </div>
            {errors.fee && <span className='text-red-500 text-sm'>{errors.fee.message}</span>}
          </div>
        </div>
        <div className='max-w-6xl mx-auto flex flex-col gap-4'>
          <div className='my-2'>
            <div>
              <span>Cuota inicial</span>
            </div>
            <div className='w-full flex items-center justify-between mt-2 border border-gray-200 rounded-md'>
              <div className='flex-grow'>
                <NumericField
                  placeholder={formatCurrency(vehicle.initialFee)}
                  onValueChange={(values) => setInitialFee(values.floatValue || 0)}
                  value={initialFee}
                  formatAs='currency'
                  control={control}
                  name='initialPayment'
                  error={errors.initialPayment}
                  disabled={isOtherValue}
                  onBlur={() => {
                    const _porcent = (initialFee * 100) / vehicle.grossValue
                    if (_porcent < 10) setIsShowModal(true)
                  }}
                  rules={{
                    required: 'Cuota inicial requerida',
                    min: {
                      value: vehicle.initialFee,
                      message: `Mínimo ${formatCurrency(vehicle.initialFee)}`,
                    },
                    max: {
                      value: vehicle.grossValue,
                      message: `Máximo ${formatCurrency(vehicle.grossValue)}`,
                    },
                  }}
                  className='mt-0 border-0 disabled:bg-transparent focus:outline-none focus:ring-0'
                />
              </div>
              <button
                className='h-full block text-gray-300 px-3 flex-grow-0'
                disabled={readonly}
                onClick={(e) => {
                  e.preventDefault()
                  setIsOtherValue(!isOtherValue)
                }}
              >
                Quiero otro valor
              </button>
            </div>
          </div>
          <label>
            <span className='text-xl  font-bold'>
              Número de cuotas a las que quieres tu crédito
            </span>
            <div>
              <div className='flex gap-2 flex-wrap justify-between'>
                {feesOptions.map(({ value, label }, i) => (
                  <label
                    key={value as number}
                    htmlFor={`${value}_${i}`}
                    className={clsx(
                      'p-2 rounded-lg rounded-tl-md rounded-br-sm',
                      value === selectedFee ? 'bg-primary text-white' : 'bg-gray-200',
                      readonly ? 'opacity-75 cursor-not-allowed' : ''
                    )}
                    aria-disabled={readonly}
                  >
                    <input
                      type='radio'
                      id={`${value}_${i}`}
                      defaultChecked={value === selectedFee}
                      value={value}
                      className='hidden'
                      disabled={readonly}
                      {...register('fee', {
                        required: 'La cuota es requerida',
                        onChange: (e: ChangeEvent<HTMLInputElement>) => {
                          if (e.target.checked) {
                            setSelectedFee(Number(e.target.value))
                          }
                        },
                      })}
                    />
                    <span className='font-bold'>{label}</span>
                  </label>
                ))}
              </div>
              {errors.fee && <span className='text-red-500 text-sm'>{errors.fee.message}</span>}
            </div>
          </label>
          <div>
            <span className='text-xl'>Tu cuota mensual sería de:</span>
            <div className='flex flex-col gap-2 lg:flex-row lg:justify-between'>
              <span className='font-bold text-3xl'>{formatCurrency(monthlyFee)}*</span>
              <Button
                type='submit'
                variant='gradient'
                className='font-semibold'
                disabled={readonly}
              >
                !Lo quiero!
              </Button>
            </div>
          </div>
          <div>
            <span className='text-sm'>
              *El valor consta de cuota financiera, seguros, servicios adicionales y la tasa de
              interés se otorga según las condiciones del mercado.
            </span>
          </div>
        </div>
      </form>

      <Modal show={isShowModal} size='lg' onClose={() => setIsShowModal(false)}>
        <ModalHeader onClose={() => setIsShowModal(false)} />
        <ModalBody>
          <p className='text-xl  text-primary-700 font-bold'>
            Tu cuota inicial es inferior al 10% no se puede genera ningun calculo, si quieres
            realizar el calculo ingresa un valor de cuota inicial del 10%
          </p>
        </ModalBody>
      </Modal>
    </div>
  )
}
