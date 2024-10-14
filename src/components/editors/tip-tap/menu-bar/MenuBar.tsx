import "./style.scss";
import React, { Fragment, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Editor } from "@tiptap/react";
import {
    LuHeading1,
    LuHeading2,
    LuHeading3,
    LuHeading4,
    LuHeading5,
    LuHeading6,
} from "react-icons/lu";
import { LiaListOlSolid } from "react-icons/lia";
import { FiItalic } from "react-icons/fi";
import { FaCode } from "react-icons/fa";
import { GoBold } from "react-icons/go";
import { RiParagraph, RiSeparator } from "react-icons/ri";
import { IoIosList } from "react-icons/io";
import {
    MdOutlineFormatAlignCenter,
    MdOutlineFormatAlignLeft,
    MdOutlineFormatAlignRight,
    MdOutlineFormatAlignJustify,
} from "react-icons/md";
import { MenuItem } from "../menu-item/MenuItem";
import { GrBlockQuote, GrStrikeThrough } from "react-icons/gr";
import { CgUndo, CgRedo } from "react-icons/cg";
import { BsCardImage } from "react-icons/bs";
import { FaLink, FaLinkSlash } from "react-icons/fa6";
import styled from "styled-components";
import { findAllPhotos } from "@/apis/photos.apis";
import { ModalListPhotos } from "@/components/modals/modal-list-photos/ListPhotos";
import { IPhoto } from "@/interfaces/IModels.interface";

const ModalUrlStyled = styled.div<{ $isDisplay: boolean }>`
    position: absolute;
    display: flex;
    opacity: ${(props) => (props.$isDisplay ? 1 : 0)};
    z-index: 9999999;
    background-color: white;
    right: 1rem;
    top: 3rem;
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    gap: 1rem;
    pointer-events: ${(props) => (!props.$isDisplay ? "none" : "all")};
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    width: max-content;

    &:hover {
        color: black;
    }

    input {
        z-index: 9999;
        padding: 2px 5px;
        border: 1px solid var(--color-grey);
        border-radius: 5px;
    }

    div {
        flex-shrink: 0;
        width: fit-content;
    }
    @media screen and (max-width: 1702px) {
        left: 0;
    }

    @media screen and (max-width: 1300px) {
        left: auto;
    }
    @media screen and (max-width: 1297px) {
        left: 0;
    }
`;

const IconLink = styled.div`
    position: relative;
    div {
        color: black;

        :nth-child(2) {
            border: 1px solid var(--color-grey);
            padding: 5px;
            border-radius: 5px;
        }
        :nth-child(3) {
            border: 1px solid var(--color-grey);
            padding: 5px;
            border-radius: 5px;
        }
    }
`;

interface IItem {
    icon?: React.ReactNode;
    title?: string;
    action?: any;
    isActive?: () => boolean;
    type?: string;
}

interface IProps {
    editor: Editor;
}

export const MenuBar = ({ editor }: IProps) => {
    const refIconUrlLink = useRef<HTMLDivElement>(null);
    const refModalLink = useRef<HTMLDivElement>(null);
    const [photos, setPhotos] = useState<IPhoto[]>([]);
    const [isOpenModalPhotos, setIsOpenModalPhotos] = useState<boolean>(false);
    const [isAddLink, setIsAddLink] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");

    const handlerAddImage = async () => {
        const result = await findAllPhotos({ limit: "100", page: "1" } as any);
        setPhotos(result?.metadata?.items.map((p) => p) || []);
        setIsOpenModalPhotos(true);
    };

    const handlerAddLink = () => {
        editor.chain().focus().setColor("red").run();
        setIsAddLink(!isAddLink);
        if (isAddLink) {
            editor.commands.unsetColor();
        }
    };

    const addLink = (url: string) => {
        if (url) {
            editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();

            setIsAddLink(false);

            editor.commands.unsetColor();
        }
    };

    const unAddLink = () => {
        setIsAddLink(false);
        editor.commands.unsetColor();
    };

    const onClickChoseImage = (photo: IPhoto) => {
        if (photo) {
            editor.commands.setImage({
                src: photo.photo_url,
                alt: photo.photo_alt,
                title: photo.photo_alt,
            });
        }
    };

    const items: IItem[] = [
        {
            icon: <GoBold />,
            title: "Tô đậm",
            action: () => editor.chain().focus().toggleBold().run(),
            isActive: () => editor.isActive("bold"),
        },
        {
            icon: <FiItalic />,
            title: "Chữ nghiên",
            action: () => editor.chain().focus().toggleItalic().run(),
            isActive: () => editor.isActive("italic"),
        },
        {
            icon: <GrStrikeThrough />,
            title: "Gạch xóa",
            action: () => editor.chain().focus().toggleStrike().run(),
            isActive: () => editor.isActive("strike"),
        },
        {
            icon: <FaCode />,
            title: "Code",
            action: () => editor.chain().focus().toggleCode().run(),
            isActive: () => editor.isActive("code"),
        },
        {
            type: "divider",
        },
        {
            icon: <LuHeading1 />,
            title: "Tiêu đề 1",
            action: () =>
                editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: () => editor.isActive("heading", { level: 1 }),
        },
        {
            icon: <LuHeading2 />,
            title: "Tiêu đề 2",
            action: () =>
                editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: () => editor.isActive("heading", { level: 2 }),
        },
        {
            icon: <LuHeading3 />,
            title: "Tiêu đề 3",
            action: () =>
                editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: () => editor.isActive("heading", { level: 3 }),
        },
        {
            icon: <LuHeading4 />,
            title: "Tiêu đề 4",
            action: () =>
                editor.chain().focus().toggleHeading({ level: 4 }).run(),
            isActive: () => editor.isActive("heading", { level: 4 }),
        },
        {
            icon: <LuHeading5 />,
            title: "Tiêu đề 5",
            action: () =>
                editor.chain().focus().toggleHeading({ level: 5 }).run(),
            isActive: () => editor.isActive("heading", { level: 5 }),
        },
        {
            icon: <LuHeading6 />,
            title: "Tiêu đề 6",
            action: () =>
                editor.chain().focus().toggleHeading({ level: 6 }).run(),
            isActive: () => editor.isActive("heading", { level: 6 }),
        },
        {
            icon: <RiParagraph />,
            title: "Đoạn văn",
            action: () => editor.chain().focus().setParagraph().run(),
            isActive: () => editor.isActive("paragraph"),
        },
        {
            type: "divider",
        },
        {
            icon: <MdOutlineFormatAlignLeft />,
            title: "Căn trái",
            action: () => editor.chain().focus().setTextAlign("left").run(),
            isActive: () => editor.isActive({ textAlign: "left" }),
        },
        {
            icon: <MdOutlineFormatAlignCenter />,
            title: "Căn giữa",
            action: () => editor.chain().focus().setTextAlign("center").run(),
            isActive: () => editor.isActive({ textAlign: "center" }),
        },
        {
            icon: <MdOutlineFormatAlignRight />,
            title: "Căn phải",
            action: () => editor.chain().focus().setTextAlign("right").run(),
            isActive: () => editor.isActive({ textAlign: "right" }),
        },
        {
            icon: <MdOutlineFormatAlignJustify />,
            title: "Căn đều",
            action: () => editor.chain().focus().setTextAlign("justify").run(),
            isActive: () => editor.isActive({ textAlign: "justify" }),
        },
        {
            icon: <IoIosList />,
            title: "Danh sách không thứ tự",
            action: () => editor.chain().focus().toggleBulletList().run(),
            isActive: () => editor.isActive("bulletList"),
        },
        {
            icon: <LiaListOlSolid />,
            title: "Danh sách có thứ tự",
            action: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: () => editor.isActive("orderedList"),
        },
        {
            title: "Trích dẫn",
            type: "divider",
        },
        {
            icon: <GrBlockQuote />,
            title: "Trích dẫn",
            action: () => editor.chain().focus().toggleBlockquote().run(),
            isActive: () => editor.isActive("blockquote"),
        },
        {
            icon: <RiSeparator />,
            title: "Nằm ngang",
            action: () => editor.chain().focus().setHorizontalRule().run(),
        },
        {
            icon: <BsCardImage />,
            title: "Hình ảnh",
            action: () => handlerAddImage(),
        },
        {
            type: "divider",
        },
        {
            icon: <CgUndo />,
            title: "Hoàn tác",
            action: () => editor.chain().focus().undo().run(),
        },
        {
            icon: <CgRedo />,
            title: "Làm lại",
            action: () => editor.chain().focus().redo().run(),
        },
        {
            icon: (
                <IconLink ref={refIconUrlLink}>
                    <FaLink />
                    <ModalUrlStyled
                        ref={refModalLink}
                        $isDisplay={isAddLink}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <input
                            style={{ border: "1px solid black" }}
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        <div onClick={() => addLink(url)}>Thêm URL</div>
                        <div onClick={unAddLink}>Hủy</div>
                    </ModalUrlStyled>
                </IconLink>
            ),
            title: "Liên kết",
            action: () => {
                handlerAddLink();
            },
        },
        {
            icon: <FaLinkSlash />,
            title: "Hủy liên kết",
            action: () =>
                editor
                    .chain()
                    .focus()
                    .extendMarkRange("link")
                    .unsetLink()
                    .run(),
        },
    ];
    return (
        <div className="editor__header">
            {items.map((item, index) => (
                <Fragment key={index}>
                    {item.type === "divider" ? (
                        <div className="divider" />
                    ) : (
                        <MenuItem
                            action={item.action}
                            isActive={item.isActive}
                            icon={item.icon}
                            title={item.title}
                        />
                    )}
                </Fragment>
            ))}
            <input
                title="Chọn màu"
                className="input-color"
                type="color"
                onInput={(event: any) => {
                    editor.chain().focus().setColor(event.target.value).run();
                }}
                value={editor.getAttributes("textStyle").color}
                data-testid="setColor"
            />
            {createPortal(
                <ModalListPhotos
                    isOpenModal={isOpenModalPhotos}
                    onCloseModal={(b) => setIsOpenModalPhotos(b)}
                    onSelectedPhoto={(photo) => onClickChoseImage(photo)}
                    photos={photos}
                />,
                document.body
            )}
        </div>
    );
};
