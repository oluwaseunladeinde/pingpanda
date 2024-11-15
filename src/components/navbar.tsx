import React from 'react';
import Link from 'next/link';

import { MaxWidthWrapper } from './max-width-wrapper';

import { SignOutButton } from "@clerk/nextjs";
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { currentUser } from '@clerk/nextjs/server';


export const Navbar = async () => {

    const user = await currentUser();

    return (
        <nav className='sticky z-[100] h-16 inset-0 top-0 w-full border-b border-gray-200 bg-white/80 \
         backdrop-blur-lg transition-all'>
            <MaxWidthWrapper>
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className='flex z-40 font-semibold'>
                        Ping<span className='text-brand-700'>Panda</span>
                    </Link>
                    <div className="h-full flex items-center space-x-4">
                        {user ?
                            <>
                                <SignOutButton>
                                    <Button size={"sm"} variant={"ghost"} className=''>Sign Out</Button>
                                </SignOutButton>
                                <Link href="/dashboard" className={cn(buttonVariants({
                                    size: "sm",
                                    className: "flex items-center gap-1"
                                }))}>
                                    Dashboard <ArrowRight className='ml-1.5 size-4' />
                                </Link>
                            </>
                            :
                            <>
                                <Link href="/pricing" className={cn(buttonVariants({
                                    size: "sm",
                                    variant: "ghost"
                                }))}>
                                    Pricing
                                </Link>
                                <Link href="/sign-in" className={cn(buttonVariants({
                                    size: "sm",
                                    variant: "ghost"
                                }))}>
                                    Sign In
                                </Link>

                                <div className='h-8 w-px bg-gray-200' />

                                <Link href="/sign-up" className={cn(buttonVariants({
                                    size: "sm",
                                    className: "flex items-center gap-1.5"
                                }))}>
                                    Sign Up <ArrowRight className='ml-1.5 size-4' />
                                </Link>
                            </>
                        }
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}
