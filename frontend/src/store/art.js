import { csrfFetch } from './csrf';

const UPLOAD_ART = 'art/uplaodArt';

const uploadArt = (artPiece) => ({
    type: UPLOAD_ART,
    artPiece,
});

//# POST
export const uploadArtImage = (formData) => async (dispatch) => {
  const response = await csrfFetch('/api/art-pieces', {
    method: 'POST',
    body: formData, 
  });

  if (response.ok) {
    const artPiece = await response.json();
    dispatch(uploadArt(artPiece));
    return artPiece;
  } else {
    throw new Error('Failed to upload art piece');
  }
};

const initialState = {};

export const artReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_ART:
      return { ...state, [action.artPiece.id]: action.artPiece };
    default:
      return state;
  }
};

//* ===============================================================
// export const uploadArtImage = (form) => async (dispatch) => {
//     try {
//         const formData = new FormData();
//         formData.append('image', form.image); // key for backend route

//         const response = await csrfFetch('/api/art-pieces', {
//             method: 'POST',
//             body: formData,
//         });

//         if (response.ok) {
//             const { imageUrl } = await response.json();
//             dispatch(setUploadedImage(imageUrl));
//             return imageUrl;
//         }
//     } catch (error) {
//         console.error('Image upload failed:', error);
//         throw error;
//     }
// };

// const setUploadedImage = (imageUrl) => ({
//     type: 'SET_UPLOADED_IMAGE',
//     payload: imageUrl,
// });

// export const artReducer = (state = {}, action) => {
//     switch (action.type) {
//         case 'SET_UPLOADED_IMAGE':
//             return { ...state, uploadedImage: action.payload };
//         default:
//             return state;
//     }
// };
