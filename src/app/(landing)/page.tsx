import React from 'react';

import { Check } from "lucide-react";

import { MaxWidthWrapper } from '@/components/max-width-wrapper';
import { Heading } from '@/components/heading';
import { ShinyButton } from '@/components/shiny-button';
import { MockDiscordUI } from '@/components/mock-discord-ui';
import { AnimatedList, AnimatedListItem } from '@/components/ui/animated-list';
import { DiscordMessage } from '@/components/discord-message';

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
      <section className='relative bg-brand-25 pb-4'>
        <div className="absolute inset-x-0 bottom-24 top-24 bg-brand-700" />
        <div className="relative mx-auto">
          <MaxWidthWrapper className='relative'>
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 ">
              <MockDiscordUI>
                <AnimatedList>
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="PingPanda Avatar"
                    username="PingPanda"
                    timestamp="Today at 12:35PM"
                    badgeText="SignUp"
                    badgeColor="#43b581"
                    title="👤 New user signed up"
                    content={{
                      name: "Mateo Ortiz",
                      email: "m.ortiz19@gmail.com",
                    }}
                  />
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="PingPanda Avatar"
                    username="PingPanda"
                    timestamp="Today at 12:35PM"
                    badgeText="Revenue"
                    badgeColor="#faa61a"
                    title="💰 Payment received"
                    content={{
                      amount: "$49.00",
                      email: "zoe.martinez2001@email.com",
                      plan: "PRO",
                    }}
                  />
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="PingPanda Avatar"
                    username="PingPanda"
                    timestamp="Today at 5:11AM"
                    badgeText="Milestone"
                    badgeColor="#5865f2"
                    title="🚀 Revenue Milestone Achieved"
                    content={{
                      recurringRevenue: "$5.000 USD",
                      growth: "+8.2%",
                    }}
                  />
                </AnimatedList>
              </MockDiscordUI>
            </div>
          </MaxWidthWrapper>
        </div>
      </section>
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
          <div>
            <h2 className="text-center text-base/7 font-semibold text-brand-600">
              Intuitive Monitoring
            </h2>
            <Heading>Stay ahead with real-time insights</Heading>
          </div>
        </MaxWidthWrapper>
      </section>
      <section></section>
    </>
  )
}

export default Page