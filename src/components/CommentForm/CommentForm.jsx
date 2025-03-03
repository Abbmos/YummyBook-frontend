import { useState, useEffect } from 'react';
import * as recipeService from '../../services/recipeService';
const CommentForm = (props) => {
    const [formData, setFormData] = useState({ text: '' });
    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleAddComment(formData)
        setFormData({ text: '' });
    };
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="text-input">Your comment:</label>
            <textarea
                required
                type="text"
            />
            <label> Rating: </label>
            <input type='text'
                name="rating"
                id="rating-input"
                value={formData.text}
                onChange={handleChange}
            ></input>
            <button type="submit">SUBMIT COMMENT</button>
        </form>
    );
};
export default CommentForm;