import { VALIDIPADDRESSES, verifySignature } from "@/lib/paystack";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Resend } from 'resend';
import OrderReceivedEmail from "@/components/emails/OrderReceivedEmail";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {

    const isValidIPAddress = VALIDIPADDRESSES.includes(headers().get('x-forwarded-for') as string);
    if (!isValidIPAddress) {
        return new NextResponse(`Fraudulent Request Detected`, { status: 400 })
    }

    const signature = headers().get("x-paystack-signature") as string;
    if (!signature) {
        return new NextResponse(`No signature provided`, { status: 400 })
    }

    const response = await req.json()

    if (!verifySignature(response, signature)) {
        return new NextResponse(`Invalid Signature`, { status: 400 })
    }

    try {
        if (response?.event === 'charge.success' && response?.data.status === 'success') {
            const { userId, userEmail, userName } = response?.data?.metadata || { userId: null, userEmail: null }

            // check that the metadata contains the necessary field to process this hook. 
            if (!userId || !userEmail || !userName) {
                console.log("Could not find metadata payload")
                return new NextResponse(`Webhook Error: Invalid request metadata: ${response?.metadata}`, { status: 400 });
            }

            await resend.emails.send({
                from: 'Phonecase Designer <oluwaseun.ladeinde@yahoo.com>',
                to: [userEmail],
                subject: 'Thanks for your order!',
                react: OrderReceivedEmail({
                    userName,
                    orderDate: new Date().toLocaleDateString(),
                }),
            })
        } else if (response?.event === 'charge.failed') { // TODO: Handle failed charge

        } else if (response?.event === 'refund.created') { //TODO: Handle refund

        } else { // TODO: Handle other events

        }
    } catch (error: any) {
        console.log("[PAYSTACK_WEBHOOK]", error);
        //return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
        return NextResponse.json(
            { message: `Webhook Error: ${error.message}`, ok: false },
            { status: 500 }
        )
    }

    return NextResponse.json(
        { result: response, ok: true },
        { status: 200 }
    )
}