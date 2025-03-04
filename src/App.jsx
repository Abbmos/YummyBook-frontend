import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//
import './App.css'

//services
import * as authService from '../src/services/authService'; 
import * as recipeService from '../src/services/recipeService';
//COMPONENTS
import RecipeCard from './components/RecipeCard/RecipeCard';
import RecipeList from './components/RecipeList/RecipeList';
import RecipeForm from './components/RecipeForm/RecipeForm';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';



export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllRecipes = async () => {
      const recipesData = await recipeService.index();
      
      setRecipes(recipesData)
     

    }

    if (user) fetchAllRecipes()

      


  }, [user]);




  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };


  const handleAddRecipe = async (recipeFormData) => {
    const newRecipe = await recipeService.create(recipeFormData)
    const newRecipeList = [ newRecipe, ...recipes ];

    setRecipes(newRecipeList)
    navigate('/recipes');
  };

  const handleUpdateRecipe = async (recipeId, recipeFormData) => {
    const updatedRecipe = await recipeService .update(recipeId, recipeFormData);
    console.log(updatedRecipe);
    setRecipes(recipes.map((recipe) => (recipeId === recipe._id ? updatedRecipe : recipe)));
    navigate(`/recipes/${recipeId}`);
  };



  const handleDeleteRecipe = async (recipeId) => {
    const deletedRecipe = await recipeService.deleteRecipe(recipeId);
    setRecipes(recipes.filter(recipe => recipe._id !== deletedRecipe._id));
    navigate('/recipes');
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (


            <>
              


              
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/recipes" element={<RecipeList recipes={recipes}/>} />
              <Route path="/recipes/new" element={<RecipeForm handleAddRecipe={handleAddRecipe} />} />
              <Route path="recipes/:recipeId" element={<RecipeDetails recipes={recipes} handleDeleteRecipe={handleDeleteRecipe} />} />
              <Route path="recipes/:recipeId/edit" element={<RecipeForm handleUpdateRecipe={handleUpdateRecipe}/>} />
            
            </>
          ) : (
            <>
              <Route path="/" element={<Landing />} />

            </>

          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
