import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
//
import './App.css'

//services
import * as authService from '../src/services/authService'; // import the authservice
import * as recipeService from '../src/services/recipeService';
//COMPONENTS
import RecipeCard from './components/RecipeCard/RecipeCard';
import RecipeList from './components/RecipeList/RecipeList';



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


  }, [user])




  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (


            <>
              {/* <Route path ="/recipes" element={<RecipeCard recipe={recipes[0]} />} />*/}


              
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/recipes" element={<RecipeList recipes={recipes}/>} />
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
