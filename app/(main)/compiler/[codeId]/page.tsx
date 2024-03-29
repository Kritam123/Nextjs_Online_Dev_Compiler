import React from 'react'
import HelperHeader from "@/components/HelperHeader";
import RenderCode from "@/components/RenderCode";
import CodeEditor from "@/components/CodeEditor";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { getCode } from '@/lib/code';
import { getCurrentUser } from '@/lib/getCurrentUser';
import { redirect } from 'next/navigation';
const page = async({params}:{params:{codeId:string}}) => {
  if(params.codeId.length < 24 ){
   return redirect("/404");
  }
  const code =  await getCode(params.codeId);
  const user = await getCurrentUser();
  if(!code) {
  return  redirect("/");
  } 
  return (
    <ResizablePanelGroup direction="horizontal">
    <ResizablePanel defaultSize={50} className="h-[calc(100vh-60px)] min-w-[350px]">
        <HelperHeader  user={user}/>
        <CodeEditor codeData={code} />
    </ResizablePanel>
    <ResizableHandle withHandle />
    <ResizablePanel className="h-[calc(100vh-60px)] sm:block max-[640px]:hidden min-w-[350px]" defaultSize={50}><RenderCode /></ResizablePanel>
</ResizablePanelGroup>
  )
}

export default page