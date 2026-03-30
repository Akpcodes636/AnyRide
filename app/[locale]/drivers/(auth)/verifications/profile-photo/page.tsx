"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Stage = "preview" | "countdown" | "captured" | "success";

export default function VerifyProfilePhotoPage() {
   const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [stage, setStage] = useState<Stage>("preview");
  const [countdown, setCountdown] = useState(3);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  // ✅ Start camera (kept for reuse like "Try again")
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 618, height: 519 },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraError(false); // ✅ reset error if retry works
    } catch {
      setCameraError(true);
    }
  }, []);

  // ✅ Stop camera
  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  // ✅ FIXED: no direct dependency on startCamera
  useEffect(() => {
    let isMounted = true;

    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 618, height: 519 },
        });

        if (!isMounted) return;

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        if (isMounted) setCameraError(true);
      }
    };

    initCamera();

    return () => {
      isMounted = false;
      stopCamera();
    };
  }, [stopCamera]);

  // Capture photo
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);

    const image = canvas.toDataURL("image/png");

    setCapturedImage(image);
    setFlash(true);

    setTimeout(() => setFlash(false), 300);

    stopCamera();
    setStage("captured");
  }, [stopCamera]);

  // Countdown logic
  const handleTakeSelfie = () => {
    setStage("countdown");
    setCountdown(3);

    let count = 3;

    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);

      if (count === 0) {
        clearInterval(interval);
        capturePhoto();
      }
    }, 1000);
  };

  // Retake
  const handleRetake = () => {
    setCapturedImage(null);
    setStage("preview");
    startCamera(); // ✅ safe here (user-triggered)
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="container mx-auto py-[60px] px-4">
        <h2 className="font-extrabold text-[#02093A] mb-1">
          Verify Profile Photo
        </h2>
        <p className="text-[16px] font-normal leading-[120%] text-[#02093A] mb-8">
          Take a clear selfie of yourself (guidelines shown).
        </p>

        {/* ── SUCCESS STATE ── */}
        {stage === "success" ? (
          <div className="flex flex-col gap-6">
            <div className="bg-[#F5F5F7] rounded-2xl flex flex-col items-center justify-center py-14 px-6 text-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#FEF3CD] flex items-center justify-center mb-2">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="2" />
                  <path d="M12 8v4M12 16h.01" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-[17px] font-bold text-[#0A1128] max-w-[260px]">
                Your profile photo is being submitted for review.
              </p>
              <p className="text-[13px] text-gray-500">You&apos;ll be notified once approved</p>
            </div>
            <button
              onClick={() => router.back()}
              className="w-full bg-[#010C4A] text-white font-semibold rounded-2xl py-4 text-[15px] hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          </div>

        ) : (
          <>
            {/* ── CAMERA / CAPTURE BOX ── */}
            <div className="relative w-full max-w-[618px] mx-auto h-[519px] bg-[#1a1a2e] rounded-2xl overflow-hidden">

              {/* Camera error fallback */}
              {cameraError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-2">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                  <p className="text-sm text-gray-300">Camera access denied</p>
                  <button onClick={startCamera} className="text-xs text-blue-300 underline mt-1">
                    Try again
                  </button>
                </div>
              )}

              {/* Live video */}
              {(stage === "preview" || stage === "countdown") && !cameraError && (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                />
              )}

              {/* Captured image */}
              {stage === "captured" && capturedImage && (
                <Image
                src={capturedImage}
                alt="Captured selfie"
                className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                width={500}
                height={500}
                />
              )}

              {/* Face outline guide overlay */}
              {(stage === "preview" || stage === "countdown") && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[200px] h-[260px] rounded-full border-2 border-white border-dashed opacity-40" />
                </div>
              )}

              {/* Countdown overlay */}
              {stage === "countdown" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <span className="text-white text-[96px] font-extrabold drop-shadow-lg">
                    {countdown}
                  </span>
                </div>
              )}

              {/* Flash effect */}
              {flash && (
                <div className="absolute inset-0 bg-white animate-ping opacity-80 pointer-events-none" />
              )}

              {/* Captured — Retake overlay badge */}
              {stage === "captured" && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                  Preview
                </div>
              )}
            </div>

            {/* Hidden canvas for capture */}
            <canvas ref={canvasRef} className="hidden" />

            {/* ── BUTTONS ── */}
            <div className="flex gap-3 mt-5 w-full max-w-[618px] mx-auto">
              {stage === "captured" ? (
                <>
                  <button
                    onClick={handleRetake}
                    className="flex-1 h-[48px] rounded-[12px] border border-[#010C4A] text-[#010C4A] text-[16px] font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Retake
                  </button>
                  <button
                    onClick={() => setStage("success")}
                    className="flex-1 h-[48px] rounded-[12px] text-white bg-[#010C4A] text-[16px] font-semibold hover:opacity-90 transition-opacity"
                  >
                    Continue
                  </button>
                </>
              ) : (
                <button
                  onClick={handleTakeSelfie}
                  disabled={stage === "countdown" || cameraError}
                  className="w-full h-[48px] rounded-[12px] text-white bg-[#010C4A] text-[16px] font-semibold disabled:opacity-50 hover:opacity-90 transition-opacity"
                >
                  {stage === "countdown" ? `Taking photo in ${countdown}...` : "Take selfie"}
                </button>
              )}
            </div>

            {/* Guidelines note */}
            <p className="mt-5 text-[11px] text-gray-500 leading-[140%] bg-[#F6E6E6] p-3 rounded-[8px] max-w-[618px] w-full mx-auto">
              <span className="font-semibold text-[#A20602]">Guidelines: </span>
              Ensure your face is well-lit, centered, and clearly visible. Remove glasses or hats.
              Look directly at the camera with a neutral expression. Make sure the background is plain and uncluttered.
            </p>
          </>
        )}
      </div>
    </div>
  );
}