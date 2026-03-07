import React, { useState, useEffect } from "react";
import { Carousel } from "antd";

const StorefrontBanner = ({ banners }) => {
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setAutoplay(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <Carousel autoplay={autoplay} dotPosition="bottom">
      {banners.map((banner) => (
        <div key={banner.id}>
          <div
            className="w-full rounded-2xl bg-gradient-to-br from-red-400 to-orange-500 overflow-hidden"
            style={{ aspectRatio: "16/9" }}
          >
            <div className="h-full flex flex-col items-center justify-center text-center text-white p-6">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">
                {banner.title}
              </h2>
              <p className="text-sm md:text-lg">{banner.description}</p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default StorefrontBanner;
