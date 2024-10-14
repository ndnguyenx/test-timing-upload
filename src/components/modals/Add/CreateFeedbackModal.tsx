"use client";
import React, { useState, useEffect } from "react";
import { Modal, Button, Input, message } from "antd";
import { ICategory, ISubCategory, ITimer } from "@/interfaces/models";
import { getCategories } from "@/apis/category/category.apis";
import { getAllSubCategories } from "@/apis/subCategory/subCategory.apis";
import { createFeedback } from "@/apis/feedback/feedback.apis";
import "./CreateFeedback.scss";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style'; 
import Underline from '@tiptap/extension-underline';
import {TimerDateHours} from '@/components/timer/Timer';
import { ETypeTimer } from "@/enums/common.enum";

export default function CreateFeedbackModal({
    isVisible,
    onClose,
    onUploadComplete,
}) {
    const [imgName, setImgName] = useState("");
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [timerType, setTimerType] = useState<string>("");
    const [timerValue, setTimerValue] = useState<string>("");

    
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle, 
            Underline, 
        ],
        content: `<p></p>`, 
    });

    useEffect(() => {
        if (!isVisible) {
            resetFields();
        }
    }, [isVisible]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleSubmit = async () => {
        // Kiểm tra editor và hẹn giờ trước khi lấy HTML
        if (!imgName || !editor || !editor.getHTML() || !file) {
            message.error("Vui lòng điền đầy đủ thông tin và chọn hình ảnh.");
            return;
        }

        const timer = {
            date: timerType,
            time: timerValue,
        }

        const formData = new FormData();
        formData.append("title", imgName);
        formData.append("content", editor.getHTML());
        formData.append("thumb", file);
        formData.append("timer", JSON.stringify(timer as any));  
        
        try {
            const result = await createFeedback(formData);
            if (result?.statusCode !== 200) {
                if (result?.statusCode === 413)
                    return message.error("Tệp có kích thước quá lớn (bé hơn 10mb)");
                message.error(result?.message);
                return;
            }
            message.success(result?.message);
            onUploadComplete(result.data);
            resetFields();
            onClose();
        } catch (error) {
            message.error("Có lỗi xảy ra khi thêm hình ảnh.");
        }
    };

    const resetFields = () => {
        setImgName("");
        editor?.commands.setContent("<p></p>"); 
        setFile(null);
        setPreviewImage(null);
        setTimerType(""); 
        setTimerValue(""); 

        const fileInput = document.querySelector('.file-input') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = "";
        }
    };

    return (
        <Modal
            visible={isVisible}
            onCancel={onClose}
            footer={null}
        >
            <div className="modal-header">Tạo bài viết</div>
            <div className="modal-container">
                <Input
                    placeholder="Tiêu đề"
                    value={imgName}
                    onChange={(e) => setImgName(e.target.value)}
                />

                {/* Toolbar buttons */}
                {editor && (
                    <div className="toolbar flex flex-wrap gap-4">
                        <Button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()}>Bold</Button>
                        <Button onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()}>Italic</Button>
                        <Button onClick={() => editor.chain().focus().toggleUnderline().run()} disabled={!editor.can().chain().focus().toggleUnderline().run()}>Underline</Button>
                        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</Button>
                        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</Button>
                        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</Button>
                        <Button onClick={() => editor.chain().focus().toggleBulletList().run()}>Bullet List</Button>
                        <Button onClick={() => editor.chain().focus().toggleOrderedList().run()}>Ordered List</Button>
                    </div>
                )}

                {/* Editor Content */}
                {editor && (
                    <EditorContent
                        editor={editor}
                        className="custom-editor-content"
                        placeholder="Nhập nội dung"
                    />
                )}

                {/* Hẹn giờ */}
                <div className="timer-section">
                    <p>Hẹn giờ</p> {/* Thêm chữ "Hẹn giờ" */}
                    <TimerDateHours getDate={setTimerType} getTime={setTimerValue} />
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input"
                />
                {previewImage && (
                    <div className="preview-container">
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="image-preview"
                        />
                    </div>
                )}
            </div>
            <div className="footer-container">
                <Button type="primary" onClick={handleSubmit}>
                    Đăng
                </Button>
            </div>
        </Modal>
    );
}
