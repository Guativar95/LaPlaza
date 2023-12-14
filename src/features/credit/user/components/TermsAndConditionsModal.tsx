import { useRef } from 'react'

import { Button } from '@/components/ui/Button'
import { Modal, ModalFooter, ModalHeader } from '@/components/ui/Modal'
import { ModalBody } from '@/components/ui/Modal/ModalBody'

interface TermsAndConditionsProps {
  show: boolean
  onAccept: () => void
}

export const TermsAndConditions = ({ show, onAccept }: TermsAndConditionsProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  return (
    <Modal show={show} size='xl' initialFocus={titleRef}>
      <ModalHeader title='Autorización de tratamiento de datos personales' />
      <ModalBody>
        <div className='overflow-y-auto max-h-96 py-3'>
          <p>
            Mediante el registro de mis datos personales en el presente formulario, autorizo a LA
            EMPRESA Y/O A QUIEN ELLA DESIGNE para que guarde, use, almacene, recolecte, trasfiera,
            trasmita a nivel nacional, internacional y realice el tratamiento de mis datos
            personales, comerciales y financieros recolectados por medio digital o escrito, con las
            siguientes finalidades: a) Proveer los servicio y/o productos requeridos, b) Dar a
            conocer sobre nuevos productos y/o sobre cambios en los mismo, información comercial,
            publicitaria o promocional y eventos; c) Programas de Fidelización de clientes; d)
            Análisis de perfiles en la red; e) Encuestas de opinión; f) Prospección comercial; g)
            Segmentación de mercados; h) Gestión administrativa; i) Gestión de fotografías, imágenes
            de video, ubicación especial, datos de ordenadores, teléfonos y números celulares, VPN,
            correo electrónico, que serán utilizados, con fines de autenticación e identificación
            por medio de mi firma electrónica y/o digital con el fin de verificar la autenticidad de
            la autorización. Conozco que dicha información será almacenada y utilizada para
            ofrecerme una capa adicional de seguridad. Sé que no estoy obligado a autorizar el
            tratamiento de los datos sensibles a menos que sea estrictamente necesario para algún de
            los fines descritos o requerido por ley; l) Conozco que la información recolectada en la
            web (chat, páginas web, aplicativos móviles, redes sociales, páginas web de aliados
            comerciales y similares); será utilizada para contactarme de manera directa para
            gestionar pedidos, ofrecer servicios, entregar productos, procesar pagos, actualizar
            registros con base en mis hábitos de navegación, mostrar contenidos como listas de
            deseos y opciones, para recomendarme productos y servicios que pudieran ser de mis
            interés comercial. También sé que hacen uso de esta información para mejorar la tienda
            física, en línea y plataforma electrónica, así como para trasmitir o trasferir
            información personal, comercial y financiera para que sea conocida y tratada por las
            personas naturales o jurídicas, filiales, matrices accionistas o vinculados económicos
            de la EMPRESA como entidades bancarias o del sector real, aliados comerciales de la
            comunidad Carfiao, nacionales o extranjeros, que presenten servicio de verificación,
            tecnológicos, logísticos, financieros y/o operativos; n) El control y la prevención del
            fraude; o) Prevención y control de actividades ilícitas incluyendo, pero sin limitarse
            al lavado de activos, financiación del terrorismo, soborno transnacional y/o los delitos
            asociados con corrupción.
          </p>
          <p>
            Declaro que la EMPRESA me ha informado de manera previa y expresa lo siguiente: i) los
            datos suministrados en la presente solicitud son recolectados atendiendo las
            disposiciones legales e instrucciones de las autoridades competentes en materia de
            protección de datos personales; ii) El responsable del dicho tratamiento es la empresa
            CARFIAO S.A.S., identificada con Nit 901.643.643-3, con domicilio principal en la
            Avenida Chía – Cajicá Conjunto El Portal - Las Margaritas. Local No. 02 – Chia,
            Cundinamarca; iii) Que en ciertas situaciones es necesario realizar trasferencias
            internacionales de mis datos para cumplir con las finalidades del mismo y con las
            obligaciones pre - contractuales y post contractuales; iv) que son facultativas las
            respuestas a las preguntas que me han hecho o me harán sobre datos personales sensibles,
            en consecuencia no he sido obligado a responderlas, por lo que autorizo a LA EMPRESA
            expresamente el tratamiento de los datos sentibles, entre los cuales se incluye los
            datos de los niños, niñas y adolescentes; v) Los derechos que me asisten como titular de
            los datos son actualizar, conocer, rectificar, modificar, suprimir el uso que le darán a
            mis datos, solicitar pruebas de la autorización y/o revocar la misma, los cuales puedo
            ejercer a través del canal de comunicación{' '}
            <a href='mailto:servicioalcliente@carfiao.com.co'>servicioalcliente@carfiao.com.co</a>
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className='w-full flex justify-end'>
          <Button color='light' onClick={onAccept}>
            Cerrar
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}
