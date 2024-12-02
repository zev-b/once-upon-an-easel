import { csrfFetch } from './csrf';

const CLEAR_ART_STATE = 'art/clearArtState';
const LOAD_ART = 'art/loadArt';
const SET_ACTIVE_FILTER = "art/SET_ACTIVE_FILTER";
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

export const setActiveFilter = (tagId) => ({
  type: SET_ACTIVE_FILTER,
  tagId,
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

export const deleteTag = (artId, tagId) => ({
  type: DELETE_TAG,
  tagId, artId
});


//# GET all art 
export const fetchArtThunk = (filters = {}) => async (dispatch) => {
  const { tagId } = filters;
  let url = "/api/art-pieces";

  if (tagId) {
    url += `?tagIds[]=${tagId}`;
  }
  const res = await fetch(url);
  if (res.ok) {
    const data = await res.json();

    // console.log('\n=== data ===\n', data);

    dispatch(loadArt(data));
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
      dispatch(loadUserArt(data));
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
    return artPiece;
  } else if (res.status < 500) {
    // const data = await res.json();

    // if (data.errors) return data

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
    body: JSON.stringify({ tagName }),
  });

  if (res.ok) {
    const newTag = await res.json();
    dispatch(createTag(newTag));
    return newTag;
  } else if (res.status < 500) {
    const error = await res.json();
    return error;
  } else {
    throw res;
  }
}

//# PUT tag 
export const updateTagThunk = (artId, tagId, newName) => async (dispatch) => {
  const res = await csrfFetch(`/api/art-pieces/${artId}/tags/${tagId}`, {
    method: 'PUT',
    body: JSON.stringify({ name: newName }),
  });

  if (res.ok) {
    const updatedTag = await res.json();
    dispatch(updateTag(updatedTag));
    return updatedTag;
  } else if (res.status < 500) {
    const error = await res.json();
    return error;
  } else {
    throw res;
  }
}

//# DELETE tag
export const deleteTagThunk = (artId, tagId) => async (dispatch) => {
  const res = await csrfFetch(`/api/art-pieces/${artId}/tags/${tagId}`, {
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
  tags: {},
  activeFilter: null,
};

export const artReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ART_STATE:
      return { ...state, allArt: {} }
    case LOAD_ART:
    case LOAD_USER_ART:
      return { ...state, allArt: { ...state.allArt, ...action.art } };

    case SET_ACTIVE_FILTER:
      return {
        ...state,
        activeFilter: action.tagId,
      };

    case LOAD_ART_DETAILS: 
      return { ...state, artDetails: action.art };
    case CREATE_ART:
    case UPDATE_ART:
      return { ...state, allArt: { ...state.allArt, [action.artPiece.id]: action.artPiece } };

    case DELETE_ART: {
      const { artId } = action;
      //* 1. copy state
      const stateCopy = { ...state, allArt: { ...state.allArt }, tags: { ...state.tags } };
      //* 2. check if tags
      const deletedArtTags = stateCopy.allArt[artId]?.tags || [];
      //* 3. delete art
      delete stateCopy.allArt[artId];
      //* 4. check if tags used elsewhere
      deletedArtTags.forEach((tagId) => {
        const tagUsedElsewhere = Object.values(stateCopy.allArt).some((art) => art.tags?.includes(tagId)
        );

        //* 5. if NOT, delete tag in state
        if (!tagUsedElsewhere) {
          delete stateCopy.tags[tagId];
        }
      });

      //* 6. Otherwise return state
        return stateCopy
    }
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

    case DELETE_TAG: {
      const { tagId, artId } = action;
      //* 1. copy state
      const stateCopy = { ...state, allArt: { ...state.allArt }, tags: { ...state.tags } };
      //* 2. Remove tag from the art's tagIds array
      if (stateCopy.allArt[artId]?.tags) {
        stateCopy.allArt[artId].tags = stateCopy.allArt[artId].filter((id) => id !== tagId);
      }
      //* 3. check if tags used elsewhere
      const tagUsedElsewhere = Object.values(stateCopy.allArt).some((art) => art.tags?.includes(tagId));

      //* 4. if NOT, delete tag in state
      if (!tagUsedElsewhere) {
        delete stateCopy.tags[tagId];
      }

      //* 5. Otherwise return state
      return stateCopy
    }
    default:
      return state;
  }
};