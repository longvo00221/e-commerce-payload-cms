import React from 'react';
import PhoneComponent from './Phone';
import MessageComponent from './Chat';


const ContactComponent = () => {
    
    return (
        <div className='flex flex-col gap-5 items-center justify-center bottom-12 right-12 z-10 fixed'>
            <MessageComponent/>
            <PhoneComponent/>
        </div>
    )
    
}
export default ContactComponent;