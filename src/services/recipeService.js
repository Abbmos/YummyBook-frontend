const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/recipes`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (recipeId) => {
  try {
    const res = await fetch(`${BASE_URL}/${recipeId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (recipeFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteRecipe = async (recipeId) => {
  try {
    const res = await fetch(`${BASE_URL}/${recipeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Comments
const createComment = async (recipeId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${recipeId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

async function update(recipeId, recipeFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${recipeId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

const deleteComment = async (recipeId, commentId) => {
  try {
    const res = await fetch(`${BASE_URL}/${recipeId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export {
  index,
  show,
  create,
  update,
  deleteRecipe,
  createComment,
  deleteComment
};
