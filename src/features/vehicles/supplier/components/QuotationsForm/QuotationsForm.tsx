import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { DefaultValues, useFieldArray, useForm } from 'react-hook-form'
import { BiEditAlt } from 'react-icons/bi'
import { FaRegCheckCircle } from 'react-icons/fa'
import { ImAttachment } from 'react-icons/im'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { MdOutlineClose, MdOutlinePendingActions } from 'react-icons/md'
import { zodResolver } from '@hookform/resolvers/zod'

import { InputField, NumericField, Option, SelectField } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { ImagesGallery } from '@/components/ui/ImagesGallery'
import { UploadImages } from '@/components/ui/UploadImages'
import { getEstimateTypes } from '@/features/vehicles/admin/api/getEstimateTypes'
import { DetailRequest } from '@/features/vehicles/common'
import { emptySelect } from '@/utils/defaults'

import { getTaxes } from '../../api/getTaxes'
import { QuotationTaxesModal } from '../QuotationTaxesModal'

import { quotationsSchema, QuotationsValues, TaxesValues } from './types'

export type QuotationsFormProps = {
  formId?: string
  disabled?: boolean
  requests: DetailRequest[]
  onSuccess?: (values: QuotationsValues) => void
  allowAddQuotation?: boolean
}

export const QuotationsForm: FC<QuotationsFormProps> = ({
  formId,
  requests,
  disabled,
  onSuccess,
  allowAddQuotation = false,
}) => {
  const defaultValues = useMemo<DefaultValues<QuotationsValues>>(
    () => ({
      quotation: requests.map((request) => ({
        value: request.value,
        observation: request.observations?.[0]?.value,
        description: request.description || '-',
        attatchment: null,
        total: 0,
      })),
    }),
    []
  )

  const {
    handleSubmit,
    control,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<QuotationsValues>({
    resolver: zodResolver(quotationsSchema),
    defaultValues,
    mode: 'all',
  })

  const totalWithTaxesItemsRef = useRef<number[]>([])

  const [estimates, setEstimates] = useState<Option[]>([])
  const [selectedTexasIndex, setSelectedTexasIndex] = useState<number | null>(null)
  const [total, setTotal] = useState(0)
  const defaultTaxesRef = useRef([] as TaxesValues)

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'quotation',
  })

  const [values, setValues] = useState<number[]>(
    requests.map(({ value, acepted }) => (acepted === false ? 0 : value ?? 0))
  )

  const loadEstimates = async () => {
    const { data } = await getEstimateTypes()
    setEstimates(data.map(({ id, name }) => ({ label: name, value: id })))
  }

  const appendQuotation = () => {
    append({
      observation: '',
      value: 0,
      total: 0,
      description: '',
      attatchment: null,
      startDate: '',
      endDate: '',
      taxes: defaultTaxesRef.current,
    })

    if (estimates.length === 0) {
      loadEstimates()
    }
  }

  const removeQuotation = (idx: number) => {
    remove(idx)
    setValues((v) => v.filter((_, i) => i !== idx))
  }

  const constructUpdateTaxesQutation = (idx: number) => (taxes: TaxesValues) => {
    const currentValues = getValues('quotation')[idx]
    update(idx, { ...currentValues, taxes })
    setTotal(calcTotal())
  }

  // Calc total of quotation values + taxes
  const calcTotal = () => {
    const quotationValues = getValues('quotation')

    let subtotal = 0
    let totalTaxes = 0
    const totalItems: number[] = []

    values.forEach((quotationValue, idx) => {
      const taxesQuotation = quotationValues[idx].taxes

      const quotationTaxes = disabled
        ? 0
        : taxesQuotation?.reduce((acc, cur) => {
            const percentage = (cur.value * quotationValue) / 100

            return percentage + acc
          }, 0)

      subtotal += quotationValue
      totalTaxes += quotationTaxes
      totalItems[idx] = quotationValue + quotationTaxes
    })

    totalWithTaxesItemsRef.current = totalItems
    return subtotal + totalTaxes
  }

  // Set default taxes
  useEffect(() => {
    getTaxes({ addByDefault: true }).then(({ data: defaultTaxes }) => {
      const taxesDetailRequest = defaultTaxes.map(({ id, name, defaultValue }) => ({
        taxId: id,
        name,
        value: defaultValue ?? 0,
      }))

      defaultTaxesRef.current = taxesDetailRequest
      values.forEach((_, idx) => {
        update(idx, { ...fields[idx], taxes: taxesDetailRequest })
      })
    })
  }, [])

  useEffect(() => {
    setTotal(calcTotal())
  }, [values])

  const minStartDate = new Date().toISOString().split('T')[0]

  const handleSuccess = (values: QuotationsValues) => {
    const quotationWithTotal = values.quotation.map((q, idx) => {
      return { ...q, total: totalWithTaxesItemsRef.current[idx] }
    })

    onSuccess && onSuccess({ quotation: quotationWithTotal })
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleSuccess)} id={formId}>
        <div className='flex flex-col gap-3'>
          {fields.map(({ id, observation, value }, i) => {
            const request = requests[i] ?? {}
            const isNewQuotation = !requests[i]
            const acepted = request ? request.acepted : null

            const showImages = !isNewQuotation && request.images && request.images.length > 0

            return (
              <fieldset key={id} className='bg-white p-2 rounded-md shadow-sm '>
                <div className='flex flex-col gap-2 relative lg:flex-row'>
                  <div className='w-full flex items-center gap-2'>
                    <div className='px-2'>
                      {acepted === true && <FaRegCheckCircle className='text-green-500 text-3xl' />}
                      {acepted === false && (
                        <IoMdCloseCircleOutline className='text-red-500 text-4xl' />
                      )}
                      {acepted === null && (
                        <MdOutlinePendingActions className='text-sky-600 text-3xl' />
                      )}
                    </div>
                    {isNewQuotation ? (
                      <div className={`w-full self-start`}>
                        <SelectField
                          label='Tipo reparación'
                          options={[emptySelect, ...estimates]}
                          registration={register(`quotation.${i}.description`)}
                          error={errors.quotation?.[i]?.description}
                        />
                      </div>
                    ) : (
                      <div className='w-full px-2'>
                        <p>{request.typeEstimate}</p>
                        <p className='text-gray-500'>{request.description}</p>
                      </div>
                    )}
                  </div>
                  <InputField
                    type='date'
                    label='Fecha inicio'
                    defaultValue={request?.startDate && request.startDate.split('T')[0]}
                    min={minStartDate}
                    registration={register(`quotation.${i}.startDate`)}
                    error={errors.quotation?.[i]?.startDate}
                    disabled={disabled}
                  />
                  <InputField
                    type='date'
                    label='Fecha fin'
                    defaultValue={request?.endDate && request.endDate.split('T')[0]}
                    min={minStartDate}
                    registration={register(`quotation.${i}.endDate`)}
                    error={errors.quotation?.[i]?.endDate}
                    disabled={disabled}
                  />
                  <div className='w-full lg:max-w-md'>
                    <InputField
                      label='Descripción'
                      defaultValue={observation}
                      placeholder='Descripcion'
                      registration={register(`quotation.${i}.observation`)}
                      error={errors.quotation?.[i]?.observation}
                      disabled={disabled}
                    />
                  </div>
                  <div className='w-full lg:max-w-xs'>
                    <NumericField
                      label='Valor'
                      control={control}
                      placeholder='$'
                      formatAs='currency'
                      defaultValue={value}
                      name={`quotation.${i}.value`}
                      error={errors.quotation?.[i]?.value}
                      onValueChange={({ floatValue }) =>
                        setValues((prevValues) => {
                          const copyValues = [...prevValues]
                          copyValues[i] = floatValue ?? 0
                          return copyValues
                        })
                      }
                      disabled={disabled}
                    />
                  </div>
                  <div className='flex items-center'>
                    <button
                      type='button'
                      className='text-primary mt-7'
                      onClick={() => setSelectedTexasIndex(i)}
                    >
                      <BiEditAlt className='text-4xl' />
                    </button>
                  </div>
                  <div className='absolute -top-3 -right-2 flex items-center gap-2'>
                    {isNewQuotation && (
                      <button
                        type='button'
                        onClick={() => removeQuotation(i)}
                        className='rounded-full p-0.5 bg-red-500 text-white text-xl'
                      >
                        <MdOutlineClose />
                      </button>
                    )}
                  </div>
                </div>
                {showImages && (
                  <div className='mt-2 bg-gray-50 rounded-md'>
                    <ImagesGallery
                      images={request.images!.map(({ route, name }) => ({ src: route, alt: name }))}
                    />
                  </div>
                )}
                {isNewQuotation && (
                  <details
                    className='mt-2'
                    open={errors.quotation?.[i]?.attatchment ? true : undefined}
                  >
                    <summary className='select-none'>
                      <ImAttachment className='inline-block text-primary' /> Adjuntar imagenes
                    </summary>
                    <div className='pt-2'>
                      {errors.quotation?.[i]?.attatchment?.images && (
                        <span className='text-red-500'>
                          {errors.quotation[i]?.attatchment?.images?.message}
                        </span>
                      )}
                      <UploadImages
                        limitAmount={50}
                        maxSizeInMB={2}
                        initialImages={getValues(`quotation.${i}.attatchment.images`) ?? []}
                        onChangeFiles={(files) =>
                          setValue(`quotation.${i}.attatchment`, {
                            images: files,
                            index: i,
                          })
                        }
                      />
                    </div>
                  </details>
                )}
              </fieldset>
            )
          })}
        </div>
        {allowAddQuotation && (
          <div className='flex justify-end my-2'>
            <Button onClick={() => appendQuotation()}>Agregar cotización</Button>
          </div>
        )}
        <div className='flex justify-end my-2 p-2 bg-white rounded-md shadow-sm'>
          <div className='flex items-center gap-5 w-full lg:max-w-sm'>
            <p className='text-xl font-bold'>Total</p>
            <div className='w-full'>
              <NumericField value={total} formatAs='currency' className='mt-0' disabled />
            </div>
          </div>
        </div>
      </form>

      {selectedTexasIndex !== null && (
        <QuotationTaxesModal
          show
          disabled={disabled}
          onClose={() => setSelectedTexasIndex(null)}
          onSuccess={(values) => {
            constructUpdateTaxesQutation(selectedTexasIndex)(values.taxes)
            setSelectedTexasIndex(null)
          }}
          defaultValues={{
            taxes: getValues('quotation')[selectedTexasIndex].taxes,
          }}
        />
      )}
    </>
  )
}
