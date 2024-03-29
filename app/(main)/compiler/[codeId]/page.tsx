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
const page = async({params}:{params:{codeId:string}}) => {
  const code =  await getCode(params.codeId);
  const user = await getCurrentUser();
  return (
    <ResizablePanelGroup direction="horizontal">
    <ResizablePanel defaultSize={50} className="h-[calc(100vh-60px)] min-w-[350px]">
        <HelperHeader  user={user}/>
        <CodeEditor codeData={code} />
    </ResizablePanel>
    <ResizableHandle withHandle />
    <ResizablePanel className="h-[calc(100vh-60px)] min-w-[350px]" defaultSize={50}><RenderCode /></ResizablePanel>
</ResizablePanelGroup>
  )
}

export default page