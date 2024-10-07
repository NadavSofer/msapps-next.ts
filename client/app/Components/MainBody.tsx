import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    incrementPage,
    decrementPage,
    fetchImages,
} from "../redux/dataSlice.js";
import ImagesContainer from "./ImagesContainer.jsx";
import Button from "./Button.jsx";
import CategoryModal from "./CategoryModal.jsx";
import Modal from "react-modal";

const MainBody = () => {
    // bringing redux things
    const storedIndex = useSelector((state) => state.data.currentIndex);
    const currentImgs = useSelector((state) => state.data.currentImgData);
    const storedCategory = useSelector((state) => state.data.currentCategory);
    const dispatch = useDispatch();

    //MARK: modal setup
    // modal setup
    const [modalIsOpen, setIsOpen] = useState(false);
    Modal.setAppElement(document.getElementById("MainBody"));

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleNext = () => {
        // will check if the user is at the end of currentImgData
        // and will fetch ahead for the preloading
        if (storedIndex === currentImgs.length - 2) {
            dispatch(
                fetchImages({
                    category: storedCategory,
                    page: storedIndex + 1,
                    numPerPage: 9,
                })
            );
        }
        dispatch(incrementPage());
    };

    //MARK: HTML start
    return (
        <div
            className="w-full h-full flex flex-col items-center justify-center"
            id="MainBody"
        >
            <div className="flex items-center gap-20">
                <Button
                    text="Prev"
                    pageNumber={storedIndex + 1}
                    action={decrementPage()}
                ></Button>
                <button
                    className="bg-customBlue text-slate-100 w-fit text-3xl m-5 px-12 py-3 rounded-xl hover:bg-opacity-60"
                    onClick={openModal}
                    style={{ transition: "ease 0.5s" }}
                >
                    Search
                </button>
                <Button
                    text="Next"
                    pageNumber={storedIndex + 1}
                    action={() => handleNext()}
                ></Button>
            </div>

            {/* MARK:modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Category Modal"
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-70 h-1/2 w-1/2 rounded-xl bg-customGrey text-slate-100 "
            >
                <CategoryModal closeModal={() => closeModal()}></CategoryModal>
            </Modal>
            <ImagesContainer></ImagesContainer>
            <p className="text-2xl text-slate-100 mt-5">{storedIndex + 1}</p>
        </div>
    );
};

export default MainBody;
