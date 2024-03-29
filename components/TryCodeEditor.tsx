"use client"
import { useCallback } from "react";
import { tags as t } from "@lezer/highlight";
import {
    solarizedLightInit,
    solarizedDarkInit,
} from "@uiw/codemirror-theme-solarized";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import CodeMirror from "@uiw/react-codemirror";
import useCompilerStore from "@/hooks/use-code";

const TryCodeEditor = () => {
    const { fullCode: code,currentLanguage, updateCode } = useCompilerStore();
    const theme = "dark";
    const onChange = useCallback(
        (val: string) => {
            updateCode(val);
        },
        [updateCode]
    );
    return (
        <CodeMirror
            value={code[currentLanguage]}
            theme={
                theme === "dark"
                    ? solarizedDarkInit({
                        settings: {
                            caret: "red",
                            fontFamily: "Roboto",
                        },
                        styles: [{ tag: t.comment, color: "#6272a4" }],
                    })
                    : solarizedLightInit({
                        settings: {
                            caret: "red",
                            fontFamily: "monospace",
                        },
                        styles: [{ tag: t.comment, color: "#6272a4" }],
                    })
            }
            height="calc(100vh - 60px - 50px)"
            extensions={[loadLanguage(currentLanguage)!]}
            onChange={onChange}
        />
    );
};

export default TryCodeEditor;
