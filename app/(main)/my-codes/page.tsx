import AllCodes from '@/components/AllCodes';
import { getMyCodesApi } from '@/lib/code';
import React from 'react'

const page = async() => {
  const getMyCodes = await getMyCodesApi();
  return (
    <>
      <AllCodes getMyCodes = {getMyCodes}/>
    </>
  )
}

export default page