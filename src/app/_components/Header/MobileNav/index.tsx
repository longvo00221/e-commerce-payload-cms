import React from 'react'
import { Header as HeaderType, User } from '../../../../payload/payload-types'
import Link from 'next/link'
import { Button } from '../../../components/ui/button'
import Image from 'next/image'
import { CMSLink } from '../../Link'

type MobileNavProps = {
  header: HeaderType
  user: User
  isNavMobileOpen: boolean
  setIsNavMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileNav: React.FC<MobileNavProps> = ({
  header,
  user,
  isNavMobileOpen,
  setIsNavMobileOpen,
}) => {
  const navItems = header?.navItems || []

  const handleLinkClick = () => {
    setIsNavMobileOpen(false) // Đóng MobileNav khi click vào một liên kết
  }

  return (
    <div
      className={`fixed inset-0 bg-white w-full h-screen flex flex-col items-center justify-center ${
        isNavMobileOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="absolute top-0 left-0 mt-4 ml-4">
        <Button variant="ghost" onClick={() => setIsNavMobileOpen(false)}>
          <Image src="/assets/icons/x.svg" alt="Close" width={24} height={24} />
        </Button>
      </div>
      <ul className="space-y-4  flex flex-col items-center justify-center">
        {navItems.map(({ link }, i) => {
          return (
            <div onClick={handleLinkClick} key={i}>
              <CMSLink {...link} appearance="none" className="!text-2xl !p-2 !mt-4 !font-normal" />
            </div>
          )
        })}
      </ul>
      <div className="flex flex-col items-center justify-center">
        <Link
          href="/cart"
          className="mt-4 rounded-full p-2 hover:bg-black/10"
          onClick={handleLinkClick}
        >
          <p className="text-2xl">Cart</p>
        </Link>
        {user ? (
          <Link
            href="/account"
            className="mt-4 rounded-full p-2 hover:bg-black/10"
            onClick={handleLinkClick}
          >
            <p className="text-2xl">Account</p>
          </Link>
        ) : (
          <Button className="mt-4 text-2xl" onClick={() => (window.location.href = '/login')}>
            Login
          </Button>
        )}
      </div>
    </div>
  )
}

export default MobileNav
