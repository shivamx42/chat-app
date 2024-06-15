import React from 'react'

export default function Background({children}) {
    return (
        <div className="relative flex items-center justify-center min-h-screen">
          <div
            style={{
              backgroundImage: "url(/img.jpg)",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              zIndex: -1,
            }}
          />
          <div style={{ position: "relative", zIndex: 2 }}>
            {children}
          </div>
        </div>
      );
    };
