import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import ImgModal from "./ImgModal.jsx";
import { fetchImages } from "../redux/dataSlice.js";

const ImagesContainer = () => {
    // bringing redux things
    const currentImgs = useSelector((state) => state.data.currentImgData);
    const storedIndex = useSelector((state) => state.data.currentIndex);
    const storedCategory = useSelector((state) => state.data.currentCategory);
    const data = useSelector((state) => state.data);
    const dispatch = useDispatch();

    // modal setup
    const [modalIsOpen, setIsOpen] = useState(false);
    Modal.setAppElement(document.getElementById("Test"));

    // save to local state the data of a clicked image
    const [focusedImg, setFocusedImg] = useState({});

    // will fetch the first set of pictures on mount. will bring two sets to preload the second
    // this will also trigger on every category change.
    // MARK: THE fetch
    useEffect(() => {
        dispatch(
            fetchImages({
                category: storedCategory,
                page: storedIndex + 1,
                numPerPage: 18,
            })
        );
    }, [storedCategory]);

    // more modal things
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    /**
     * @description: will set the data of clicked in to local state to be sent into the ImgModal
     * @param imgData specific object our of an arr of 9. from currentImgData in store
     */
    const handleClick = (imgData) => {
        openModal();
        setFocusedImg(imgData);
    };
    // MARK: HTML start
    return (
        <div className="h-2/3 w-1/2">
            {/* will check the length of currentImgs. mostly for initial load */}
            {currentImgs.length !== 0 ? (
                <>
                    {currentImgs.loading && (
                        <div className="w-full h-full flex justify-center items-center text-slate-100 text-6xl">
                            Loading...
                        </div>
                    )}
                    {!currentImgs.loading && data.error && (
                        <div className="w-full h-full flex justify-center items-center text-slate-100 text-6xl">
                            Error: {data.error}
                        </div>
                    )}

                    {!currentImgs.loading &&
                        !data.error &&
                        data.currentImgData.length > 0 && (
                            //MARK: actual start
                            <div className="grid grid-rows-3 grid-cols-3 w-full h-full gap-2">
                                {currentImgs[storedIndex].map((img) => (
                                    <button
                                        key={img.id}
                                        onClick={() => handleClick(img)}
                                        className="border-2 transform transition-transform duration-500 hover:scale-90"
                                    >
                                        <img
                                            src={img.previewURL}
                                            className="w-full h-full"
                                            alt={img.type}
                                        ></img>
                                    </button>
                                ))}
                                {/* MARK: modal */}
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    contentLabel="Category Modal"
                                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-70 h-1/2 w-1/2 rounded-xl bg-customGrey text-slate-100"
                                >
                                    <ImgModal imgData={focusedImg}></ImgModal>
                                </Modal>
                            </div>
                        )}
                </>
            ) : (
                <p className="w-full h-full flex justify-center items-center text-slate-100 text-6xl">
                    Please pick a category
                </p>
            )}
        </div>
    );
};

export default ImagesContainer;
