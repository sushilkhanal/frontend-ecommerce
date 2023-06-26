import React from "react";

function Home() {
  return (
    <div>
      <h1>
        Hello, welcome to my ecommerce page. We have all sorts of products for
        your everyday needs.
      </h1>
      <div className="video-container">
        <video
          autoPlay
          muted
          loop
          className="video"
          style={{
            width: "100%",
            height: "calc(100vh - 50px)",
            objectFit: "cover",
          }}
        >
          <source
            src="https://www.apple.com/105/media/in/iphone-14-pro/2023/b094f6e4-dcdb-494f-bd72-45d659126dcd/anim/hero/large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default Home;
