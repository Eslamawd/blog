import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createCategory } from '../../redux/apiCalls/categoryApiCall';

const AddCategory = () => {

    const dispoatch = useDispatch()

    const [title, setTitle] = useState("")

    // form submit hundle

    const formSubmitHundler = (e) => {
        e.preventDefault()

        if (title.trim() === "") return toast.error("pleasse create new category")

       dispoatch(createCategory({ title }));
       setTitle("");
    };

    return (
        <div className="add-category">
            <h6 className="add-category-title"> Add Category</h6>
            <form onSubmit={formSubmitHundler}>
                <div className="add-category-form-group">
                    <label htmlFor="title">Category Title</label>
                    <input 
                        type="text"
                        id="title"
                        placeholder="Enter Category title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <button className="add-category-btn" type="submit">
                    Add
                </button>

            </form>
        </div>
    );
};

export default AddCategory;