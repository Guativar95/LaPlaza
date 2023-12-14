import React, { ButtonHTMLAttributes, useState } from 'react'

import { ContactModal } from './ContactModal'

export type ContactButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string
}

export const ContactButton: React.FC<ContactButtonProps> = ({ text, ...props }) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <button {...props} onClick={() => setShow(!show)}>
        {text}
      </button>
      {show && <ContactModal show={show} onClose={() => setShow(false)} />}
    </>
  )
}
