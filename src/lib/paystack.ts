import axios from "axios";
import { User } from '@clerk/nextjs/server';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export const MONTHLY_PRO_PLAN = 7500;
export const PRO_PLAN_CODE = "PLN_z0v7o4kxb4qj4so";

export const ValidIPAddresses = ["52.31.139.75", "52.49.173.169", "52.214.14.220"];
export const INITIALIZETRANSACTIONURL = `https://api.paystack.co/transaction/initialize`;
export const VerifyTransactionUrl = `https://api.paystack.co/transaction/verify/:reference`;

const VAT = 7.5 / 100

export const generateRefenceNumber = (reftype?: string) => {
    if (reftype === "maths") {
        return Math.floor(Math.random() * 10000000000 + 1)
    } else if (reftype === "mathsdate") {
        return Math.floor(Math.random() * Date.now()).toString(16);
    } else {
        return uuidv4().toString();
    }
}


export const verifySignature = (eventData: any, signature: string | string[]): boolean => {
    try {
        const hmac = crypto.createHmac('sha512', process.env.PAYSTACK_TEST_SECRET_API_KEY!);
        const expectedSignature = hmac.update(JSON.stringify(eventData)).digest('hex');
        return expectedSignature === signature;

    } catch (e) {
        console.log("VERIFYING PAYSTACK SIGNATURE FAIL", e)
        return false;
    }
}

export const getPaymentSessionURL = async (user: User) => {

    try {
        const paymentPayload = {
            email: user?.emailAddresses[0]?.emailAddress,
            label: 'Upgrading to PRO',
            amount: Math.round(MONTHLY_PRO_PLAN * 100),
            channels: ['card', 'bank', 'bank_transfer'],
            reference: generateRefenceNumber(),
            //callback_url: settingsUrl,
            metadata: {
                userId: user.id,
                custom_fields: [
                    {
                        display_name: "Customer's Fullname",
                        variable_name: "customer_name",
                        value: user?.firstName + '' + user?.lastName,
                    },
                    {
                        display_name: "Application's Name",
                        variable_name: "application_name",
                        value: "PingPanda App",
                    }
                ]
            },
            plan: PRO_PLAN_CODE,
        }

        const response = await axios.post(`https://api.paystack.co/transaction/initialize`, paymentPayload, {
            headers: { Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_API_KEY}` }
        });
        const response_data = response.data.data;

        console.log({ response_data })
        return response_data?.authorization_url
    } catch (error) {
        console.log(error);
        return ""
    }

}

export const calculateVAT = (value: number) => {
    return value * VAT;
}