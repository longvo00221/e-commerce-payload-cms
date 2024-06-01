'use client'
import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

type MailContactProps = {
  
};

const MailContact: React.FC<MailContactProps> = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    setEmail(''); // Reset email input after submitting
  };

  return (
    <div className="flex justify-center items-center border-t py-10">
      <div className="w-full max-w-sm">
      <h3 className="font-semibold text-3xl mb-5">Contact with us</h3>
        <div className="flex items-center md:flex-row flex-col justify-center">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className="mr-2"
        />
        <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default MailContact;
