"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Folder } from "lucide-react";

type UploadedFile = {
  name: string;
  size: string;
  progress: number;
  done: boolean;
};

type Stage = "upload" | "uploading" | "success";

export default function NationalIdPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [stage, setStage] = useState<Stage>("upload");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragging, setDragging] = useState(false);

  const formatSize = (bytes: number) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(0)}KB`
      : `${(bytes / (1024 * 1024)).toFixed(1)}MB`;

  const simulateUpload = (selected: File[]) => {
    const initial = selected.map((f) => ({
      name: f.name,
      size: formatSize(f.size),
      progress: 0,
      done: false,
    }));
    setFiles(initial);
    setStage("uploading");

    initial.forEach((_, i) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === i
              ? {
                  ...f,
                  progress: Math.min(progress, 100),
                  done: progress >= 100,
                }
              : f,
          ),
        );
      }, 200);
    });
  };

  const handleFiles = (selected: FileList | null) => {
    if (!selected || selected.length === 0) return;
    simulateUpload(Array.from(selected));
  };

  const allDone = files.length > 0 && files.every((f) => f.done);

  return (
    <div className="min-h-screen bg-white font-sans px-4 pt-[60px] pb-20 container mx-auto">
      <h2 className="font-extrabold text-[#0A1128] mb-8">
        National ID/Passport
      </h2>

      {/* ── SUCCESS STATE ── */}
      {stage === "success" ? (
        <div className="flex flex-col gap-6">
          <div className="bg-[#F5F5F7] w-full max-w-[618px] mx-auto rounded-2xl flex flex-col items-center justify-center py-14 px-6 text-center gap-3">
            {/* Info icon */}
            <div className="w-14 h-14 rounded-full bg-[#FEF3CD] flex items-center justify-center mb-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#F59E0B"
                  strokeWidth="2"
                />
                <path
                  d="M12 8v4M12 16h.01"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-[25px] text-center font-bold text-[#0A1128] leading-[120%] tracking-[-4%] max-w-[394px] mx-auto">
              Your driving license is being submitted for review.
            </p>
            <p className="text-[13px] text-gray-500">
              You&apos;ll be notified once approved
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="w-full max-w-[448px] cursor-pointer mx-auto bg-[#0A1128] text-white font-semibold rounded-2xl py-4 text-[15px] hover:opacity-90 transition-opacity"
          >
            Done
          </button>
        </div>
      ) : (
        /* ── UPLOAD STATE ── */
        <>
          <p className="text-[18px] text-[#545454] mb-2 text-center leading-[120%] tracking-[-2%]">
            Upload License Photo (front & back)
          </p>
          <div className="w-full max-w-[618px] mx-auto rounded-2xl overflow-hidden border-8 border-[#F5F5F7]">
            {/* Drop zone */}
            <div
              className={`flex flex-col items-center justify-center gap-2 py-10 px-6 min-h-[216px] text-center transition-colors ${
                dragging ? "bg-blue-50" : "bg-white"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                handleFiles(e.dataTransfer.files);
              }}
            >
              {/* Cloud icon */}
              <div className="w-12 h-12 bg-[#0A1128] rounded-full flex items-center justify-center mb-2">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 16V8M12 8l-3 3M12 8l3 3"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 17a4 4 0 0 0-4-4H6a4 4 0 1 0 0 8h10"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <p className="text-[18px] font-normal text-[#000000]">
                Drag and drop files here
              </p>
              <p className="text-[14px] font-normal text-[#6B7280]">
                Upload only files in PDF, DOC and DOCX format
              </p>

              <button
                onClick={() => inputRef.current?.click()}
                className="text-[14px] leading-[140%] font-medium text-[#010C4A] underline mt-1 hover:opacity-80"
              >
                Or Choose a file
              </button>
              <input
                ref={inputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            {/* File progress rows */}
            {files.length > 0 && (
              <div className="flex flex-col gap-2 px-4 pt-2 pb-3 bg-white">
                {files.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-[#F5F5F7] rounded-xl px-3 py-2.5"
                  >
                    {/* File thumbnail */}
                    <div className="w-9 h-9 bg-blue-200 rounded-lg shrink-0 flex items-center justify-center">
                      {/* <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="2"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg> */}

                      <Folder
                        className="text-[#59CAFC]"
                        size={28}
                        fill="#0074A8"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[12px] font-medium text-[#0A1128] truncate">
                          {file.name}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600 ml-2 shrink-0">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M15 9l-6 6M9 9l6 6" />
                          </svg>
                        </button>
                      </div>

                      {/* Progress bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-[#0A1128] h-1 rounded-full transition-all duration-200"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-gray-400 shrink-0">
                          {file.size} •{" "}
                          {file.done ? "Uploaded" : "Uploading..."}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Submit button */}
          </div>
          <div className="px-4 pb-4 pt-[24px] bg-white w-full max-w-[618px] mx-auto">
            <button
              disabled={!allDone}
              onClick={() => setStage("success")}
              className={`w-full  mx-auto py-3.5 rounded-xl font-semibold text-[15px] transition-all ${
                allDone
                  ? "bg-[#0A1128] text-white hover:opacity-90"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>
        </>
      )}

      {/* Note */}
      {stage !== "success" && (
        <p className="mt-6 text-[10px] text-gray-400 leading-[140%] bg-[#F6E6E6] p-2 rounded-[8px] max-w-[616px] w-full mx-auto">
          <span className="font-semibold text-[#A20602]">Note:</span> Driver was
          punctual, polite, and the car was very clean. Smooth and safe driving
          the whole way. Really appreciated the professionalism and friendly
          conversation. Would definitely ride again.
        </p>
      )}
    </div>
  );
}
