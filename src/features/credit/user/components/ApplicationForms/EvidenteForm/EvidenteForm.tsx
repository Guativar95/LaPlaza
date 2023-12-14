import { FC, useState } from 'react'
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/Button'
import { VerificationQuestion } from '@/features/credit/common'

import { evidenteSchema, EvidenteValues } from './types'

export type EvidenteFormProps = {
  questions: VerificationQuestion[]
  onSuccess: SubmitHandler<EvidenteValues>
  isLoading?: boolean
}

export const EvidenteForm: FC<EvidenteFormProps> = ({ questions, isLoading, onSuccess }) => {
  const defaultQuestions = questions.map(() => ({ answerId: '' }))

  const {
    control,
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EvidenteValues>({
    defaultValues: { questions: defaultQuestions },
    resolver: zodResolver(evidenteSchema),
    mode: 'onChange',
  })

  const { fields } = useFieldArray({
    control,
    name: 'questions',
  })

  const [activeIndex, setActiveIndex] = useState(0)
  const nextQuestion = () => {
    trigger(`questions.${activeIndex}`).then((isValid) => {
      isValid && setActiveIndex((i) => i + 1)
    })
  }
  const prevQuestion = () => {
    setActiveIndex((i) => i - 1)
  }

  const isFirstIndex = activeIndex === 0
  const isLastIndex = activeIndex === fields.length - 1

  return (
    <>
      <div className='flex justify-end my-2 select-none'>
        <div className='bg-gray-200 rounded-full text-gray-800 py-1 px-4'>
          <p>
            {activeIndex + 1} / {fields.length}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSuccess)}>
        <section>
          {fields.map(({ id }, index) => {
            const { text, posibleAnswers, id: questionId } = questions[index]
            return (
              <fieldset key={id} className={activeIndex === index ? '' : 'hidden'}>
                <legend className='mb-3'>{text}</legend>
                <input
                  type='hidden'
                  value={questionId}
                  {...register(`questions.${index}.questionId`)}
                />
                <Controller
                  control={control}
                  name={`questions.${index}.answerId`}
                  render={({ field: { name, onChange } }) => (
                    <div className='flex flex-col gap-2'>
                      {posibleAnswers.map(({ id: answerId, text: answerText }) => (
                        <label key={answerId} className='flex gap-2 border rounded-md p-3'>
                          <input
                            type='radio'
                            value={answerId}
                            name={name}
                            onChange={onChange}
                            className='mt-1'
                          />
                          <span>{answerText}</span>
                        </label>
                      ))}
                    </div>
                  )}
                />
                {errors.questions?.[index]?.answerId && (
                  <span className='text-red-500'>
                    * {errors.questions[index]?.answerId?.message}
                  </span>
                )}
              </fieldset>
            )
          })}
        </section>
        <div className='flex justify-end gap-2 mt-4'>
          {!isFirstIndex && !isLoading && (
            <Button color='light' onClick={prevQuestion}>
              Anterior
            </Button>
          )}
          {!isLastIndex && <Button onClick={nextQuestion}>Siguiente</Button>}
          {isLastIndex && (
            <Button type='submit' isLoading={isLoading} disabled={isLoading}>
              {isLoading ? 'Verificando' : 'Verificar'}
            </Button>
          )}
        </div>
      </form>
    </>
  )
}
