import { DashboardPage } from '@/components/dashboard-page'
import { db } from '@/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { UpgradePageContent } from './_components/upgrade-page-content'
import { formatTitle } from '@/lib/utils'

const Page = async () => {
    const auth = await currentUser()

    if (!auth) {
        redirect("/sign-in")
    }

    const user = await db.user.findUnique({
        where: { externalId: auth.id },
    })

    if (!user) {
        redirect("/sign-in")
    }

    const plan = formatTitle(user.plan)
    return (
        <DashboardPage title="User Membership">
            <UpgradePageContent plan={user.plan} />
        </DashboardPage>
    )
}

export default Page