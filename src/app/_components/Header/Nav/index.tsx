'use client'

import React from 'react'
import Link from 'next/link'

import { Header as HeaderType, User } from '../../../../payload/payload-types'
import { CMSLink } from '../../Link'

import classes from './index.module.scss'
import { Button } from '../../../components/ui/button'
type HeaderNavTypes = {
  header: HeaderType
  user: User
}
export const HeaderNav: React.FC<HeaderNavTypes> = ({ header, user }) => {
  const navItems = header?.navItems || []

  return (
    <nav className={[classes.nav, user === undefined && classes.hide].filter(Boolean).join(' ')}>
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="none" />
      })}
    </nav>
  )
}
