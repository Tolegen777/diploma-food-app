import React, { useState } from "react";
import "./index.css";
import { Upload, Modal } from "antd";
import {PlusOutlined} from '@ant-design/icons'

function getBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
}

type Props = {
    fileList: any[]
    setFileList: (image: any) => void
}
export const UploadImageComponent:React.FC<Props> = ({fileList, setFileList}) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };

    const handleChange = ({ fileList }: any) => setFileList(fileList);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className="ant-upload-text">Загрузить</div>
        </div>
    );

    return (
        <div className="clearfix">
            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                accept="image/png,image/svg+xml,image/jpeg,application/pdf"
            >
                {fileList.length > 0 ? null : uploadButton}
            </Upload>
            <Modal
                visible={previewVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
        </div>
    );
};
