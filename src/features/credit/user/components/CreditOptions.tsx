import { FC, Fragment, useState } from 'react'
import { DefaultValues } from 'react-hook-form'
import { BsCheck2 } from 'react-icons/bs'
import { HiSelector } from 'react-icons/hi'
import { Listbox, Transition } from '@headlessui/react'

import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/utils/format'

import { ApprovedOption } from '../../common'
import { useApplicationContext } from '../store/ApplicationContext'

import { CreditSelectionValues } from './ApplicationForms/ExtraFieldsForm'

export type CreditOptionsProps = {
  onSuccess: (values: CreditSelectionValues) => void
  defaultValues?: DefaultValues<CreditSelectionValues>
}

export const CreditOptions: FC<CreditOptionsProps> = ({ onSuccess, defaultValues }) => {
  const { approvedOptions } = useApplicationContext()
  const [selectedOption, setSelectedOption] = useState<ApprovedOption | undefined>(
    defaultValues?.chosenAmount
      ? { month: String(defaultValues!.chosenTerm), value: defaultValues!.chosenAmount! }
      : undefined
  )

  const hasSelectedOption = selectedOption && selectedOption.month && selectedOption.value

  const handlesubmit = () => {
    if (!selectedOption) return

    onSuccess({
      chosenAmount: selectedOption.value,
      chosenTerm: Number(selectedOption.month),
    })
  }

  return (
    <div className='max-w-lg mx-auto accent-primary'>
      <div>
        <p className='my-3'>
          Tu solicitud fue aprobada, por favor escoge uno de los plazos que fueron aprobados
        </p>
      </div>

      <Listbox value={selectedOption} onChange={setSelectedOption}>
        <div className='relative mt-1'>
          <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-3 pl-3 pr-10 text-left border-2 border-gray-200 focus:outline-none focus-visible:border-primary text-lg'>
            {selectedOption ? (
              <div className='flex justify-between'>
                <span>{selectedOption.month} meses</span>
                <span className='font-semibold'>{formatCurrency(selectedOption.value)}</span>
              </div>
            ) : (
              <span className='block truncate text-gray-800'>Seleccione una cuota</span>
            )}

            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <HiSelector className='text-gray-400' aria-hidden='true' />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white z-10 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              {approvedOptions.map((option) => (
                <Listbox.Option
                  key={option.month}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-primary-50/20 text-primary' : 'bg-white text-gray-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <p
                        className={`flex justify-between truncate ${
                          selected ? 'font-semibold text-primary' : ''
                        }`}
                      >
                        <span>{option.month} meses</span>
                        <span>{formatCurrency(option.value)}</span>
                      </p>

                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600'>
                          <BsCheck2 className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      <div className='flex justify-end mt-3'>
        <Button variant='gradient' disabled={!hasSelectedOption} onClick={handlesubmit}>
          Continuar
        </Button>
      </div>
    </div>
  )
}
