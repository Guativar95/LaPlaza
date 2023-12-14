import { FC } from 'react'

import { normalizeText } from '@/utils/format'

import angryFaceIncative from '../../assets/icon/angryFaceInactive.svg'
import evil from '../../assets/icon/CARA_1-02.svg'
import notsogood from '../../assets/icon/CARA_2-03.svg'
import dissatisfied from '../../assets/icon/CARA_3-04.svg'
import happy from '../../assets/icon/CARA_4-05.svg'
import veryhappy from '../../assets/icon/CARA_5-06.svg'
import grinningFaceInactive from '../../assets/icon/grinningFaceInactive.svg'
import neutralFaceInactive from '../../assets/icon/neutralFaceInactive.svg'
import slightlyFrowningFaceInactive from '../../assets/icon/slightlyFrowningFaceInactive.svg'
import slightlySmilingFaceInactive from '../../assets/icon/slightlySmilingFaceInactive.svg'
import air from '../../assets/images/Aire-acondicionado.png'
import alarm from '../../assets/images/Alarma.png'
import typeBodywork from '../../assets/images/Carroceria.png'
import chassis from '../../assets/images/Chasis.png'
import distplacement from '../../assets/images/Cilindraje.png'
import color from '../../assets/images/Color.png'
import fuel from '../../assets/images/Combustible.png'
import steering from '../../assets/images/Direccion.png'
import electricMirrors from '../../assets/images/Espejos-electricos.png'
import fluidLeakage from '../../assets/images/Fugas-de-Fluidos.png'
import brassware from '../../assets/images/Latoneria.png'
import capacity from '../../assets/images/Pasajeros.png'
import painting from '../../assets/images/Pintura.png'
import plate from '../../assets/images/Placa.png'
import doors from '../../assets/images/Puertas.png'
import radio from '../../assets/images/Radio.png'
import sensorParking from '../../assets/images/Sensor-de-parqueo.png'
import sound from '../../assets/images/Sonido.png'
import upholstery from '../../assets/images/Tapiceria.png'
import transmission from '../../assets/images/Transmision.png'
import glass from '../../assets/images/Vidrio.png'
import { ColserautoValue, Vehicle } from '../../types'

import { Tabs } from './Tabs'
import { VehiclePropertyValue } from './VehiclePropertyItem'

export type VehiclePropertiesProps = {
  vehicle: Vehicle
  colserautoValues: ColserautoValue[]
  classNameTabHeader?: string
  classNameTabContent?: string
}

export const VehicleProperties: FC<VehiclePropertiesProps> = ({
  vehicle,
  colserautoValues,
  classNameTabContent,
  classNameTabHeader,
}) => {
  const getActiveIconByPercentage = (value: number) => {
    return value > 0 && value <= 20
      ? 1
      : value >= 21 && value <= 40
      ? 2
      : value >= 41 && value <= 60
      ? 3
      : value >= 61 && value <= 80
      ? 4
      : value >= 81 && value <= 100
      ? 5
      : 6
  }

  const renderRating = (value: number) => {
    const activeIcon = getActiveIconByPercentage(value)
    const title = `Puntuación de ${value}/100`

    return (
      <div className='flex' role='group' title={title}>
        <img
          src={activeIcon === 1 ? evil : angryFaceIncative}
          alt='Cara triste'
          className='w-[1.5rem]'
        />
        <img
          src={activeIcon === 2 ? notsogood : slightlyFrowningFaceInactive}
          alt='Cara triste'
          className='w-[1.5rem]'
        />
        <img
          src={activeIcon === 3 ? dissatisfied : neutralFaceInactive}
          alt='Cara triste'
          className='w-[1.5rem]'
        />
        <img
          src={activeIcon === 4 ? happy : slightlySmilingFaceInactive}
          alt='Cara triste'
          className='w-[1.5rem]'
        />
        <img
          src={activeIcon === 5 ? veryhappy : grinningFaceInactive}
          alt='Cara triste'
          className='w-[1.5rem]'
        />
      </div>
    )
  }

  return (
    <Tabs
      classNameHeader={classNameTabHeader}
      classNameContent={classNameTabContent}
      tabs={[
        {
          label: 'Características',
          content: (
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
              {characteristics.map(({ key, icon, label }) => (
                <VehiclePropertyValue
                  key={`characteristic_${key}`}
                  icon={icon}
                  label={label}
                  value={vehicle[key]}
                />
              ))}
            </div>
          ),
        },
        {
          label: 'Detalles',
          content: (
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
              {details.map(({ name, icon }) => {
                const item = colserautoValues.find(
                  (item) => normalizeText(item.name) === normalizeText(name)
                )
                return (
                  <VehiclePropertyValue
                    key={`details_${name}`}
                    icon={icon}
                    label={name}
                    value={item?.value ?? ''}
                  />
                )
              })}
              <VehiclePropertyValue
                icon={plate}
                label={'Placa'}
                value={vehicle.licencePlatePair ? 'Par' : 'Impar'}
              />
              <VehiclePropertyValue
                icon={plate}
                label={'N° Placa'}
                value={vehicle.licencePlate.split('')[vehicle.licencePlate.length - 1]}
              />
              <VehiclePropertyValue
                icon={plate}
                label={'Ciudad matrícula'}
                value={vehicle.cityName}
              />
            </div>
          ),
        },
        {
          label: 'Diagnóstico',
          content: (
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4'>
              {diagnostic.map(({ name, icon }) => {
                const item = colserautoValues.find(
                  (item) => normalizeText(item.name) === normalizeText(name)
                )
                return (
                  <VehiclePropertyValue
                    key={`details_${name}`}
                    icon={icon}
                    label={name}
                    value={renderRating(Number(item?.actual || item?.value))}
                  />
                )
              })}
            </div>
          ),
        },
      ]}
    />
  )
}

type Characteristic = {
  label: string
  key: keyof Vehicle
  icon: string
}

type ColserautoMappingValue = {
  name: string
  icon: string
}

const characteristics: Characteristic[] = [
  {
    label: 'Servicio',
    key: 'service',
    icon: upholstery,
  },
  {
    label: 'Transmisión',
    key: 'typeTransmission',
    icon: transmission,
  },
  {
    label: 'Combustible',
    key: 'typeFuel',
    icon: fuel,
  },
  {
    label: 'Cilindraje',
    key: 'distplacement',
    icon: distplacement,
  },
  {
    label: 'Carrocería',
    key: 'typeBodywork',
    icon: typeBodywork,
  },
  {
    label: 'Pasajeros',
    key: 'capacity',
    icon: capacity,
  },
  {
    label: 'Color principal',
    key: 'mainColor',
    icon: color,
  },
  {
    label: 'Puertas',
    key: 'doors',
    icon: doors,
  },
  {
    label: 'Clase',
    key: 'class',
    icon: typeBodywork,
  },
  {
    label: 'Tracción',
    key: 'typeTraction',
    icon: typeBodywork,
  },
]

const details: ColserautoMappingValue[] = [
  {
    name: 'Dirección',
    icon: steering,
  },
  {
    name: 'Aire acondicionado',
    icon: air,
  },
  {
    name: 'Sonido',
    icon: sound,
  },
  {
    name: 'Radio',
    icon: radio,
  },
  {
    name: 'Espejos electricos',
    icon: electricMirrors,
  },
  {
    name: 'Alarma',
    icon: alarm,
  },
  {
    name: 'Sensor de parqueo',
    icon: sensorParking,
  },
]

const diagnostic: ColserautoMappingValue[] = [
  {
    name: 'Latonería',
    icon: brassware,
  },
  {
    name: 'Pintura',
    icon: painting,
  },
  {
    name: 'Vidrios',
    icon: glass,
  },
  {
    name: 'Chasis',
    icon: chassis,
  },
  {
    name: 'Tapicería',
    icon: upholstery,
  },
  {
    name: 'Fugas de fluidos',
    icon: fluidLeakage,
  },
]
