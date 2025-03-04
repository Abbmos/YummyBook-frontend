import { Link } from "react-router-dom";
import RecipeCard from "../RecipeCard/RecipeCard";
import './RecipeList.css';

const RecipeList = ({ recipes }) => {
  return (
    <main className="recipe-list">
      {recipes.map((recipe) => (
        <div className="recipe-card-wrapper" key={recipe._id}>
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </main>
  );
};

export default RecipeList;