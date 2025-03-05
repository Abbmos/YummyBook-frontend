import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as recipeService from '../../services/recipeService';
import './RecipeForm.css';

const RecipeForm = (props) => {
  const { recipeId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    instructions: '',
    category: 'Main Course',
    description: '',
    ingredients: '',
    imageUrl: 'https://theme-assets.getbento.com/sensei/11492d5.sensei/assets/images/catering-item-placeholder-704x520.png',
    time: 0,
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeData = await recipeService.show(recipeId);
      setFormData(recipeData);
    };
    if (recipeId) fetchRecipe();
  }, [recipeId]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (recipeId) {
      props.handleUpdateRecipe(recipeId, formData);
    } else {
      props.handleAddRecipe(formData);
    }
  };

  return (
    <main className="recipe-form">
      <form onSubmit={handleSubmit} className="horizontal-form">
        <h1 className="form-title">{recipeId ? 'Edit Recipe' : 'Create New Recipe'}</h1>
        
        <div className="form-grid">
          {/* Left Column */}
          <div className="form-column">
            <div className="form-row">
              <label className="form-label" htmlFor="title-input">Title</label>
              <input required type="text" name="title" id="title-input" className="form-input" value={formData.title} onChange={handleChange} />
            </div>

            <div className="form-row">
              <label className="form-label" htmlFor="category-input">Category</label>
              <select required name="category" id="category-input" className="form-input form-select" value={formData.category} onChange={handleChange}>
                <option value="Main Course">Main Course</option>
                <option value="Desserts">Desserts</option>
                <option value="Snacks">Snacks</option>
                <option value="Drinks">Drinks</option>
              </select>
            </div>

            <div className="form-row">
              <label className="form-label" htmlFor="time-input">Cooking Time (minutes)</label>
              <input required type="number" name="time" id="time-input" className="form-input" value={formData.time} onChange={handleChange} min="0" />
            </div>

            <div className="form-row">
              <label className="form-label" htmlFor="imageUrl-input">Image URL</label>
              <input type="text" name="imageUrl" id="imageUrl-input" className="form-input" value={formData.imageUrl} onChange={handleChange} />
            </div>

            {formData.imageUrl? formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="image-preview" /> : <img src="https://theme-assets.getbento.com/sensei/11492d5.sensei/assets/images/catering-item-placeholder-704x520.png"alt="Preview" className="image-preview" /> }
            
          </div>

          {/* Right Column */}
          <div className="form-column">
            <div className="form-row">
              <label className="form-label" htmlFor="description-input">Description</label>
              <textarea required name="description" id="description-input" className="form-input form-textarea" value={formData.description} onChange={handleChange} />
            </div>

            <div className="form-row">
              <label className="form-label" htmlFor="ingredients-input">Ingredients</label>
              <textarea required name="ingredients" id="ingredients-input" className="form-input form-textarea" value={formData.ingredients} onChange={handleChange} placeholder="e.g., 1 cup flour, 2 eggs, 1 tsp salt..." />
            </div>

            <div className="form-row">
              <label className="form-label" htmlFor="instructions-input">Instructions</label>
              <textarea required name="instructions" id="instructions-input" className="form-input form-textarea" value={formData.instructions} onChange={handleChange} placeholder="Enter each step on a new line..." />
            </div>

            <button type="submit" className="form-button">{recipeId ? 'Update Recipe' : 'Create Recipe'}</button>
          </div>
        </div>
      </form>
    </main>
  );

};

export default RecipeForm;
