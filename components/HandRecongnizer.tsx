import {
  FilesetResolver,
  HandLandmarker,
  HandLandmarkerResult,
} from "@mediapipe/tasks-vision";
import React, { useEffect, useRef } from "react";

type Props = {
  setHandResults: () => void;
};

function HandRecongnizer({ setHandResults }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    initVideoAndModel();
  }, []); // runs only once when the component mounts(page loaded)

  const initVideoAndModel = async () => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    await initVideo(videoElement);

    const handLandMarker = await initModel();

    setInterval(() => {
      const detections = handLandMarker.detectForVideo(
        videoElement,
        Date.now()
      );

      processDetection(detections, setHandResults);
    });
  };

  return (
    <div>
      <video
        className="-scale-x-1 border-2 border-stone-700 rounded-lg"
        ref={videoRef}
      ></video>
    </div>
  );
}

export default HandRecongnizer;

async function initVideo(videoElement: HTMLVideoElement) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });
  videoElement.srcObject = stream;
  videoElement.addEventListener("loadeddata", () => {
    videoElement.play();
  });
}

async function initModel() {
  const wasm = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );
  const handLandMarker = HandLandmarker.createFromOptions(wasm, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
      delegate: "GPU",
    },
    numHands: 2,
    runningMode: "VIDEO",
  });

  return handLandMarker;
}

function processDetection(
  detections: HandLandmarkerResult,
  setHandResults: () => void
) {
  console.log(detections);
}
