import HelperHeader from "@/components/HelperHeader";
import RenderCode from "@/components/RenderCode";
import TryCodeEditor from "@/components/TryCodeEditor";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
export default function TryCompiler() {
    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50} className="h-[calc(100vh-60px)] min-w-[350px]">
                <HelperHeader />
                <TryCodeEditor />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="h-[calc(100vh-60px)] min-w-[350px]" defaultSize={50}><RenderCode /></ResizablePanel>
        </ResizablePanelGroup>
    );
}
