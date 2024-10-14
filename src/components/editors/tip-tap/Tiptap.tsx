"use client";
import "./style.scss";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useRef, useState } from "react";
import { MenuBar } from "./menu-bar/MenuBar";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Image from "@tiptap/extension-image";
import { ResizableImage } from "tiptap-extension-resizable-image";
import "tiptap-extension-resizable-image/styles.css";

import Link from "@tiptap/extension-link";
import Blockquote from "@tiptap/extension-blockquote";
import TextAlign from "@tiptap/extension-text-align";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import CodeBlock from "@tiptap/extension-code-block";
import TextStyle from "@tiptap/extension-text-style";
import History from "@tiptap/extension-history";
import { Color } from "@tiptap/extension-color";
import CustomImage from "./customImage/CustomImage";
interface IProps {
    initializeContent?: string;
    setContent?: (value: string) => void;
}

export const Tiptap = ({ initializeContent, setContent }: IProps) => {
    const refEditor = useRef<any>(null);
    const editor = useEditor({
        content: initializeContent || "",
        extensions: [
            StarterKit.configure({
                history: false,
            }),
            Color.configure({
                types: ["textStyle"],
            }),
            Text,
            History,
            TextStyle,
            Highlight,
            Paragraph,
            CodeBlock,
            CustomImage,
            Image,
            // ResizableImage.configure({}),
            Link.configure({
                HTMLAttributes: {
                    rel: "noopener noreferrer",
                    target: "_blank",
                },
            }),
            Typography,
            TaskList,
            TaskItem,
            Document,
            Dropcursor,
            Blockquote,
            TextAlign.configure({
                types: ["heading", "paragraph", "img", "div"],
            }),
        ],

        onUpdate({ editor }: { editor: any }) {
            if (setContent) setContent(editor.getHTML());
        },
    });

    const [counter, setCounter] = useState(0);
    useEffect(() => {
        if (editor && initializeContent && counter < 2) {
            editor.commands.setContent(initializeContent);
            setCounter(counter + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initializeContent]);

    if (!editor) {
        return null;
    }
    return (
        <div className="editor">
            {editor && <MenuBar editor={editor} />}
            <EditorContent
                ref={refEditor}
                className="editor__content"
                editor={editor}
            />
        </div>
    );
};
