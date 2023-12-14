import React, { FormEventHandler, Ref } from 'react'
import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { ZodType, ZodTypeDef } from 'zod'

type FormProps<
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<unknown, ZodTypeDef, unknown>
> = {
  className?: string
  onSubmit: SubmitHandler<TFormValues>
  onError?: SubmitErrorHandler<TFormValues>
  onReset?: FormEventHandler
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode
  options?: UseFormProps<TFormValues>
  id?: string
  schema?: Schema
  innerRef?: Ref<HTMLFormElement>
}

export const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<unknown, ZodTypeDef, unknown>
>({
  onSubmit,
  onReset,
  onError,
  children,
  className,
  options,
  id,
  schema,
  innerRef,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({ ...options, resolver: schema && zodResolver(schema) })
  return (
    <form
      className={clsx('space-y-6', className)}
      onSubmit={methods.handleSubmit(onSubmit, onError)}
      onReset={onReset}
      id={id}
      ref={innerRef}
    >
      {children(methods)}
    </form>
  )
}
