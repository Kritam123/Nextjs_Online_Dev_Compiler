"use client";
import {
  Code,
  Copy,
  Download,
  LucideLoader,
  SaveIcon,
  Share2,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleError } from "@/utils/handleError";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import useCompilerStore from "@/hooks/use-code";
import { useParams } from "next/navigation";
import { saveCode } from "@/action/code";
import Link from "next/link";
const HelperHeader = ({ user }: any) => {
  const { codeId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { currentLanguage, updateCurrentLanguage, title, isOwner, fullCode } =
    useCompilerStore();
  const [postTitle, setPostTitle] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopyUrl = async () => {
    const text = inputRef.current && inputRef.current.value;
    try {
      await navigator.clipboard.writeText(text as string);
      toast.success("Copy Text To ClipBoard!");
    } catch (error) {
      console.error("unable to copy", error);
    }
  };
  const handleChange = (value: "html" | "css" | "javascript") => {
    updateCurrentLanguage(value);
  };
  useEffect(() => {
    setPostTitle(title);
  }, [title]);

  const handleDownloadCode = () => {
    if (
      fullCode.html === "" &&
      fullCode.css === "" &&
      fullCode.javascript === ""
    ) {
      toast("Error: Code is Empty");
    } else {
      const htmlCode = new Blob([fullCode.html], { type: "text/html" });
      const cssCode = new Blob([fullCode.css], { type: "text/css" });
      const javascriptCode = new Blob([fullCode.javascript], {
        type: "text/javascript",
      });

      const htmlLink = document.createElement("a");
      const cssLink = document.createElement("a");
      const javascriptLink = document.createElement("a");

      htmlLink.href = URL.createObjectURL(htmlCode);
      htmlLink.download = "index.html";
      document.body.appendChild(htmlLink);

      cssLink.href = URL.createObjectURL(cssCode);
      cssLink.download = "style.css";
      document.body.appendChild(cssLink);

      javascriptLink.href = URL.createObjectURL(javascriptCode);
      javascriptLink.download = "script.js";
      document.body.appendChild(javascriptLink);

      if (fullCode.html !== "") {
        htmlLink.click();
      }
      if (fullCode.css !== "") {
        cssLink.click();
      }
      if (fullCode.javascript !== "") {
        javascriptLink.click();
      }

      document.body.removeChild(htmlLink);
      document.body.removeChild(cssLink);
      document.body.removeChild(javascriptLink);

      toast("Code Downloaded Successfully!");
    }
  };
  const handleSaveCode = async () => {
    setIsLoading(true);
    try {
      await saveCode(fullCode as any, codeId as any, postTitle as string);
      toast.success("code saved!");
    } catch (error) {
      handleError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="__helper_header h-[50px] dark:bg-black flex items-center justify-between text-white p-2">
      <div className="__btn_container flex gap-2">
        {user && isOwner && (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"success"}>
                  <SaveIcon className="w-5 mr-2" /> <span className="min-[820px]:block max-[820px]:hidden">Save</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex gap-1  justify-center items-center">
                    <Code />
                    Save your Code!
                  </DialogTitle>
                  <div className="__url flex justify-center items-center gap-1">
                    <Input
                      className="bg-slate-700 text-white focus-visible:ring-0"
                      placeholder="Type your Post title"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                    />
                    <Button
                      variant="success"
                      className="h-full text-white"
                      onClick={handleSaveCode}
                    >
                      {isLoading ? (
                        <>
                          <LucideLoader className="animate-spin" /> Saving...{" "}
                        </>
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>
                {" "}
                <Button variant={"secondary"}>
                  <Share2 className="w-5 mr-2" /> <div className="min-[820px]:block max-[820px]:hidden">Share</div>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle> Share Code Publically </DialogTitle>
                  <DialogDescription>
                    Are you sure you what to share this code ?
                  </DialogDescription>
                  <div className="w-full items-center flex">
                    <input
                      ref={inputRef}
                      type="url"
                      className=" w-full bg-gray-500 px-2 py-1 border-none outline-none"
                      value={`${origin}/compiler/${codeId}`}
                    />
                    <Button variant={"secondary"} >
                      <Copy
                        onClick={handleCopyUrl}
                        cursor={"pointer"}
                        size={18}
                      />
                    </Button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Button onClick={handleDownloadCode} size="icon" variant="success">
              <Download size={16} />
            </Button>
            
          </>
        )}
      </div>
     
      <div className="__tab 
      _switcher dark:text-white text-black flex gap-2 items-center">
        <Link href={!user ?  `/compiler/render-page`:`/compiler/${codeId}/render-page`}>
         <Button variant={"outline"} className="sm:hidden block">
          Code
      </Button>
        </Link>
        <span className="min-[820px]:block max-[820px]:hidden">Language:</span>
        <Select
          defaultValue={currentLanguage}
          onValueChange={(value) =>
            handleChange(value as "html" | "css" | "javascript")
          }
        >
          <SelectTrigger className="w-[120px] dark:text-white  dark:bg-gray-800 focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HelperHeader;
