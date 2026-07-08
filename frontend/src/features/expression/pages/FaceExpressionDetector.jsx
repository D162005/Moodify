import React, { useEffect, useRef, useState } from "react";
import { initialize,detect } from "../utils/utils";
import '../../common/styles/butt.scss'
import '../styles/detector.scss'

const moodMap = {
  happy: 'happy',
  sad: 'sad',
  surprised: 'surprised',
  angry: 'angry',
  neutral: 'neutral'
}

export default function FaceExpressionDetector({ onMoodDetected, compact = false }) {
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


  async function handleDetect() {
    await detect({
      videoRef,
      setExpression: (value) => {
        setExpression(value)

        const normalizedMood = moodMap[String(value).toLowerCase()]

        onMoodDetected?.(normalizedMood || '')
      },
      setConfidence
    })
  }

  return (
    <div className={compact ? 'detector detector--compact' : 'detector'}>

      <h2 className="detector__title">Moodify Face Expression Detector</h2>

      {loading && <h3>Loading AI Models...</h3>}

      {error && (
        <h3 className="detector__error">
          {error}
        </h3>
      )}

      <div className="detector__layout">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="detector__video"
        />

        <div className="detector__stats">
          <div className="detector__stat">
            <h5 className="detector__label">Expression</h5>

            <h4 className="detector__value detector__value--expression">
              {expression}
            </h4>
          </div>

          <div className="detector__stat">
            <h4 className="detector__label">Confidence</h4>

            <h5 className="detector__value">
              {(confidence * 100).toFixed(2)} %
            </h5>
          </div>
        </div>
      </div>

      <button onClick={handleDetect} className="butt detector__button">Detect</button>

    </div>
  );
}