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
  const res = await csrfFetch('api/art-pieces');
  if (res.ok) {
    const data = await res.json();

    console.log('\n=== data ===\n', data);

    dispatch(loadArt(data.art)); // .Art|.artPieces ?
    return data.art;
  } else {
    console.error('Failed to fetch art');
  }
}

//# GET art by id (art-details) 
export const fetchArtDetails = (artId) => async (dispatch) => {
  const response = await fetch(`/api/art-pieces/${artId}`);
  if (response.ok) {
      const artPiece = await response.json();
      dispatch(loadSpotDetails(artPiece));
  } else {
      console.error(`Failed to get details for artId: ${artId}`);
  }
}

//# GET user's art (manage-art) 
export const fetchUserArtThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/art-pieces/current');
  if (response.ok) {
      const data = await response.json();
      dispatch(loadUserSpots(data.art)) // |.Art|.artPieces ?
  }
};

//# POST
export const createArtThunk = (formData) => async (dispatch) => {
  const response = await csrfFetch('/api/art-pieces', {
    method: 'POST',
    body: formData, 
  });

  if (response.ok) {
    const artPiece = await response.json();
    dispatch(createArt(artPiece));
    return artPiece;
  } else {
    throw new Error('Failed to upload art piece');
  }
};

const initialState = {
  allArt: {},
  artDetails: null,
  tags: []
};

export const artReducer = (state = initialState, action) => {
  switch (action.type) {
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
