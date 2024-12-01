// frontend/src/components/PostEditArtModal/PostEditArtModal.jsx
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { createArtThunk } from "../../store/art";
import { updateArtThunk } from "../../store/art";
import './PostEditArtModal.css';

export default function PostEditArtModal({ art, isEditing = false }) {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [buttonDisabled, setButtonDisabled] = useState(true);
    
    //# image url to send to aws
    const [imageFile, setImageFile] = useState(""); // changed from imgUrl, imageId
    //# telling us if we should show the image
    const [showUpload, setShowUpload] = useState(true);
    //# img url we will load in react
    const [previewUrl, setPreviewUrl] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (art && isEditing) {
            setTitle(art.title);
            setDescription(art.description);
            setPreviewUrl(art.imageId);
            console.log(art.imageId)
            setShowUpload(false);
        }
    }, [art, isEditing]);

    useEffect(() => {
        if (isEditing) {
            setButtonDisabled(
                title.length > 50 ||
                description.length > 315 ||
                Object.keys(errors).some((key) => errors[key])
            )
        } else {
            setButtonDisabled(
                !imageFile ||
                title.length > 50 ||
                description.length > 315 ||
                Object.keys(errors).some((key) => errors[key])
            );
        }
        // console.log(`= Btn disabld? =`,Object.keys(errors).some((key) => errors[key]));
        // console.log(`= isEditing? =`, isEditing, art)
    }, [imageFile, title, description, errors, isEditing]);

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        // console.log("Selected file:=>", file);
        // console.log("Image ID: =>", imageFile);
        // console.log("Preview URL: =>", previewUrl);
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => setPreviewUrl(reader.result);
            setImageFile(file);
            setShowUpload(false);
            setErrors((prev) => ({ ...prev, image: null }));
        } else {
            setImageFile(null);
            setErrors((prev) => ({
                ...prev,
                image: "An image is required.",
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (title.length > 50) validationErrors.title = "Title must not exceed 50 characters.";
        if (description.length > 315) validationErrors.description = "Description must not exceed 315 characters.";
        if (!(imageFile || isEditing)) validationErrors.image = "An image is required.";

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }
        //!================================== 
        const image = imageFile; // was: img_url = imgUrl
        const form = { image, title, description }; // was: img_url

        try {
            if (isEditing) {
                const form = { title, description };
                await dispatch(updateArtThunk(art.id, form));
            } else {
                await dispatch(createArtThunk(user.id, form));
            }
                closeModal();
        } catch (res) {
            // console.log(`RES =>`,res)
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        }        
    };
    
    return (
        <div>
        <h1>{isEditing ? "Edit title or description" : "Post Art"}</h1>
        <form onSubmit={handleSubmit}>
          <div>
              <input 
                  type="text"
                  value={title}
                  placeholder="Title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setErrors((prev) => ({
                        ...prev,
                        title: e.target.value.length > 50 ? "Title must not exceed 50 characters." : null,
                    }));
                  }}
                  className={errors.title ? "error-border" : ""}
                  required 
              />
               {errors.title &&
                (Array.isArray(errors.title) ? errors.title : [errors.title]).map((error, index) => (
                <p key={`title-error-${index}`} className="error-message">
                    {error}
                </p>
                ))}
              <input 
                  type="text"
                  value={description}
                  placeholder="Description(optional)"
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setErrors((prev) => ({
                        ...prev,
                        description: e.target.value.length > 315 ? "Description must not exceed 315 characters." : null,
                    }));
                  }}
                  className={errors.description ? "error-border" : ""}
              />
               {errors.description &&
                (Array.isArray(errors.description) ? errors.description : [errors.description]).map((error, index) => (
                <p key={`title-error-${index}`} className="error-message">
                    {error}
                </p>
                ))}
            {showUpload && (
                <label htmlFor='file-upload'> Select From Computer
                <input
                  type='file'
                  id='file-upload'
                  name="image" /* was: img_url */
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
                  {errors.image &&
                  (Array.isArray(errors.image) ? errors.image : [errors.image]).map((error, index) => (
                  <p key={`title-error-${index}`} className="error-message">
                      {error}
                  </p>
                  ))}
                <button
                    type="submit"
                    disabled={buttonDisabled}
                >
                    {isEditing ? "Save Changes" : "Post to Gallery"}
                </button>
              </div>
            )}
          </div>
        </form>
    </div>
    )
}