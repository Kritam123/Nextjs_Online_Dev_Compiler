"use client"

import useCompilerStore from "@/hooks/use-code";

const RenderCode = () => {

 const {fullCode} =  useCompilerStore();

  const combinedCode = `<html><style>${fullCode.css}</style><body>${fullCode.html}</body><script>${fullCode.javascript}</script></html>`;

  const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(
    combinedCode
  )}`;

  return (
    <div className="bg-white h-[calc(100dvh-60px)]">
      <iframe className="w-full h-full" src={iframeCode} />
    </div>
  );
}

export default RenderCode