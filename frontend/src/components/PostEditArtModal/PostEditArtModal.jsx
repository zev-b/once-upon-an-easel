// frontend/src/components/PostEditArtModal/PostEditArtModal.jsx

import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";

export default function PostEditArtModal() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [buttonDisabled, setButtonDisabled] = useState(true);
    
    //# image url to send to aws
    const [imgUrl, setImgUrl] = useState("");
    //# telling us if we should show the image
    const [showUpload, setShowUpload] = useState(true);
    //# img url we will load in react
    const [previewUrl, setPreviewUrl] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          setPreviewUrl(reader.result);
        }
        setImgUrl(file);
        setShowUpload(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const img_url = imgUrl;
        const form = {img_url};
        const postOrEdit = await dispatch(postEditArtThunk(user.id, form))
          .then(closeModal)
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              setErrors(data.errors);
            }
        });
    };

    return (
        <div>
        <h1>Post/Edit art Modal</h1>
        <form onSubmit={handleSubmit}>
          <div>
            {showUpload && (
              <label htmlFor='file-upload'> Select From Computer
                <input
                  type='file'
                  id='file-upload'
                  name="img_url"
                  onChange={uploadImage}
                  accept='.jpg, .jpeg, .png, .gif'
                  />
                </label>
            )}
            {!showUpload && (
              <div>
                <img
                  src={previewUrl}
                  alt="preview"
                />
                <button>Submit</button>
              </div>
            )}
            <input 
                type="text"
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                required 
            />
            <input 
                type="text"
                value={description}
                placeholder="Description(optional)"
                onChange={(e) => setDescription(e.target.value)}
                required 
            />
          </div>
        </form>
    </div>
    )

}