'use client'
import { createCode } from '@/action/code';
import useCompilerStore from '@/hooks/use-code';
import { handleError } from '@/utils/handleError';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { Button } from './ui/button';
import CodeItem from './CodeItem';

const AllCodes = ({getMyCodes}:any) => {
    const [isLoading, setIsLoading] = useState(false)
    const {updateCodeTitle,updateFullCode} = useCompilerStore();

    const router = useRouter();
    const handleCreateNewCode = async()=>{
        setIsLoading(true);
        try {
            const result = await createCode();
            // @ts-ignore
            router.push(`/compiler/${result?.id }`);
            // @ts-ignore
            updateFullCode(result?.fullCode);
            // @ts-ignore
            updateCodeTitle(result?.title)
            toast.success("create new code!");
        } catch (error) {
            handleError(error);
            console.log(error)
        }finally {
            setIsLoading(false);
        }
    }
  return (
    <>
        {getMyCodes?.length !== 0 ? (
        <div className="p-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
          {getMyCodes?.map((item:any) => {
            return <CodeItem deleteBtn={true} key={item._id} data={item} />;
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[calc(100vh-60px)]">
          <p className="text-center font-mono text-black  p-3">
            You don&apos;t have any saved codes.{" "}
            <Button
              disabled={isLoading}
              onClick={handleCreateNewCode}
              variant={"outline"}
              className='text-black'
            >
              Create One
            </Button>
          </p>
        </div>
      )}
    </>
  )
}

export default AllCodes