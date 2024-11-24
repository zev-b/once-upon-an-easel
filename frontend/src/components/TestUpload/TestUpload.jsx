// frontend/src/components/TestUpload.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadArtImage } from '../../store/art';

export default function TestUpload() {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      await dispatch(uploadArtImage(formData));
      alert('Upload successful!');
      setFile(null);
      setTitle('');
      setDescription('');
    } catch {
      setError('Upload failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="file">Image</label>
        <input
          id="file"
          type="file"
          onChange={handleFileChange}
          required
        />
      </div>
      <button type="submit">Upload</button>
      {error && <p>{error}</p>}
    </form>
  );
}



// * ==========================================================
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { uploadArtImage } from '../store/upload';

// export default function TestUpload() {
//     const dispatch = useDispatch();
//     const [imgFile, setImgFile] = useState(null);
//     const [previewUrl, setPreviewUrl] = useState(null);

//     const updateImage = (e) => {
//         const file = e.target.files[0];
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => setPreviewUrl(reader.result);
//         setImgFile(file);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (imgFile) {
//             const form = { image: imgFile }; // 'image' key for backend
//             try {
//                 const uploadedImageUrl = await dispatch(uploadArtImage(form));
//                 console.log('Image successfully uploaded:', uploadedImageUrl);
//             } catch (error) {
//                 console.error('Failed to upload image:', error);
//             }
//         }
//     };

//     return (
//         <div>
//             <h1>Image Upload Test</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="file-upload">Select an image:</label>
//                     <input
//                         type="file"
//                         id="file-upload"
//                         accept=".jpg,.jpeg,.png,.gif"
//                         onChange={updateImage}
//                     />
//                 </div>
//                 {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: '300px' }} />}
//                 <button type="submit">Upload</button>
//             </form>
//         </div>
//     );
// }


