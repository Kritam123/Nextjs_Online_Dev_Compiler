import Header from '@/components/Header'
import { getCurrentUser } from '@/lib/getCurrentUser'
import React from 'react'
const MainLayout = async({ children }: { children: React.ReactNode }) => {
    const user = await getCurrentUser();
    return (
            <div>
                <Header user = {user} />
                {children}
            </div>
    )
}

export default MainLayout