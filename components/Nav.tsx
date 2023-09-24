"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@public/assets/images/logo.svg';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { MobileNavProps } from '@interface/types';

interface ButtonProps {
  onClick: () => void;
  text: string;
  className: string;
}

// Common Button component
function Button({ onClick, text, className }: ButtonProps) {
  return (
    <button type='button' onClick={onClick} className={className}>
      {text}
    </button>
  );
}

// Navbar logo and title component
function NavbarBrand() {
  return (
    <Link href='/'>
      <div className='flex-center gap-2'>
        <Image src={Logo} alt='Promptopia Logo' width={30} height={30} className='object-contain' />
        <p className='logo_text'>Prompt Verse</p>
      </div>
    </Link>
  );
}

// Desktop navigation component
function DesktopNav({ session, providers }: { session: any; providers: any }) {
  return (
    <div className='hidden sm:flex gap-4'>
      {session?.user ? (
        <div className='flex gap-3 md:gap-5'>
          <Link href='/create-prompt' className='black_btn'>
            Create Post
          </Link>

          <Button onClick={() => signOut()} text='Logout' className="outline_btn"/>

          <Link href='/profile' className='flex-center gap-2'>
            <Image
              src={session?.user?.image}
              alt='Prompt verse Logo'
              width={30}
              height={30}
              className='object-contain'
            />
          </Link>
        </div>
      ) : (
        <div>
          {providers &&
            Object.values(providers).map((provider) => (
              <Button 
              key={provider.name} 
              onClick={() => signIn(provider.id)} 
              text={`Sign in with ${provider.name}`} 
              className={'outline_btn'}
              />
            ))}
        </div>
      )}
    </div>
  );
}


// Mobile navigation component
function MobileNav({ session, providers, toggleDropdown, setToggleDropdown }: MobileNavProps) {
  return (
    <div className='flex sm:hidden relative'>
      {session?.user ? (
        <div className='flex'>
          <Image
            src={session?.user?.image}
            alt='profile'
            width={30}
            height={30}
            className='object-contain rounded-full'
            onClick={() => setToggleDropdown(!toggleDropdown)}
          />

          {toggleDropdown && (
            <div className='dropdown'>
              <div className='flex flex-col gap-3 md:gap-5'>
                <Link href='/profile' className='flex-center gap-2'>
                  Profile
                </Link>

                <Link href='/create-prompt' className='black_btn'>
                  Create Prompt
                </Link>

                <button type='button' className='outline_btn' onClick={() => signOut()}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {providers &&
            Object.values(providers).map((provider) => (
              <Button 
              key={provider.name} 
              onClick={() => signIn(provider.id)} 
              text={`Sign in with ${provider.name}`} 
              className={'outline_btn'}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default function Nav() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState({});
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  useEffect(() => {
    const setProviderFunc = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProviderFunc();
  }, []);

  return (
    <nav className='flex-between w-full mb-8 pt-3'>
      <NavbarBrand />
      <DesktopNav session={session} providers={providers} />
      <MobileNav session={session} providers={providers} toggleDropdown={toggleDropdown} setToggleDropdown={setToggleDropdown} />
    </nav>
  );
}
