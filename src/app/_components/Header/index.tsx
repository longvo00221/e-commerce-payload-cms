{
  /* eslint-disable @next/next/no-img-element */
}

import React from 'react'
import Link from 'next/link'

import type { Header } from '../../../payload/payload-types'
import { fetchHeader } from '../../_api/fetchGlobals'
import HeaderComponent from './HeaderComponent'
export async function Header() {
  let header: Header | null = null

  try {
    header = await fetchHeader()
  } catch (error) {
    console.error(error)
  }

  return (
    <div className='w-full sticky top-0 dark:bg-black bg-white drop-shadow-md z-[999] py-5'>
      <HeaderComponent header={header} />
    </div>
  )
}
