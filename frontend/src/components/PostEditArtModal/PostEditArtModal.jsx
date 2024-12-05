// frontend/src/components/PostEditArtModal/PostEditArtModal.jsx
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { createArtThunk, updateArtThunk, createTagThunk, updateTagThunk, fetchTagsThunk, deleteTagThunk } from "../../store/art";
import './PostEditArtModal.css';

export default function PostEditArtModal({ art, isEditing = false }) {
    const user = useSelector(state => state.session.user);
    const tags = useSelector(state => state.art.tags);
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [buttonDisabled, setButtonDisabled] = useState(true);
    
    // image url to send to aws
    const [imageFile, setImageFile] = useState(""); 
    // telling us if we should show the image
    const [showUpload, setShowUpload] = useState(true);
    // img url we will load in react
    const [previewUrl, setPreviewUrl] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [label1, setLabel1] = useState("");
    const [label2, setLabel2] = useState("");
    const [label3, setLabel3] = useState("");

    const [labelErrors, setLabelErrors] = useState({});
    
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (art && isEditing) {
            setTitle(art.title);
            setDescription(art.description);
            setPreviewUrl(art.imageId);
            //# Logic for populating tag inputs from tags Selector
            const artTags = art.tags || [];
            setLabel1(tags[artTags[0]]?.name || "");
            setLabel2(tags[artTags[1]]?.name || "");
            setLabel3(tags[artTags[2]]?.name || "");
            // console.log(art.imageId)
            setShowUpload(false);
        }
    }, [art, isEditing, tags]);

    const validateLabels = () => {
        const errors = {};
        [label1, label2, label3].forEach((label, index) => {
            if (label && (label.length > 24 || !/^[0-9a-zA-Z -]+$/.test(label))) {
                errors[`label${index + 1}`] = "Tag must be alphanumeric, spaces, or hyphens, and under 24 characters.";
            }
        });
        setLabelErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationErrors = {};
        if (title.length > 50) validationErrors.title = "Title must not exceed 50 characters.";
        if (description.length > 315) validationErrors.description = "Description must not exceed 315 characters.";
        if (!(imageFile || isEditing)) validationErrors.image = "An image is required.";

        const labelsValid = validateLabels();

        if (Object.keys(validationErrors).length || !labelsValid) {
            setErrors(validationErrors);
            return;
        }
        
        const image = imageFile;
        const form = { image, title, description };

        try {
            const tagInputs = [label1, label2, label3];
            const currentTagIds = art?.tags || [];
            
            let artId; //#(for tags)
            if (isEditing) {
                artId = art.id; //#(for tags)
                for (let i = 0; i < tagInputs.length; i++) {
                    const label = tagInputs[i];
                    if (label) {
                        if (currentTagIds[i]) {
                            await dispatch(updateTagThunk(artId, currentTagIds[i], label));
                        } else {
                            await dispatch(createTagThunk(artId, label));
                        }
                    } else {
                        if (currentTagIds[i]) {
                            await dispatch(deleteTagThunk(artId, currentTagIds[i]))
                        }
                    }
                }
                const form = { title, description };
                await dispatch(updateArtThunk(art.id, form));
            } else {
                const newArt = await dispatch(createArtThunk(user.id, form));
                // console.log(`NEW_ART ===>`, newArt);
                artId = newArt.id; //#(for tags)
                
                for (let i = 0; i < tagInputs.length; i++) {
                    const label = tagInputs[i];
                    if (label) {
                        await dispatch(createTagThunk(artId, label));
                    }
                }
            }
            dispatch(fetchTagsThunk);
            closeModal();
        } catch (res) {
            // console.log(`RES =>`, res);
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        }        
    };

    useEffect(() => {
        if (isEditing) {
            setButtonDisabled(
                title.length > 50 ||
                description.length > 315 ||
                Object.keys(errors).some((key) => errors[key])
                // || Object.keys(labelErrors).length > 0
            )
        } else {
            setButtonDisabled(
                !imageFile ||
                title.length > 50 ||
                description.length > 315 ||
                Object.keys(errors).some((key) => errors[key])
                // || Object.keys(labelErrors).length > 0
            );
        }
        // console.log(`= Btn disabld? =`, Object.keys(errors).some((key) => errors[key]));
        // console.log(`= isEditing? =`, isEditing, art)
    }, [imageFile, title, description, errors, isEditing, labelErrors]);

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

    return (
        <div>
        <h2>{isEditing ? "Edit title, description or labels" : "Post Art"}</h2>
        <form onSubmit={handleSubmit} className="edit-post-form">
          <div className="inputs">
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
              <textarea
                  value={description}
                  placeholder="Description (optional)"
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
                <input 
                    type="text"
                    value={label1}
                    placeholder="Label #1 (optional)"
                    onChange={(e) => setLabel1(e.target.value)}
                    className={labelErrors.label1 ? "error-border" : ""}
                />
                    {labelErrors.label1 && <p className="error-message">{labelErrors.label1}</p>}
                <input 
                    type="text"
                    value={label2}
                    placeholder="Label #2 (optional)"
                    onChange={(e) => setLabel2(e.target.value)}
                    className={labelErrors.label2 ? "error-border" : ""}
                />
                {labelErrors.label2 && <p className="error-message">{labelErrors.label2}</p>}
                <input 
                    type="text"
                    value={label3}
                    placeholder="Label #3 (optional)"
                    onChange={(e) => setLabel3(e.target.value)}
                    className={labelErrors.label3 ? "error-border" : ""}
                />
                {labelErrors.label3 && <p className="error-message">{labelErrors.label3}</p>}
            </div>
            <div className="image-and-button">
            {showUpload ? (
                <label htmlFor='file-upload'> Upload Image
                <input
                  type='file'
                  id='file-upload'
                  name="image"
                  onChange={uploadImage}
                  accept='.jpg, .jpeg, .png, .gif'
                  />
                </label>
            ) : (
                <>
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
                </>
            )}
          </div>
        </form>
    </div>
    )
}