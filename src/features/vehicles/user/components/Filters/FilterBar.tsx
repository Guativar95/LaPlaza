import { useEffect, useState } from 'react'
import { useFilterVehicles } from '@vehicles/common/hooks/useFilterVehicle'

import { RadioField } from '@/components/Form/RadioField'
import { MultiRangeSlider } from '@/components/ui/MultiRangeSlider'
import { Filters } from '@/hooks/useApiPagination'
import { formatCurrency, formatMileage } from '@/utils/format'

import { FilterApplyButton } from './FilterApplyButton'
import { FilterItem } from './FilterItem'

export interface FilterBarProps {
  filters: Filters
  cleaned: boolean
}

export const FilterBar = ({ filters, cleaned }: FilterBarProps) => {
  const {
    isLoading,
    brands,
    models,
    // bodyworkTypes,
    fuelTypes,
    tractionsTypes,
    transmissionTypes,
    monthlyFee,
    mileage,
    classTypes,
  } = useFilterVehicles()

  const [brandId, setBrandId] = useState<string>('')
  const [modelId, setModelId] = useState<string>('')
  const [minMileage, setMinMileage] = useState<number>(0)
  const [maxMileage, setMaxMileage] = useState<number>(0)
  const [minFee, setMinFee] = useState<number>(0)
  const [maxFee, setMaxFee] = useState<number>(0)
  // const [bodyworkId, setBodyworkId] = useState<string>('')
  const [fuelId, setFuelId] = useState<string>('')
  const [tractionId, setTractionId] = useState<string>('')
  const [transmissionId, setTransmissionId] = useState<string>('')
  const [licencePlatePair, setLicencePlatePair] = useState<string>('')
  const [classId, setClassId] = useState<string>('')

  const formatMileageWithKm = (value: number) => `${formatMileage(value)} Km`

  useEffect(() => {
    if (cleaned) {
      setBrandId('')
      setModelId('')
      setMinMileage(mileage.min)
      setMaxMileage(mileage.max)
      setMinFee(monthlyFee.min)
      setMaxFee(monthlyFee.max)
      // setBodyworkId('')
      setFuelId('')
      setTractionId('')
      setTransmissionId('')
      setLicencePlatePair('')
      setClassId('')
    }
  }, [cleaned])

  if (isLoading) return null

  return (
    <div className='bg-white rounded-xl shadow-lg flex justify-between items-center overflow-x-auto'>
      <FilterItem title='Marca'>
        <ul>
          {brands.map(({ label, value }) => (
            <li key={String(label)} className='capitalize'>
              <RadioField
                label={(label as string).toLowerCase()}
                value={value}
                name='brand'
                onChange={(e) => setBrandId(e.target.value)}
              />
            </li>
          ))}
        </ul>
        <FilterApplyButton
          onClick={() => {
            filters.add('BrandId', brandId)
          }}
        />
      </FilterItem>
      <span className='text-primary'>|</span>
      <FilterItem title='Año'>
        <ul>
          {models.map(({ label, value }, i) => (
            <li key={String(label) + i}>
              <RadioField
                label={label}
                value={value}
                name='model'
                onChange={(e) => setModelId(e.target.value)}
              />
            </li>
          ))}
        </ul>
        <FilterApplyButton
          onClick={() => {
            filters.add('ModelId', modelId)
          }}
        />
      </FilterItem>
      <span className='text-primary'>|</span>
      <FilterItem title='Kilometraje'>
        <div className='flex justify-between pb-5'>
          <div className='flex flex-col'>
            <p className='text-gray-500'>Mínimo</p>
            <p>{formatMileageWithKm(mileage.min)}</p>
          </div>
          <div className='flex flex-col items-end'>
            <p className='text-gray-500'>Máximo</p>
            <p>{formatMileageWithKm(mileage.max)}</p>
          </div>
        </div>
        <div>
          <MultiRangeSlider
            min={mileage.min}
            max={mileage.max}
            step={1000}
            formatValue={formatMileageWithKm}
            onChange={({ min, max }) => {
              setMinMileage(min)
              setMaxMileage(max)
            }}
          />
        </div>
        <FilterApplyButton
          onClick={() => {
            filters.add('MileageMin', minMileage)
            filters.add('MileageMax', maxMileage)
          }}
        />
      </FilterItem>
      <span className='text-primary'>|</span>
      <FilterItem title='Cuota mensual'>
        <div className='min-w-2xl'>
          <div className='flex justify-between pb-5'>
            <div className='flex flex-col'>
              <p className='text-gray-500'>Mínimo</p>
              <p>{formatCurrency(monthlyFee.min)}</p>
            </div>
            <div className='flex flex-col items-end'>
              <p className='text-gray-500'>Máximo</p>
              <p>{formatCurrency(monthlyFee.max)}</p>
            </div>
          </div>
          <div>
            <MultiRangeSlider
              min={monthlyFee.min}
              max={monthlyFee.max}
              step={1}
              formatValue={formatCurrency}
              onChange={({ min, max }) => {
                setMinFee(min)
                setMaxFee(max)
              }}
            />
          </div>
          <FilterApplyButton
            onClick={() => {
              filters.add('FeeMin', minFee)
              filters.add('FeeMax', maxFee)
            }}
          />
        </div>
      </FilterItem>
      {/* <span className='text-primary'>|</span>
      <FilterItem title='Carrocería'>
        <ul className='grid grid-cols-1 md:grid-cols-2'>
          {bodyworkTypes.map(({ label, value }) => (
            <li key={String(label)} className='capitalize'>
              <RadioField
                label={(label as string).toLowerCase()}
                value={value}
                name='bodywork'
                onChange={(e) => setBodyworkId(e.target.value)}
              />
            </li>
          ))}
        </ul>
        <FilterApplyButton
          onClick={() => {
            filters.add('TypeBodyworkId', bodyworkId)
          }}
        />
      </FilterItem> */}
      <span className='text-primary'>|</span>
      <FilterItem title='Tipo de carro'>
        <ul className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          {classTypes.map(({ label, value }) => (
            <li key={String(label)} className='capitalize'>
              <RadioField
                label={(label as string).toLowerCase()}
                value={value}
                name='class'
                onChange={(e) => setClassId(e.target.value)}
              />
            </li>
          ))}
        </ul>
        <FilterApplyButton
          onClick={() => {
            filters.add('ClassId', classId)
          }}
        />
      </FilterItem>
      <span className='text-primary'>|</span>
      <FilterItem title='Características' className='right-0'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div>
            <h2 className='font-semibold'>Combustible</h2>
            <ul className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              {fuelTypes.map(({ label, value }) => (
                <li key={String(label)}>
                  <RadioField
                    label={label}
                    value={value}
                    name='fuel'
                    onChange={(e) => setFuelId(e.target.value)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className='font-semibold'>Tracción</h2>
            <ul className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              {tractionsTypes.map(({ label, value }) => (
                <li key={String(label)}>
                  <RadioField
                    label={label}
                    value={value}
                    name='traction'
                    onChange={(e) => setTractionId(e.target.value)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className='font-semibold'>Transmisión</h2>
            <ul className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              {transmissionTypes.map(({ label, value }) => (
                <li key={String(label)}>
                  <RadioField
                    label={label}
                    value={value}
                    name='transmission'
                    onChange={(e) => setTransmissionId(e.target.value)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className='font-semibold'>Placa</h2>
            <ul className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              <li>
                <RadioField
                  label='Par'
                  value='true'
                  name='licencePlatePair'
                  onChange={(e) => setLicencePlatePair(e.target.value)}
                />
              </li>
              <li>
                <RadioField
                  label='Impar'
                  value='false'
                  name='licencePlatePair'
                  onChange={(e) => setLicencePlatePair(e.target.value)}
                />
              </li>
            </ul>
          </div>
        </div>
        <FilterApplyButton
          onClick={() => {
            filters.add('TypeFuelId', fuelId)
            filters.add('TypeTractionId', tractionId)
            filters.add('TypeTransmissionId', transmissionId)
            filters.add('LicencePlatePair', licencePlatePair)
          }}
        />
      </FilterItem>
    </div>
  )
}
