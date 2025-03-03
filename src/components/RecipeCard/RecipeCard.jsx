import React from "react";
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  return (
    <article className="recipe-card">
      {recipe.imageUrl && (
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="recipe-image"
        />
      )}
      
      <div className="card-body">
        <div className="recipe-meta">
          <h2 className="recipe-title">{recipe.title}</h2>
          <span className="time-badge">
            ⏳ {recipe.time} mins
          </span>
        </div>

        <p className="recipe-description">{recipe.description}</p>

        <div className="ingredients-section">
          <h3 className="section-title">🍴 Ingredients</h3>
          <ul className="ingredients-list">
            {recipe.ingredients.split(',').map((ingredient, index) => (
              <li key={index}>{ingredient.trim()}</li>
            ))}
          </ul>
        </div>

        <button className="view-button">
          View Full Recipe
        </button>

        <div className="recipe-footer">
          <div className="author-info">
            👨🍳 {recipe.author?.username || "Anonymous Chef"}
          </div>
          <div className="rating-info">
            ⭐ {recipe.rating || 'Not rated'}
          </div>
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;