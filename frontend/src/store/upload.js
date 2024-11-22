import { csrfFetch } from './csrf';


// export const updateUserThunk = (userId, form) => async (dispatch) => {
//     const { img_url } = form
//     try{

//         const formData = new FormData();

//         formData.append('userId', userId)
//         formData.append("image", img_url);

//         const option = {
//             method: "PUT",
//             headers: { 'Content-Type': 'multipart/form-data' },
//             body: formData
//         }

//         const response = await csrfFetch(`/api/users/${userId}/update`, option);
//         if (response.ok) {
//             const user = await response.json();
//             dispatch(editUser(user));

//         } else if (response.status < 500) {
//             const data = await response.json();
//             if (data.errors) {
//                 return data
//             } else {
//                 throw new Error('An error occured. Please try again.')
//             }
//         }
//         return response;
//     } catch(e){
//         return e
//     }
// }


export const uploadArtImage = (form) => async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append('image', form.image); // key for backend route

        const response = await csrfFetch('/api/art-pieces', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const { imageUrl } = await response.json();
            dispatch(setUploadedImage(imageUrl));
            return imageUrl;
        }
    } catch (error) {
        console.error('Image upload failed:', error);
        throw error;
    }
};

// Action creator
const setUploadedImage = (imageUrl) => ({
    type: 'SET_UPLOADED_IMAGE',
    payload: imageUrl,
});

// Reducer case
export const artReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_UPLOADED_IMAGE':
            return { ...state, uploadedImage: action.payload };
        default:
            return state;
    }
};
