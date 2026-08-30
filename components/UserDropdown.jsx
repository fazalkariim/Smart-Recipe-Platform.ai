'use client'

import { UserButton } from '@clerk/nextjs'
import { Badge } from '@/components/ui/badge'
import { Cookie, Refrigerator, Crown } from 'lucide-react'
import React from 'react'

const UserDropdown = ({ user }) => {
  const isPro = user?.subscriptionTier === "pro";

  return (
    <div className="flex items-center gap-2">
      <Badge
        variant="outline"
        className={
          isPro
            ? "border-2 border-orange-600 text-orange-700 bg-orange-50 font-bold uppercase tracking-wide gap-1"
            : "border-2 border-stone-300 text-stone-500 bg-stone-50 font-bold uppercase tracking-wide"
        }
      >
        {isPro && <Crown className="w-3 h-3" />}
        {isPro ? "Pro" : "Free"}
      </Badge>

      <UserButton>
          <UserButton.MenuItems>
              <UserButton.Link
                  label="My Recipes"
                  labelIcon={<Cookie size={16}/>}
                  href="/recipes"
              />
              <UserButton.Link
                  label="My Pantry"
                  labelIcon={<Refrigerator size={16}/>}
                  href="/pantry"
              />
              <UserButton.Action label='manageAccount' />
          </UserButton.MenuItems>
      </UserButton>
    </div>
  )
}

export default UserDropdown