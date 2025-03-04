import { useState, useEffect } from 'react';
import * as recipeService from '../../services/recipeService';
const CommentForm = (props) => {
    const [formData, setFormData] = useState({ text: '', rating: '' });
    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleAddComment(formData)
        setFormData({ text: '', rating: '' });
    };
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="text-input">Your comment:</label>
            <textarea
                id="text-input"
                name="text"
                value={formData.text}
                onChange={handleChange}
                required
                type="text"
            />
            <label> Rating: </label>
            <input type='text'
                name="rating"
                id="rating-input"
                value={formData.rating}
                onChange={handleChange}
            ></input>
            <button type="submit">SUBMIT COMMENT</button>
        </form>
    );
};
export default CommentForm;