'use client'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../../components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import type { Order, Product } from '../../../../payload/payload-types'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type CheckoutFormProps = {
  cart: { items?: { product?: string | Product; quantity?: number; id?: string }[] }
  cartTotal: { formatted: string; raw: number }
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'name must be at least 2 characters.',
  }),
  phone: z.string().min(10, {
    message: 'phone must be at least 10 characters.',
  }),
  address: z.string().min(2, {
    message: 'address must be at least 2 characters.',
  }),
})

const CheckoutForm: React.FC<CheckoutFormProps> = ({ cart, cartTotal }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
    },
  })
  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          total: cartTotal.raw,
          name: values.name,
          phone: values.phone,
          address: values.address,
          items: (cart?.items || [])?.map(({ product, quantity }) => {
            if (typeof product === 'object') {
              const {
                color,
                createdAt,
                id,
                price,
                priceJSON,
                publishedOn,
                stripeProductID,
                title,
              } = product
              return {
                product: id,
                color,
                createdAt,
                id,
                price,
                priceJSON,
                publishedOn,
                stripeProductID,
                title,
                quantity,
              }
            } else {
              return { product, quantity }
            }
          }),
        }),
      })

      if (!orderReq.ok) throw new Error(orderReq.statusText || 'Something went wrong.')

      const {
        error: errorFromRes,
        doc,
      }: {
        message?: string
        error?: string
        doc: Order
      } = await orderReq.json()

      if (errorFromRes) throw new Error(errorFromRes)
      toast.success('Order placed successfully.')
      router.push(`/order-confirmation?order_id=${doc.id}`)
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default CheckoutForm
