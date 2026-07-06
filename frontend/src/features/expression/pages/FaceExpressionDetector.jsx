import React, { useEffect, useRef, useState } from "react";
import { initialize,detect } from "../utils/utils";
import '../../common/styles/butt.scss'

export default function FaceExpressionDetector() {
  const videoRef = useRef(null);

  const streamRef = useRef();

  const [loading, setLoading] = useState(true);

  const [expression, setExpression] = useState("Waiting...");

  const [confidence, setConfidence] = useState(0);

  const [error, setError] = useState("");



  useEffect(() => {
    initialize({streamRef, videoRef, setLoading, setError});

    return () => {

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "20px"
      }}
    >

      <h2>Moodify Face Expression Detector</h2>

      {loading && <h3>Loading AI Models...</h3>}

      {error && (
        <h3 style={{ color: "red" }}>
          {error}
        </h3>
      )}

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width={440}
        height={280}
        style={{
          borderRadius: "15px",
          border: "3px solid black",
          objectFit: "cover"
        }}
      />

      <div
        style={{
          width: 250,
          border: "1px solid gray",
          borderRadius: "10px",
          display:"flex",
          // flexDirection:'column',
          gap:"1rem",
          alignItems:"center",
          justifyContent:"center",
          // padding: "1px",
          textAlign: "center"
        }}
      >
        <div>
          <h5>
          Expression
        </h5>

        <h4
          style={{
            textTransform: "uppercase",
            color: "#1f8ef1"
          }}
        >
          {expression}
        </h4>
        </div>
        
        <div>
          <h4>
          Confidence
        </h4>

        <h5>
          {(confidence * 100).toFixed(2)} %
        </h5>
        </div>
        

      </div>

      <button onClick={()=>{detect({videoRef, setExpression, setConfidence})}} className="butt">detect</button>

    </div>
  );
}