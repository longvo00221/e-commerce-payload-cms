'use client'
import React, { useEffect, useState } from 'react'
import { CartLink } from '../../CartLink'
import type { User } from '../../../../payload/payload-types'
import { Button } from '../../../components/ui/button'
import { useTheme } from '../../../_providers/Theme'
import Image from 'next/image'
import Link from 'next/link'
type UserNavProps = {
  user: User
}

const darkThemeIcon = '/assets/icons/moon.svg'
const lightThemeIcon = '/assets/icons/sun.svg'

const UserNav: React.FC<UserNavProps> = ({ user }) => {
  const { theme, setTheme } = useTheme()

  const [themeIcon, setThemeIcon] = useState(darkThemeIcon)

  useEffect(() => {
    setThemeIcon(theme === 'dark' ? darkThemeIcon : lightThemeIcon)
  }, [theme])

  const handleSetTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="flex items-center gap-3 md:w-auto w-full justify-end md:mt-0 mt-3 md:border-none border-t-slate-950">
      <Button
        variant="ghost"
        className="rounded-full p-[10px] max-w-[45px] max-h-[45px]"
        onClick={handleSetTheme}
      >
        <Image src={themeIcon} alt="theme icon" width={25} height={25} />
      </Button>
      <CartLink />
      {user && (
        <Link
          href="/account"
          className="rounded-full p-[10px] max-w-[45px] max-h-[45px] hover:bg-black/10"
        >
          <Image src="/assets/icons/user.svg" alt="theme icon" width={25} height={25} />
        </Link>
      )}
      {!user && <Button onClick={() => (window.location.href = '/login')}>login</Button>}
    </div>
  )
}

export default UserNav
