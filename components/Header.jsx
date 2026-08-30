import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Cookie, Refrigerator } from "lucide-react";
import UserDropdown from "./UserDropdown";
import checkUser from "@/lib/checkUser";
import HowToCookModal from "./HowtoCookModal";

const Header = async () => {
  const user = await checkUser();

  return (
    <header
      className="fixed top-0 z-50 w-full border-b border-stone-200 bg-stone-50/80
      backdrop-blur-md supports-[backdrop-filter]:bg-stone-50/60"
    >
      <nav className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href={user ? "/dashboard" : "/"}
          className="shrink-0 justify-self-start"
          aria-label="Flavora home"
        >
          <Image
            src="/orangee.png"
            alt="Flavora"
            width={64}
            height={64}
            priority
            className="h-auto w-12 sm:w-16"
          />
        </Link>

        {/* Center: desktop links + How to Cook (always centered) */}
        <div className="flex items-center justify-center gap-8 justify-self-center text-sm font-medium text-stone-600">
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/recipes"
              className="flex items-center gap-1.5 transition-colors hover:text-orange-600"
            >
              <Cookie className="h-4 w-4 shrink-0" />
              My Recipes
            </Link>
            <Link
              href="/pantry"
              className="flex items-center gap-1.5 transition-colors hover:text-orange-600"
            >
              <Refrigerator className="h-4 w-4 shrink-0" />
              My Pantry
            </Link>
          </div>

          <Show when="signed-in">
            <HowToCookModal />
          </Show>
        </div>

        {/* Right cluster */}
        <div className="flex min-w-0 items-center justify-self-end gap-1.5 sm:gap-3">
          <Show when="signed-in">
            <UserDropdown user={user} />
          </Show>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="px-3 text-sm font-medium text-stone-600 hover:bg-orange-50 hover:text-orange-600 sm:px-4"
              >
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                variant="primary"
                className="rounded-full px-4 text-sm whitespace-nowrap sm:px-6"
              >
                Get started
              </Button>
            </SignUpButton>
          </Show>
        </div>
      </nav>
    </header>
  );
};

export default Header;
