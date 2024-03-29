import React from 'react'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex items-center justify-center min-h-[100vh]'>{children}</div>
  )
}

export default AuthLayout