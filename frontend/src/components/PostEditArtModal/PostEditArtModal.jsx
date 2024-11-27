// frontend/src/components/PostEditArtModal/PostEditArtModal.jsx
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { createArtThunk } from "../../store/art";
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
        console.log("Updated imageFile: =>", imageFile);
        console.log("Updated previewUrl: =>", previewUrl);
    }, [imageFile, previewUrl]);

    useEffect(() => {
        if (art && isEditing) {
            setTitle(art.title);
            setDescription(art.description);
            setPreviewUrl(art.imageId);
            setShowUpload(false);
        }
    }, [art, isEditing]);

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        console.log("Selected file:=>", file);
        console.log("Image ID: =>", imageFile);
        console.log("Preview URL: =>", previewUrl);
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
            setPreviewUrl(reader.result);
            }
            setImageFile(file);
            setShowUpload(false);
        } else {
           
            setImageFile(null);
            setErrors((prev) => ({
                ...prev,
                image: "An image is required.",
            }));
        }
    };

    const handleErrors = () => {
        const validationErrors = {};

        if (title.length > 50) {
            validationErrors.title = "Title must not exceed 50 characters.";
        }

        if (description.length > 315) {
            validationErrors.description = "Description must not exceed 315 characters.";
        }

        if (!imageFile) {
            validationErrors.image = "An image is required.";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        if (!handleErrors()) return;
        
        //!================================== 
        const image = imageFile; // was: img_url = imgUrl
        const form = {image, title, description}; // was: img_url
        const postOrEdit = await dispatch(createArtThunk(user.id, form))
        .catch(async (res) => {
            const data = await res.json();
            console.log(`\n== Data: ==\n`, data);
            if (data && data.errors) {
                console.log(`\n== Errors: ==\n`, data.errors);
                setErrors(data.errors);
            } else {
                closeModal();
            }
        })
        // .then(closeModal);
        //!===========================Try Tuesday: Change thunk as well...
        /*
        const formData = new FormData();
        formData.append('userId', user.id);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', imageFile);

        try {
            await dispatch(createArtThunk(formData)); 
            closeModal(); 
        } catch (res) {
            const data = await res.json();
            if (data.errors) {
                setErrors(data.errors); 
            }
        }

        */ 

        if (isEditing) {
            await dispatch(updateArtThunk(art.id, formData));
        } else {
            await dispatch(createArtThunk(user.id, formData));
        }
        closeModal();

    };
    
    return (
        <div>
        <h1>{isEditing ? "Edit Art" : "Post Art"}</h1>
        <form onSubmit={handleSubmit}>
          <div>
              <input 
                  type="text"
                  value={title}
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
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
                  onChange={(e) => setDescription(e.target.value)}
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
                    disabled={!imageFile || Object.keys(errors).length > 0}
                >
                    {isEditing ? "Save Changes" : "Submit"}
                </button>
              </div>
            )}
          </div>
        </form>
    </div>
    )

}