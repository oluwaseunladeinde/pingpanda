import { DashboardPage } from '@/components/dashboard-page';
import { db } from '@/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import { DashboardPageContent } from './_components/dashboard-page-content';

const Page = async () => {
    const auth = await currentUser();
    if (!auth) {
        redirect("/sign-in")
    }

    const user = await db.user.findUnique({
        where: { externalId: auth.id },
    })

    if (!user) {
        return redirect("/welcome")
    }

    return (
        <DashboardPage cta={<p></p>} title='Dashboard'>
            <DashboardPageContent />
        </DashboardPage>
    )
}

export default Page