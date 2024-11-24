
import { db } from '@/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { DashboardPage } from '@/components/dashboard-page';
import { getPaymentSessionURL } from "@/lib/paystack";

import { DashboardPageContent } from './_components/dashboard-page-content';
import { CreateEventCategoryModal } from '@/components/create-event-category-modal';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PaymentSuccessModal } from '@/components/payment-success-modal';

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const Page = async ({ searchParams }: PageProps) => {
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

    const intent = searchParams.intent

    if (intent === "upgrade" && user.plan === "FREE") {
        const session = await getPaymentSessionURL(auth)

        if (session.url) redirect(session.url)
    }

    const success = searchParams.success



    return (
        <>
            {success ? <PaymentSuccessModal /> : null}
            <DashboardPage cta={<CreateEventCategoryModal>
                <Button className=''>
                    <Plus className='size-4 mr-2' /> Add Category
                </Button>
            </CreateEventCategoryModal>} title='Dashboard'>
                <DashboardPageContent />
            </DashboardPage>
        </>
    )
}

export default Page