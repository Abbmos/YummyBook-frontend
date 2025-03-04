import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as recipeService from '../../services/recipeService';
// import './RecipeForm.module.css';

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
        <main className="form-container">
            <form onSubmit={handleSubmit} className="recipe-form">
                <h1>{recipeId ? 'Edit Recipe' : 'New Recipe'}</h1>

                <label htmlFor="title-input">Title</label>
                <input
                    required
                    type="text"
                    name="title"
                    id="title-input"
                    value={formData.title}
                    onChange={handleChange}
                />
                
                <label htmlFor="description-input">Description</label>
                <textarea
                    required
                    name="description"
                    id="description-input"
                    value={formData.description}
                    onChange={handleChange}
                />

                <label htmlFor="instructions-input">Instructions</label>
                <textarea
                    required
                    name="instructions"
                    id="instructions-input"
                    value={formData.instructions}
                    onChange={handleChange}
                />

                <label htmlFor="ingredients-input">Ingredients</label>
                <textarea
                    required
                    name="ingredients"
                    id="ingredients-input"
                    value={formData.ingredients}
                    onChange={handleChange}
                />

                <label htmlFor="category-input">Category</label>
                <select
                    required
                    name="category"
                    id="category-input"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="Main Course">Main Course</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Drinks">Drinks</option>
                </select>

                <label htmlFor="time-input">Cooking Time (in minutes)</label>
                <input
                    required
                    type="number"
                    name="time"
                    id="time-input"
                    value={formData.time}
                    onChange={handleChange}
                    min="0"
                />

                <label htmlFor="imageUrl-input">Image URL</label>
                <input
                    type="text"
                    name="imageUrl"
                    id="imageUrl-input"
                    value={formData.imageUrl}
                    onChange={handleChange}
                />

                <button type="submit">SUBMIT</button>
            </form>
        </main>
    );
};

export default RecipeForm;