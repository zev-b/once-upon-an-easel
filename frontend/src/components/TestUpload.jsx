import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadArtImage } from '../store/upload';

export default function TestUpload() {
    const dispatch = useDispatch();
    const [imgFile, setImgFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const updateImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => setPreviewUrl(reader.result);
        setImgFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (imgFile) {
            const form = { image: imgFile }; // 'image' key for backend
            try {
                const uploadedImageUrl = await dispatch(uploadArtImage(form));
                console.log('Image successfully uploaded:', uploadedImageUrl);
            } catch (error) {
                console.error('Failed to upload image:', error);
            }
        }
    };

    return (
        <div>
            <h1>Image Upload Test</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="file-upload">Select an image:</label>
                    <input
                        type="file"
                        id="file-upload"
                        accept=".jpg,.jpeg,.png,.gif"
                        onChange={updateImage}
                    />
                </div>
                {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: '300px' }} />}
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}


