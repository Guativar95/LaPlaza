import { FC } from 'react'

import { BooleanGroup, Form, NumericField } from '@/components/Form'
import { Button } from '@/components/ui/Button'

import { PreviousButton } from './PreviousButton'
import { FormProps, healthSchema, HealthValues } from './types'

export type HealthFormProps = FormProps<HealthValues> & {}

export const HealthForm: FC<HealthFormProps> = ({
  isLoading,
  onSuccess,
  onPrevious,
  defaultValues,
}) => {
  return (
    <>
      <h2 className='text-2xl mb-5 font-bold'>Declaración estado salud - Seguro de vida</h2>
      <Form<HealthValues, typeof healthSchema>
        schema={healthSchema}
        onSubmit={onSuccess}
        options={{ defaultValues }}
      >
        {({ control, formState: { errors } }) => (
          <>
            <BooleanGroup
              label='¿Padece, o ha padecido, le han diagnosticado o está siendo tratado, o está siendo estudiado por: Cualquier tipo de cáncer, leucemias linfomas, Diabetes, enfermedad de la piel crónica, enfermedades cardiovasculares, infarto, arritmias, trastornos valvulares, insuficiencia cardiaca, miocardiopatías, enfermedades psiquiátricas o Psicológicas, derrames cerebrales o isquemias cerebrales transitorias, tumores o malformaciones cerebrales, trastornos del movimiento o sensibilidad, enfermedades crónicas, enfermedad poliquística renal, trastornos articulares, dolores crónicos, enfermedades autoinmunes, enfermedades terminales, inmunodeficiencias, trasplantes previos, trastornos de la coagulación, alcoholismo, consume sustancias prohibidas, trastornos en los ojos diferentes a los que requieren lentes, trastornos auditivos o de la voz? enfermedades de carácter viral tipo hepatitis B o C, HIV positivo, SIDA, secuelas del covid?'
              control={control}
              name='hasDiseases'
              error={errors.hasDiseases}
            />
            <BooleanGroup
              label='¿Presenta usted alguna discapacidad, perdida anatómica o funcional de órganos o miembros, algún defecto y/o molestia física, trastornos articulares, del túnel carpiano, del hombro, de la columna vertebral o de las rodillas, trastornos de la voz, depresión y/o ansiedad, trastornos postraumáticos, de los ojos u oídos, o ha sido declarado en estado de invalidez o en incapacidad permanente parcial o sufre de alguna enfermedad aparte de las ya mencionadas, presenta secuelas de algún accidente y/o intervención quirúrgica o ha solicitado o percibido alguna indemnización por pérdida de la capacidad laboral? ¿Está siendo estudiado o desea ser estudiado por una junta o comisión médica de estudio de invalidez?'
              control={control}
              name='hasDisabilities'
              error={errors.hasDisabilities}
            />
            <BooleanGroup
              label='¿Tiene usted la intención de buscar consejo médico urgente, iniciar tratamiento o hacer cualquier prueba médica urgente que no sean chequeos de rutina? ¿Sufre o recientemente se le ha detectado o le han visto alguna condición que requiera de estudios urgentes?'
              control={control}
              name='requiresUrgentMedicalAttention'
              error={errors.requiresUrgentMedicalAttention}
            />
            <BooleanGroup
              label='¿Presenta usted el esquema completo de vacunación?'
              control={control}
              name='isFullyVaccinated'
              error={errors.isFullyVaccinated}
            />
            <div className='grid md:grid-cols-2 gap-3'>
              <NumericField
                control={control}
                name='weight'
                label='Peso (kg)'
                error={errors.weight}
                decimalSeparator=','
              />
              <NumericField
                control={control}
                name='height'
                label='Altura (mts)'
                error={errors.height}
                decimalSeparator=','
              />
            </div>
            <div className='flex justify-end gap-2'>
              <PreviousButton onPrevious={onPrevious} />
              <Button type='submit' isLoading={isLoading} disabled={isLoading}>
                Enviar
              </Button>
            </div>
          </>
        )}
      </Form>
    </>
  )
}
