import React, { useState } from "react";

const CategoryForm = ({ onSubmit }) => {
    const [currentCategory, setCurrentCategory] = useState("");

    // will set the redux category to currentCategory via the function sent in the props from CategoryModal
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(currentCategory);
    };

    //will set the user's input as a local state
    const handleChange = (e) => {
        setCurrentCategory(e.target.value);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="h-1/2 w-full flex justify-center items-center gap-5"
        >
            <input
                placeholder="type your category"
                value={currentCategory}
                onChange={handleChange}
                className="h-fit w-1/3 p-4 rounded-xl text-black"
            />
            <button
                type="submit"
                className="bg-customBlue text-slate-100 w-fit text-3xl m-5 px-12 py-3 rounded-xl hover:bg-opacity-60"
            >
                search
            </button>
        </form>
    );
};

export default CategoryForm;
