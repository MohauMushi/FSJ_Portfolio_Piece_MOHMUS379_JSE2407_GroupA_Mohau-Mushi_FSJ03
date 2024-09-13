"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ArrowButtons from "./ArrowButtons";

/**
 * Gallery component for displaying a carousel of images.
 * @param {Object} props - The component props.
 * @param {string[]} props.images - Array of image URLs to display in the gallery.
 * @returns {JSX.Element} A responsive image gallery with navigation controls.
 */
const Gallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    if (animation) {
      const timer = setTimeout(() => setAnimation(false), 500);
      return () => clearTimeout(timer);
    }
  }, [animation]);

  /**
   * Navigates to the next image in the gallery.
   */
  const nextImage = () => {
    if (animation) return;
    setDirection(1);
    setAnimation(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  /**
   * Navigates to the previous image in the gallery.
   */
  const prevImage = () => {
    if (animation) return;
    setDirection(-1);
    setAnimation(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    // Main container for the gallery
    <div className="relative overflow-hidden rounded-xl shadow-sm">
      {/* Container for the images */}
      <div className="w-full h-[22rem] relative">
        {/* Map through images and render each one */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-all duration-500 ease-in-out ${
              index === currentIndex
                ? "opacity-100 translate-x-0"
                : index === (currentIndex - 1 + images.length) % images.length
                  ? `opacity-0 -translate-x-full`
                  : index === (currentIndex + 1) % images.length
                    ? `opacity-0 translate-x-full`
                    : "opacity-0"
            }`}
          >
            {/* Image component with responsive sizing */}
            <Image
              src={image}
              alt={`Product image ${index + 1}`}
              width={300}
              height={300}
              className="w-full h-[20rem] block justify-center items-start object-contain rounded-lg"
            />
          </div>
        ))}
      </div>
      {/* Render navigation controls if there's more than one image */}
      {images.length > 1 && (
        <>
          {/* Arrow buttons for navigation */}
          <ArrowButtons
            onPrevClick={prevImage}
            onNextClick={nextImage}
            disabled={animation}
          />
          {/* Dot indicators for image position */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (animation) return;
                  setDirection(index > currentIndex ? 1 : -1);
                  setAnimation(true);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-teal-600 scale-125"
                    : "bg-teal-700 bg-opacity-50"
                }`}
                disabled={animation}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Gallery;
