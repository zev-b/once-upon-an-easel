import { csrfFetch } from './csrf';


const CLEAR_ART_STATE = 'art/clearArtState';
const LOAD_ART = 'art/loadArt';
const LOAD_USER_ART = 'art/loadUserArt';
const LOAD_ART_DETAILS = 'art/loadArtDetails';
const CREATE_ART = 'art/createArt';
const UPDATE_ART = 'art/updateArt';
const DELETE_ART = 'art/deleteArt';
// const LOAD_TAGS = '';
// const CREATE_TAG = '';

const normalizeArt = (data) => {
  let artPieces = data.artPieces;
  return artPieces.reduce((collection, art) => {
    collection[art.id] = art;
    return collection;
  }, {});
};

export const clearArtState = () => ({
  type: CLEAR_ART_STATE
})

export const loadArt = (art) => ({
  type: LOAD_ART,
  art: normalizeArt(art),
});

export const loadArtDetails = (art) => ({
  type: LOAD_ART_DETAILS,
  art
});

export const loadUserArt = (art) => ({
  type: LOAD_USER_ART,
  art: normalizeArt(art)
});

export const createArt = (artPiece) => ({
  type: CREATE_ART,
  artPiece,
});

export const updateArt = (artPiece) => ({
  type: UPDATE_ART,
  artPiece,
})

export const deleteArt = (artId) => ({
  type: DELETE_ART,
  artId
})

//# GET all art 
//! TODO: handle passing in filters to backend route when present...
export const fetchArtThunk = (filters) => async (dispatch) => {
  //! ...build fetch url conditionally with filters
  const res = await fetch('api/art-pieces');
  if (res.ok) {
    const data = await res.json();

    console.log('\n=== data ===\n', data);

    dispatch(loadArt(data)); //^ Splash only uses .artPieces, Gallery needs all info
    return data.artPieces;
  } else {
    console.error('Failed to fetch art');
  }
}

//# GET User's art (manage-art) 
export const fetchUserArtThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/art-pieces/current');
  if (response.ok) {
      const data = await response.json();
      dispatch(loadUserArt(data)) // |.Art|.artPieces ?
  }
};

//# GET art by id (art-details) 
export const fetchArtDetails = (artId) => async (dispatch) => {
  const response = await csrfFetch(`/api/art-pieces/${artId}`);
  if (response.ok) {
      const artPiece = await response.json();
      // console.log("artPiece", artPiece);
      dispatch(loadArtDetails(artPiece.art));
  } else {
      console.error(`Failed to get details for artId: ${artId}`);
  }
}

//# POST
export const createArtThunk = (userId, form) => async (dispatch) => {
  const { image, title, description } = form;
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

    throw res;
  }

  return res;
};

//# PUT
export const updateArtThunk = (artId, form) => async (dispatch) => { 
  const res = await csrfFetch(`/api/art-pieces/${artId}`, {
    method: 'PUT',
    body: JSON.stringify(form),
  });

  if (res.ok) {
    const updatedArtPiece = await res.json();
    dispatch(updateArt(updatedArtPiece));
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data;
    }
  } else {
    throw res;
  }

  return res;
};

//# DELETE 
export const deleteArtThunk = (artId) => async (dispatch) => {
  const res = await csrfFetch(`/api/art-pieces/${artId}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteArt(artId));
    return data;
  } else if (res.status < 500) {
    const error = await res.json();
    return error;
  } else {
    throw res;
  }
}

const initialState = {
  allArt: {},
  artDetails: null,
  tags: {}
};

export const artReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ART_STATE:
      return { ...state, allArt: {} }
    case LOAD_ART:
    case LOAD_USER_ART:
      return { ...state, allArt: { ...state.allArt, ...action.art } };
    case LOAD_ART_DETAILS: 
      return { ...state, artDetails: action.art };
    case CREATE_ART:
    case UPDATE_ART:
      return { ...state, allArt: { ...state.allArt, [action.artPiece.id]: action.artPiece } };
    case DELETE_ART: 
      return { 
        ...state,
        allArt: Object.fromEntries(Object.entries(state.allArt).filter(([ id ]) => id != action.artId))
       }
    default:
      return state;
  }
};