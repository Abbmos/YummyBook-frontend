import React from "react";
console.log("inside card");

const RecipeCard = ({ recipe }) => {



  return (


    <div className="w-full max-w-md bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900">{recipe.title}</h2>
        <p className="text-sm text-gray-600">{recipe.description}</p>

        <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <span>⏳</span>
            <span>{recipe.time} mins</span>
          </div>
          <div className="flex items-center gap-1">
            <span>👤</span>
            <span>{recipe.author?.username || "Unknown"}</span>
          </div>
        </div>

        <p className="mt-3 text-gray-700">
          <span className="font-semibold">Ingredients:</span> {recipe.ingredients}
        </p>

        <p className="mt-2 text-gray-700">
          <span className="font-semibold">Instructions:</span> {recipe.instructions}
        </p>

        <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">View Recipe</button>
      </div>
    </div>
  );
};

export default RecipeCard;
