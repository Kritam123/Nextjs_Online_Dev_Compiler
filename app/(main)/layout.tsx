import Header from '@/components/Header'
import Loader from '@/components/Loader/Loader';
import { getCurrentUser } from '@/lib/getCurrentUser'
import React, { Suspense } from 'react'
const MainLayout = async({ children }: { children: React.ReactNode }) => {
    const user = await getCurrentUser();
    return (
            <div>
                <Header user = {user} />
                <Suspense fallback={<Loader/>}>
                {children}
                </Suspense>
            </div>
    )
}

export default MainLayout