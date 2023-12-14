import React, { ChangeEvent, DragEvent, KeyboardEvent, useId, useRef } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'

type DropFileAreaProps = React.InputHTMLAttributes<HTMLInputElement> & {
  multiple?: boolean
  disabled?: boolean
  accept?: string
  onAddFiles: (files: File[]) => void
  onDrop?: (e: DragEvent<HTMLLabelElement>) => void
  onInputChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onDragOver?: (e: DragEvent<HTMLLabelElement>) => void
}

type DragEventArg = DragEvent<HTMLLabelElement>

export const DropAndSelectFileArea = ({
  disabled = false,
  onAddFiles,
  onDrop,
  onDragOver,
  onInputChange,
  ...inputProps
}: DropFileAreaProps) => {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = [...e.target.files]
      onAddFiles(files)
    }

    onInputChange && onInputChange(e)
  }

  const handleDrop = (e: DragEventArg) => {
    e.preventDefault()
    if (disabled) return

    if (e.dataTransfer.items) {
      const items = e.dataTransfer.items
      const files: File[] = []

      for (let i = 0; i < items.length; i++) {
        const file = items[i].getAsFile()
        file && files.push(file)
      }

      if (files.length > 0) {
        onAddFiles(files)
      }
    }

    onDrop && onDrop(e)
  }

  const handleDragOver = (e: DragEventArg) => {
    e.preventDefault()
    if (disabled) return

    onDragOver && onDragOver(e)
  }

  const handleKeyUp = (e: KeyboardEvent<HTMLLabelElement>) => {
    const el = inputRef.current
    if (!el) return

    if (['Space', 'Enter'].includes(e.code)) {
      el.click()
    }
  }

  return (
    <label
      className={`flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none focus:outline-none focus-visible:border-gray-400 ${
        disabled ? 'opacity-80' : 'hover:border-gray-400'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      htmlFor={`${id}upload_file`}
      tabIndex={0}
      onKeyUp={handleKeyUp}
    >
      <span className='flex items-center space-x-2 text-gray-600'>
        <AiOutlineCloudUpload className='text-2xl' />
        <span className='font-medium'>
          Suelte los archivos para adjuntarlos, o{' '}
          <span className={!disabled ? 'text-blue-600 underline' : ''}>examine</span>
        </span>
      </span>
      <input
        {...inputProps}
        ref={inputRef}
        disabled={disabled}
        type='file'
        name='file_upload'
        id={`${id}upload_file`}
        className='hidden'
        onChange={handleInputChange}
      />
    </label>
  )
}
