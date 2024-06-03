'use client'
import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import {toast} from 'sonner'
type MailContactProps = {
  
};
const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  })
})
const MailContact: React.FC<MailContactProps> = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      email:""
    }
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      const data = new FormData()
      data.append("email", values.email)
      const SHEET_URL = process.env.NEXT_PUBLIC_SHEET_URL
      try {
        await fetch(SHEET_URL,{
          method:'POST',
          body:data
        })
        form.reset()
        toast.success("Thank you for your contact")
      } catch (error) {
        toast.error("Something went wrong. Please try again later.")
      }
    }catch (err) {
      toast.error(err.message)
    }
    }

  return (
    <div className="flex justify-center items-center border-t py-10">
      <div className="w-full max-w-sm">
      <h3 className="font-semibold text-3xl mb-5">Contact with us</h3>
        <div className="flex items-center md:flex-row flex-col justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex items-center gap-3 w-full">
              <FormField
              control={form.control}
              name="email"
              render={({field})=>(
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Enter your email" className="w-[250px]"/>
                  </FormControl>
                </FormItem>
              )}/>
              <Button type="submit" className="!mt-0">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default MailContact;


// sheet app script
// var sheetName = 'Sheet1'

//         var scriptProp = PropertiesService.getScriptProperties()

//         function intialSetup () {

//           var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()

//           scriptProp.setProperty('key', activeSpreadsheet.getId())

//         }

//         function doPost (e) {

//           var lock = LockService.getScriptLock()

//           lock.tryLock(10000)

//           try {

//             var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))

//             var sheet = doc.getSheetByName(sheetName)

//             var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]

//             var nextRow = sheet.getLastRow() + 1

//             var newRow = headers.map(function(header) {

//               return header === 'timestamp' ? new Date() : e.parameter[header]

//             })

//             sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

//             return ContentService

//               .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))

//               .setMimeType(ContentService.MimeType.JSON)

//           }

//           catch (e) {

//             return ContentService

//               .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))

//               .setMimeType(ContentService.MimeType.JSON)

//           }

//           finally {

//             lock.releaseLock()

//           }

//         }
// sheet link: https://docs.google.com/spreadsheets/d/1xFpeFSyAofJ1zPdTDW8WB5_VoxPeOYh1wf5umT4HNo8/edit#gid=0