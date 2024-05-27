import React from 'react';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import Image from 'next/image';

const MessageComponent = () => {
    return(
        <Link href="https://www.facebook.com" passHref>
            <Button className="md:w-18 md:h-18 rounded-full shadow-lg w-14 h-14 p-3 flex items-center justify-center bg-white hover:bg-black/10">
                <Image src="/assets/icons/message.svg" alt="Message icon" width={50} height={50}/>
            </Button>
        </Link>
    )
}
export default MessageComponent;
