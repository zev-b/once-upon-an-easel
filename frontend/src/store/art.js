import { csrfFetch } from './csrf';

const LOAD_ART = 'art/loadArt';
const LOAD_USER_ART = 'art/loadUserArt';
const LOAD_ART_DETAILS = 'art/loadArtDetails';
const CREATE_ART = 'art/createArt';
// const LOAD_TAGS = '';
// const CREATE_TAG = '';

const loadArt = (art) => ({
  type: LOAD_ART,
  art,
});

export const loadArtDetails = (art) => ({
  type: LOAD_ART_DETAILS,
  art
});

export const loadUserArt = (art) => ({
  type: LOAD_USER_ART,
  art
});

const createArt = (artPiece) => ({
  type: CREATE_ART,
  artPiece,
});

//# GET all art 
export const fetchArtThunk = () => async (dispatch) => {
  const res = await fetch('api/art-pieces');
  if (res.ok) {
    const data = await res.json();

    console.log('\n=== data ===\n', data);

    dispatch(loadArt(data)); // Splash only uses .artPieces, Gallery needs all info
    return data.artPieces;
  } else {
    console.error('Failed to fetch art');
  }
}

//# GET user's art (manage-art) 
export const fetchUserArtThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/art-pieces/current');
  if (response.ok) {
      const data = await response.json();
      dispatch(loadUserArt(data.artPieces)) // |.Art|.artPieces ?
  }
};

//# GET art by id (art-details) 
export const fetchArtDetails = (artId) => async (dispatch) => {
  const response = await csrfFetch(`/api/art-pieces/${artId}`);
  if (response.ok) {
      const artPiece = await response.json();
      dispatch(loadArtDetails(artPiece));
  } else {
      console.error(`Failed to get details for artId: ${artId}`);
  }
}

//# POST
export const createArtThunk = (userId, form) => async (dispatch) => {
  const { image, title, description } = form;
  try {
    const formData = new FormData();

    formData.append('userId', userId);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    const options = {
      method: "POST",
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formData
    }

    const res = await csrfFetch('/api/art-pieces', options);
  
    if (res.ok) {
      const artPiece = await res.json();
      dispatch(createArt(artPiece));

    } else if (res.status < 500) {
      const data = await res.json();

      if (data.errors) return data

      throw new Error('Failed to upload art piece');
    }
    
    return res;
  } catch (error) {
    return error
  }
};

const initialState = {
  allArt: {},
  artDetails: null,
  tags: {}
};

export const artReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ART:
    case LOAD_USER_ART:
      return { ...state, allArt: { ...state.allArt, ...action.art } };
    case LOAD_ART_DETAILS: 
      return { ...state, artDetails: action.art };
    case CREATE_ART:
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
