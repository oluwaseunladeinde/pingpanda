import React from 'react'
import { Navbar } from '@/components/navbar';

const LangingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default LangingLayout;