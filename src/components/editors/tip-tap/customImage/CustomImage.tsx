import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import { useEffect, useState } from "react";
import { Input, Modal, Select } from "antd";
import toast from "react-hot-toast";
import "./style.scss";
import { MdEdit } from "react-icons/md";

// Define the custom image extension
const CustomImage = Node.create({
    name: "customImage",

    group: "inline",

    inline: true,

    draggable: true,

    addAttributes() {
        return {
            src: {
                default: null,
            },
            alt: {
                default: null,
            },
            width: {
                default: "auto",
            },
            height: {
                default: "auto",
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "img[src]",
                getAttrs: (dom) => ({
                    src: dom.getAttribute("src"),
                    alt: dom.getAttribute("alt"),
                    width: dom.getAttribute("width") || "auto",
                    height: dom.getAttribute("height") || "auto",
                }),
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ["img", mergeAttributes(HTMLAttributes)];
    },

    addNodeView() {
        return ReactNodeViewRenderer(ImageNode);
    },

    // Add the custom command
    addCommands(): any {
        return {
            setImageAttributes:
                (attributes: any) =>
                ({ commands }: any) => {
                    return commands.updateAttributes("customImage", attributes);
                },
        };
    },
});

function ImageNode(props: any) {
    const { src, alt, width, height } = props.node.attrs;
    const { updateAttributes, selected } = props;
    let className = "custome-image";

    useEffect(() => {
        setValueAlt(alt || "");
        setValueSize(width || "100%");
        setWidthImage(width);
        setHeightImage(height);
    }, [alt, width, height]);

    const [valueAlt, setValueAlt] = useState<string>(alt || "");
    const [valueSize, setValueSize] = useState<string>(width || "100%");
    const [widthImage, setWidthImage] = useState<string>(width);
    const [heightImage, setHeightImage] = useState<string>(height);
    const [openModalEditImage, setOpenModalEditImage] =
        useState<boolean>(false);

    if (selected) {
        className += " ProseMirror-selectednode";
    }

    const handleOpenModalEditImage = () => {
        setValueAlt(alt);
        setValueSize(width || "100%");
        setOpenModalEditImage(true);
    };

    const handleOk = () => {
        if (!valueAlt) {
            toast.error("Alt không được để trống !");
            return;
        }

        updateAttributes({
            alt: valueAlt,
            width: valueSize,
            height: valueSize,
        });

        //
        setWidthImage(valueSize);
        setHeightImage(valueSize);

        toast.success("Cập nhật thành công");
        setOpenModalEditImage(false);
    };

    return (
        <NodeViewWrapper className={className} data-drag-handle>
            <img
                src={src}
                alt={alt}
                style={{ width: widthImage, height: heightImage }}
            />
            <span
                className="edit-text-indicator"
                onClick={handleOpenModalEditImage}
            >
                <MdEdit size={24} />
            </span>

            <Modal
                title="Chỉnh sửa ảnh"
                open={openModalEditImage}
                onOk={handleOk}
                onCancel={() => setOpenModalEditImage(false)}
                className="modal-edit-image"
                okText="Cập nhật"
                cancelText="Hủy bỏ"
            >
                <div className="form-group">
                    <label htmlFor="edit-alt">Chỉnh sửa alt</label>
                    <Input
                        value={valueAlt}
                        onChange={(e) => setValueAlt(e.target.value)}
                        id="edit-alt"
                        placeholder="Nhập alt của ảnh..."
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-width">Chỉnh sửa chiều rộng</label>
                    <Select
                        id="edit-width"
                        defaultValue={valueSize}
                        style={{ width: "100%" }}
                        onChange={(val) => setValueSize(val)}
                        value={valueSize}
                        options={[
                            { value: "150px", label: "Nhỏ - 150 x 150px" },
                            {
                                value: "300px",
                                label: "Trung bình - 300 x 300px",
                            },
                            { value: "1020px", label: "Lớn - 1020 x 1020px" },
                            { value: "100%", label: "Kích thước đầy đủ" },
                        ]}
                    />
                </div>
            </Modal>
        </NodeViewWrapper>
    );
}

export default CustomImage;
