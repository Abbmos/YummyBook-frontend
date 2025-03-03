// src/components/RecipeList/RecipeList.jsx
import { Link } from "react-router-dom";
import RecipeCard from "../RecipeCard/RecipeCard";
const RecipeList = ({ recipes }) => {

  
    return (
    <main className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
     
<RecipeCard recipe={recipe}/>

      ))}
    </main>
  );
};

export default RecipeList;
