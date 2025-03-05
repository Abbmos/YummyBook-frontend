import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as recipeService from '../../services/recipeService';
import { AuthedUserContext } from "../../App";
import CommentForm from '../CommentForm/CommentForm';
import './RecipeDetails.css';

const RecipeDetails = (props) => {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const user = useContext(AuthedUserContext);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {

        const recipeData = await recipeService.show(recipeId);
        setRecipe(recipeData);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        navigate('/recipes');
      }
    };
    fetchRecipe();
  }, [recipeId, navigate]);





  const handleAddComment = async (commentFormData) => {
    const newComment = await recipeService.createComment(recipeId, commentFormData);
    setRecipe(prev => ({
      ...prev,
      comments: [...prev.comments, newComment]
    }));
  };



  const handleDeleteComment = async (commentId) => {
    await recipeService.deleteComment(recipeId, commentId);
    setRecipe(prev => ({
      ...prev,
      comments: prev.comments.filter(comment => comment._id !== commentId)
    }));
  };



  if (!recipe) return <main className="recipe-details loading">Loading...</main>;

  return (
    //put max width or article 60%
    <article className="recipe-details" style={{ maxWidth: '800px', margin: '0 auto' }}>

      <button className="back-button" onClick={() => navigate("/recipes")}>
        ← Back to Recipes
      </button>

      <header className="details-header">
        <div>
          <h1 className="details-title">{recipe.title}</h1>
          <div className="author-info">
            👨🍳 By {recipe.author?.username || "Anonymous Chef"}
            
          </div>
        </div>

        {recipe.author._id === user?._id && (
          <div className="recipe-actions">
            <button onClick={() => navigate(`/recipes/${recipeId}/edit`)}>
              Edit
            </button>
            <button onClick={() => props.handleDeleteRecipe(recipeId)}>Delete</button>
          </div>
        )}
      </header>

      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="details-image"
        />
      )}

      <div className="details-meta">
        <span className="time-badge">
          ⏳ {recipe.time} mins
        </span>
        <div className="rating-info">
          ⭐ {recipe.rating || 'Not rated'}
          <span className="text-muted"> ({recipe.comments?.length || 0} comments)</span>
        </div>
      </div>

      <p className="recipe-description">{recipe.description}</p>

      <div className="details-grid">
        <div className="details-section">
          <h3 className="section-title">🍴 Ingredients</h3>
          <ul className="ingredients-list">
            {recipe.ingredients.split(',').map((ingredient, index) => (
              <li key={index}>{ingredient.trim()}</li>
            ))}
          </ul>
        </div>

        <div className="details-section">
          <h3 className="section-title">📝 Instructions</h3>
          <ol className="instructions-list">
            {recipe.instructions.split('\n').map((step, index) => (
              <li key={index}>{step.trim()}</li>
            ))}
          </ol>
        </div>
      </div>
      <section className="comments-section">
        <h2 className="section-title">💬 Comments ({recipe.comments.length})</h2>
        <CommentForm handleAddComment={handleAddComment} />

        {!recipe.comments.length ? (
          <p className="no-comments">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          recipe.comments.map(comment => (
            <article key={comment._id} className="comment-card">
              <header className="comment-header">
                <div className="comment-author">
                  {comment.author.username}
                  <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {comment.author._id === user?._id && (
                 

                    <button
                      className="delete-comment"
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      Delete
                    </button>


                
                )}
              </header>
              {comment.rating && (
                <div className="comment-rating">
                  ⭐
                  <span>{comment.rating}/5</span>
                </div>
              )}
              <p className="comment-text">{comment.text}</p>
            </article>
          ))
        )}
      </section>
    </article>
  );
};

export default RecipeDetails;