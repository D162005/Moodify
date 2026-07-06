import * as faceapi from "face-api.js";

const MODEL_URL = "/models";


  export async function initialize({streamRef, videoRef, setLoading, setError}) {
    try {

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: "user"
        },
        audio: false
      });

      streamRef.current = stream;

      videoRef.current.srcObject = stream;

      videoRef.current.onloadedmetadata = async () => {
        await videoRef.current.play();

        setLoading(false);

      };

    } catch (err) {

      console.error(err);

      setError(err.message);

    }
  }

  export async function detect({videoRef, setExpression, setConfidence}) {

    if (!videoRef.current) return;

    const result = await faceapi
      .detectSingleFace(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions({
          inputSize: 320,
          scoreThreshold: 0.5
        })
      )
      .withFaceLandmarks()
      .withFaceExpressions();

    if (result) {

      const expressions = result.expressions;

      const bestExpression = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );

      setExpression(bestExpression);

      setConfidence(expressions[bestExpression]);

    } else {

      setExpression("No Face");

      setConfidence(0);

    }

    
  }