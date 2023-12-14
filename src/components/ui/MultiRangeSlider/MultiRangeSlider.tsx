import { useCallback, useEffect, useRef, useState } from 'react'

export interface ChangeResult {
  min: number
  max: number
}

export interface MultiRangeSliderProps {
  min: number
  max: number
  step?: number
  onChange: (result: ChangeResult) => void
  formatValue?: (value: number) => string
}

export const MultiRangeSlider = ({
  min,
  max,
  step = 1,
  onChange,
  formatValue,
}: MultiRangeSliderProps) => {
  const [minVal, setMinVal] = useState(min)
  const [maxVal, setMaxVal] = useState(max)
  const minValRef = useRef(min)
  const maxValRef = useRef(max)
  const range = useRef<HTMLDivElement>(null)

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  )

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal)
    const maxPercent = getPercent(maxValRef.current)

    if (range.current) {
      range.current.style.left = `${minPercent}%`
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [minVal, getPercent])

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current)
    const maxPercent = getPercent(maxVal)

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [maxVal, getPercent])

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal })
  }, [minVal, maxVal, onChange])

  return (
    <div className='accent-primary pb-10'>
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - step)
          setMinVal(value)
          minValRef.current = value
        }}
        className='thumb thumb--left bg-primary text-red-500'
        style={{ zIndex: minVal > max - 100 ? '5' : '' }}
      />
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + step)
          setMaxVal(value)
          maxValRef.current = value
        }}
        className='thumb thumb--right'
      />

      <div className='slider'>
        <div className='slider__track' />
        <div ref={range} className='slider__range bg-primary' />
      </div>
      <div className='flex justify-between text-sm pt-5'>
        <div className='flex flex-col'>
          <p className='text-gray-500'>Desde</p>
          <p className='bg-gray-200 rounded-md p-1 text-gray-900'>
            {formatValue ? formatValue(minVal) : minVal}
          </p>
        </div>
        <div className='flex flex-col items-end'>
          <p className='text-gray-500'>Hasta</p>
          <p className='bg-gray-200 rounded-md p-1 text-gray-900'>
            {formatValue ? formatValue(maxVal) : maxVal}
          </p>
        </div>
      </div>
    </div>
  )
}
