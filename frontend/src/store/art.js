import { csrfFetch } from './csrf';

const CLEAR_ART_STATE = 'art/clearArtState';
const LOAD_ART = 'art/loadArt';
const LOAD_USER_ART = 'art/loadUserArt';
const LOAD_ART_DETAILS = 'art/loadArtDetails';
const CREATE_ART = 'art/createArt';
const UPDATE_ART = 'art/updateArt';
const DELETE_ART = 'art/deleteArt';

const LOAD_TAGS = 'art/loadTags';
const CREATE_TAG = 'art/createTag';
const UPDATE_TAG = 'art/updateTag';
const DELETE_TAG = 'art/deleteTag';

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
});

export const deleteArt = (artId) => ({
  type: DELETE_ART,
  artId
});

const normalizeTags = (tags) => {
  return tags.reduce((collection, tag) => {
    collection[tag.id] = tag;
    return collection;
  }, {});
};

export const loadTags = (tags) => ({
  type: LOAD_TAGS,
  tags: normalizeTags(tags),
});

export const createTag = (tag) => ({
  type: CREATE_TAG,
  tag,
});

export const updateTag = (tag) => ({
  type: UPDATE_TAG,
  tag,
});

export const deleteTag = (tagId) => ({
  type: DELETE_TAG,
  tagId,
});


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

//# POST art
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

//# PUT art
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

//# DELETE art
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

//# GET all tags for Nav
export const fetchTagsThunk = () => async (dispatch) => {
  const res = await csrfFetch('/api/tags');

  if (res.ok) {
    const tags = await res.json();
    dispatch(loadTags(tags));
    return tags;
  } else {
    console.error("Failed to fetch tags");
  }
}

//# POST tag
export const createTagThunk = (artId, tagName) => async (dispatch) => {
  const res = await csrfFetch(`/api/art-pieces/${artId}/tags`, {
    method: 'POST',
    body: JSON.stringify({ name: tagName }),
  });

  if (res.ok) {
    const newTag = await res.json();
    dispatch(createTag(newTag));
    return newTag;
  } else {
    const error = await res.json();
    return error;
  }
}

//# PUT tag 
export const updateTagThunk = (tagId, newName) => async (dispatch) => {
  const res = await csrfFetch(`/api/tags/${tagId}`, {
    method: 'PUT',
    body: JSON.stringify({ name: newName }),
  });

  if (res.ok) {
    const updatedTag = await res.json();
    dispatch(updateTag(updatedTag));
    return updatedTag;
  } else {
    const error = await res.json();
    return error;
  }
}

//# DELETE tag
export const deleteTagThunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/tags/${tagId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(deleteTag(tagId));
    return { message: 'Tag deleted successfully' };
  } else {
    const error = await res.json();
    return error;
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
       };
    //# ------------- TAGS --------------
    case LOAD_TAGS:
      return { ...state, tags: { ...action.tags } };
    case CREATE_TAG:
      return {
        ...state,
        tags: { ...state.tags, [action.tag.id]: action.tag },
      };
    case UPDATE_TAG:
      return {
        ...state,
        tags: { ...state.tags, [action.tag.id]: action.tag },
      };
    case DELETE_TAG:
      const newTags = { ...state.tags };
      delete newTags[action.tagId];
      return { ...state, tags: newTags };
    default:
      return state;
  }
};