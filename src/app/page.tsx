import React from 'react';

import { Check } from "lucide-react";

import { MaxWidthWrapper } from './components/max-width-wrapper';
import { Heading } from './components/heading';
import { ShinyButton } from './components/shiny-button';

const Page = () => {

  const itemslist = [
    "Real-time Discord alerts for critical events",
    "Buy once, use forever",
    "Track sales, new users, or any other event"
  ];

  return (
    <>
      <section className='relative py-24 sm:py-32 bg-brand-25'>
        <MaxWidthWrapper className='text-center'>
          <div className='relative mx-auto flex flex-col items-center text-center gap-10'>
            <div>
              <Heading>
                <span>Real-Time Saas Insights, </span>
                <br />
                <span className='relative bg-gradient-to-r from-brand-700 to-brand-800 text-transparent bg-clip-text'>Delivered to Your Discord</span>
              </Heading>
            </div>
            <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">Pingpanda is the easiest way to monitor your Saas.
              Get instant notitication for <span className='font-semibold text-gray-700'>sales, new users,
                or any other event</span> sent directly to your Discord.
            </p>
            <ul className="space-y-2 text-base/7 text-gray-600 text-left flex flex-col items-start">
              {itemslist.map((item, index) => (
                <li key={index} className='flex gap-1.5 text-left items-center'>
                  <Check className='size-5 shrink-0 text-brand-700' />
                  {item}
                </li>
              ))}
            </ul>

            <div className="w-full max-w-80 ">
              <ShinyButton
                href='/sign-up'
                className='realtive z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl'>Start For Free Today</ShinyButton>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section></section>
      <section></section>
      <section></section>
    </>
  )
}

export default Page