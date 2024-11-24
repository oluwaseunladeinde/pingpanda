import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { currentUser } from "@clerk/nextjs/server";
import { getPaymentSessionURL } from "@/lib/paystack";

export const paymentRouter = router({
    getUserPlan: privateProcedure.query(async ({ c, ctx }) => {
        const { user } = ctx
        return c.json({ plan: user.plan })
    }),

    createPaystackCheckoutSession: privateProcedure.mutation(async ({ c, ctx }) => {
        const user = await currentUser();

        if (!user) {
            return c.json({ message: "Unauthenticated", url: "" }, { status: 401 });
        }

        const paymentSessionURL = await getPaymentSessionURL(user)
        return c.json({ url: paymentSessionURL })
    }),
})