import { Control, Controller, Path, PathValue, ValidationRule } from 'react-hook-form'
import {
  InputAttributes,
  NumberFormatValues,
  NumericFormat,
  NumericFormatProps,
} from 'react-number-format'
import clsx from 'clsx'

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'

export type ValueAs = 'number' | 'string' | 'format'
export type FormatAs = 'currency'
export type Rules = {
  required?: string | ValidationRule<boolean>
  min?: ValidationRule<string | number>
  max?: ValidationRule<string | number>
}

export type NumericFieldProps<T extends Record<string, unknown> = Record<string, unknown>> =
  FieldWrapperPassThroughProps &
    NumericFormatProps<InputAttributes> & {
      control?: Control<T, any>
      name?: Path<T>
      valueAs?: ValueAs
      formatAs?: FormatAs
      rules?: Rules
    }

const valueKeyByType: { [k in ValueAs]: keyof NumberFormatValues } = {
  format: 'formattedValue',
  number: 'floatValue',
  string: 'value',
}

export const NumericField = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>
>({
  control,
  label,
  error,
  name,
  className,
  onValueChange,
  valueAs = 'number',
  formatAs,
  required,
  rules,
  ...rest
}: NumericFieldProps<TFormValues>) => {
  const numericFormatProps = {
    ...(formatAs && formatAsProps[formatAs]),
    ...rest,
    required,
    name,
    onValueChange,
    className: clsx(
      'block w-full px-4 py-2 mt-2 text-black-700 bg-white placeholder:text-gray-400 border border-gray-200 rounded-md focus:border-primary-50 focus:ring-primary-50 focus:outline-none focus:ring focus:ring-opacity-40 disabled:bg-gray-100 disabled:text-gray-400',
      className
    ),
  }

  return (
    <FieldWrapper label={label} error={error} required={required}>
      {control && name ? (
        <Controller
          control={control}
          defaultValue={
            (numericFormatProps.defaultValue ?? numericFormatProps.value) as PathValue<
              TFormValues,
              string & Path<TFormValues>
            >
          }
          name={name}
          rules={rules}
          render={({ field: { name, value, onChange } }) => (
            <NumericFormat
              value={(value ? Number(value) : value) as string | string}
              {...numericFormatProps}
              name={name}
              onValueChange={(values, sourceInfo) => {
                onChange(values.value ? values[valueKeyByType[valueAs]] : '')
                onValueChange && onValueChange(values, sourceInfo)
              }}
            />
          )}
        />
      ) : (
        <NumericFormat {...numericFormatProps} />
      )}
    </FieldWrapper>
  )
}

type FormatAsProps = {
  [k in FormatAs]: NumericFormatProps<InputAttributes>
}

const formatAsProps: FormatAsProps = {
  currency: {
    prefix: '$ ',
    thousandSeparator: true,
  },
}
