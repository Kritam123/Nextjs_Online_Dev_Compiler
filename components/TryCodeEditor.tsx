"use client"
import { useCallback } from "react";
import { tags as t } from "@lezer/highlight";
import {
    solarizedLightInit,
    solarizedDarkInit,
} from "@uiw/codemirror-theme-solarized";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import CodeMirror from "@uiw/react-codemirror";
import { useDispatch, useSelector } from "react-redux";

const TryCodeEditor = () => {
   
    const theme = "dark";
    const onChange = useCallback(
        (val: string) => {
          
        },
        []
    );
    return (
        <CodeMirror
            value={""}
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
            extensions={[loadLanguage("javascript")!]}
            onChange={onChange}
        />
    );
};

export default TryCodeEditor;
