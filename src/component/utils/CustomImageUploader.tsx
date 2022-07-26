import { Button, message, Upload } from 'antd';
import type { UploadProps } from 'antd/es/upload/interface';
import React, { SetStateAction, useState } from 'react';

import '../styles/Button.css';
import '../styles/Image.css';

import { uploadToCloud } from '../../services/uploadImage';
import image from '../../assets/github.png';

type PropType = {
  photoUrl: string;
  setPhotoUrl: React.Dispatch<SetStateAction<string>>;
};

const CustomImageUploader = ({ photoUrl, setPhotoUrl }: PropType) => {
  const [loading, setloading] = useState(false);
  const props: UploadProps = {
    beforeUpload: async (file) => {
      setloading(true);
      const formData = new FormData();
      formData.append('keyForFileObject', file);
      try {
        const response = await uploadToCloud(formData);
        // dispatch(changePhotoUrl(response.url));
        setPhotoUrl(response.url);
        message.success('upload successfully.');
      } catch (e) {
        message.error('uploading error');
      }
      setloading(false);
      return false;
    },
    maxCount: 1,
    showUploadList: false,
  };
  return (
    <>
      <div className="center">
        {Boolean(photoUrl) ? (
          <img className="img-avatar" src={photoUrl} alt="Loading" />
        ) : (
          <img className="img-avatar" src={image} alt="loading" />
        )}
      </div>
      <Upload {...props}>
        {loading ? (
          <Button className="btn btn-photo" type="primary" loading={loading}>
            Uploading...
          </Button>
        ) : (
          <Button type="primary" className="btn btn-photo">
            Change Photo
          </Button>
        )}
      </Upload>
    </>
  );
};

export default CustomImageUploader;
