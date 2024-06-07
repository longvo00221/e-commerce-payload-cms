import React from 'react'
import PhoneComponent from './Phone'
import MessageComponent from './Chat'

const ContactComponent = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center bottom-12 md:right-12 right-6 z-10 fixed">
      <MessageComponent />
      <PhoneComponent />
    </div>
  )
}
export default ContactComponent
