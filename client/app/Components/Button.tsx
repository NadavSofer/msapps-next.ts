import React from "react";
import { useSelector, useDispatch } from "react-redux";

type buttonParamsT = {
    pageNumber: number;
    text: string;
    action: (pageNumber: number) => void;
};

const Button = ({ text, pageNumber, action }:buttonParamsT) => {
    // bringing redux things
    const maxPage = useSelector((state) => state.data.lastPage);
    const dispatch = useDispatch();

    return (
        <button
            // disable the button if it's the first or last page
            disabled={
                (pageNumber === 1 && text === "Prev") ||
                (pageNumber === maxPage && text === "Next")
            }
            //the same as before, it's just the styling
            className={`bg-customBlue text-slate-100 text-3xl m-5 px-5 py-3 w-40 rounded-xl 
    ${
        (pageNumber === 1 && text === "Prev") ||
        (pageNumber === Number(maxPage) && text === "Next")
            ? "opacity-50"
            : "hover:bg-opacity-60"
    }`}
            // will dispatch the action that is sent in the props
            onClick={() => dispatch(action)}
            style={{ transition: "ease 0.5s" }}
        >
            {text}
        </button>
    );
};

export default Button;
