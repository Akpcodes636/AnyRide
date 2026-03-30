"use client";
import { useState, useRef, ReactNode, ChangeEvent, Dispatch, SetStateAction, DragEvent } from "react";
import ModalLayout from "./ModalLayout";
import { useTripModal } from "@/store/Modals";

// ── step indicator ────────────────────────────────────────────────────────────
interface StepIndicatorProps {
  step: string;
  title: string;
  subtitle: string;
}

interface AddVehicleProps {
  onVehicleSubmit?: () => void;
}

// ── field components ──────────────────────────────────────────────────────────
interface FieldProps {
  label: string;
  children: ReactNode;
}

// ── icons ────────────────────────────────────────────────────────────────────
function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UploadCloudIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M10.667 21.333S6.667 21.333 6.667 17.333c0-3.2 2.4-5.333 5.333-5.333.267 0 .533 0 .8.053C13.6 9.6 16 8 18.667 8c3.733 0 6.666 2.933 6.666 6.667 0 .266 0 .533-.053.8C27.2 16 28 17.6 28 19.333c0 2.934-2.4 4-4 4" stroke="#1B2B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.333 20L16 16.667 12.667 20M16 16.667V26.667" stroke="#1B2B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M11.667 2.5H5a1.667 1.667 0 00-1.667 1.667v11.666A1.667 1.667 0 005 17.5h10a1.667 1.667 0 001.667-1.667V8.333L11.667 2.5z" stroke="#1B2B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.667 2.5v5.833h5.833" stroke="#1B2B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="#22c55e" strokeWidth="1.5" />
      <path d="M5 8l2 2 4-4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReviewIcon() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <div
        className="absolute w-[88px] h-[88px] rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, #FBBF24 0%, transparent 70%)" }}
      />
      {/* Inner circle */}
      <div
        className="w-[64px] h-[64px] rounded-full flex items-center justify-center"
        style={{ background: "#FEF3C7", border: "2px solid #F59E0B" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="1.5" />
          <path d="M12 8v4M12 16h.01" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}


function StepIndicator({ step, title, subtitle }: StepIndicatorProps) {
  return (
    <div className="flex bg-[#F5F5F7] items-center gap-3 rounded-xl px-4 py-3 mb-6">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
        style={{ background: "#FFFFFF", color: "#333333" }}
      >
        {step}
      </div>
      <div>
        <p className="text-[16px] font-semibold text-black leading-[120%]">{title}</p>
        <p className="text-[10px] font-light text-[#545454] leading-[120%]">{subtitle}</p>
      </div>
    </div>
  );
}



function Field({ label, children }: FieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-[12PX] font-medium text-[#02093A] mb-1">{label}</label>
      {children}
    </div>
  );
}

interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function TextInput({ placeholder, value, onChange }: TextInputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full h-[42px] border border-gray-200 rounded-lg px-3 py-2.5 text-[10px] text-gray-800 placeholder-[#8B8EA4] outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
    />
  );
}

interface SelectInputProps {
  placeholder: string;
  options: string[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function SelectInput({ placeholder, options, value, onChange }: SelectInputProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 appearance-none outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition bg-white"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <ChevronIcon />
      </span>
    </div>
  );
}

// ── upload zone ───────────────────────────────────────────────────────────────
interface UploadZoneProps {
  label: string;
  files: File[];
  onFiles: Dispatch<SetStateAction<File[]>>;
}

function UploadZone({ label, files, onFiles }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<Record<string, number>>({});

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const addFiles = (newFiles: File[]) => {
    onFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach((f) => {
      let pct = 0;
      const id = f.name + f.size;
      const iv = setInterval(() => {
        pct += Math.random() * 30;
        if (pct >= 100) {
          pct = 100;
          clearInterval(iv);
        }
        setProgress((p) => ({ ...p, [id]: Math.round(pct) }));
      }, 200);
    });
  };

  const removeFile = (index: number) => {
    onFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-5">
      <label className="block text-[12px] font-medium text-[#02093A] mb-2">{label}</label>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-8 border-[#F5F5F7] bg-white rounded-xl p-5 flex flex-col items-center justify-center gap-1 cursor-pointer transition ${
          dragging ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-gray-50"
        }`}
      >
        <UploadCloudIcon />
        <p className="text-[16px] font-medium text-gray-600 mt-1 leading-[120%] tacking-[-2%]">Drag and drop files here</p>
        <p className="text-[10px] text-gray-400">Upload only PNG, PDF, JPEG and DOCX format</p>
        <button
          type="button"
          className="mt-1 text-[11px] font-medium underline"
          style={{ color: "#1B2B6B" }}
          onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
        >
          Or Browse File
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          accept=".png,.pdf,.jpg,.jpeg,.docx"
          onChange={(e) => addFiles(Array.from(e.target.files ?? []))}
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-2 space-y-2">
          {files.map((f, i) => {
            const id = f.name + f.size;
            const pct = progress[id] ?? 0;
            const done = pct >= 100;
            return (
              <div key={i} className="flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-3 py-2 shadow-sm">
                <FileIcon />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-700 truncate">{f.name}</p>
                  {!done ? (
                    <div className="mt-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-200"
                        style={{ width: `${pct}%`, background: "#1B2B6B" }}
                      />
                    </div>
                  ) : (
                    <p className="text-[10px] text-gray-400">{(f.size / 1024).toFixed(0)} KB · Uploaded</p>
                  )}
                </div>
                {done ? (
                  <CheckCircleIcon />
                ) : (
                  <span className="text-[10px] text-gray-400 w-8 text-right">{pct}%</span>
                )}
                <button
                  onClick={() => removeFile(i)}
                  className="text-gray-300 hover:text-red-400 transition ml-1"
                >
                  <XIcon />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────
const YEARS = Array.from({ length: 30 }, (_, i) => String(2025 - i));
const CAPACITIES = ["Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];

export default function AddVehicle({ onVehicleSubmit }: AddVehicleProps) {
  const { modal, closeModal } = useTripModal();

  // step 1 state
  const [make, setMake] = useState("");
  const [year, setYear] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");

  // step 2 state
  const [carPhotos, setCarPhotos] = useState<File[]>([]);
  const [licenseFiles, setLicenseFiles] = useState<File[]>([]);
  const [insuranceFiles, setInsuranceFiles] = useState<File[]>([]);

  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const step1Valid = make.trim() && year && plate.trim() && capacity;
  const step2Valid = carPhotos.length > 0 && licenseFiles.length > 0 && insuranceFiles.length > 0;

  const handleNext = () => {
    if (step1Valid) setStep(2);
  };

  const handleSubmit = () => {
    if (!step2Valid) return;
    // TODO: submit logic
    setShowSuccess(true);
    onVehicleSubmit?.();
  };

  const handleClose = () => {
    closeModal();
    setStep(1);
    setShowSuccess(false);
    setMake(""); setYear(""); setPlate(""); setCapacity("");
    setCarPhotos([]); setLicenseFiles([]); setInsuranceFiles([]);
  };

  return (
    <ModalLayout
      isOpen={modal === "addVehicle"}
      onClose={handleClose}
      className="relative max-h-[90vh] max-w-[525px] w-full"
    >
      <div className="px-[101px] py-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[25px] text-[#333333] leading-[120%] tracking-[-4%] font-bold">Add New Vehicle</h3>
        </div>

        {/* Step indicator */}
        {step === 1 ? (
          <StepIndicator step="1/2" title="Vehicle Details" subtitle="Enter vehicle details." />
        ) : (
          <StepIndicator step="2/2" title="Upload Documents" subtitle="Input your car documents." />
        )}

        {/* ── Step 1 ── */}
        {step === 1 && (
          <div>
            <Field label="Car Make & Model">
              <TextInput
                placeholder="Enter vehicle details."
                value={make}
                onChange={(e) => setMake(e.target.value)}
              />
            </Field>

            <Field label="Year of Manufacture">
              <SelectInput
                placeholder="Enter your year of manufacture."
                options={YEARS}
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Field>

            <Field label="Plate Number">
              <TextInput
                placeholder="Enter your car plate number."
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
              />
            </Field>

            <Field label="Seating Capacity">
              <SelectInput
                placeholder="Enter seating capacity."
                options={CAPACITIES}
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </Field>

            <button
              onClick={handleNext}
              disabled={!step1Valid}
              className="w-full mt-2 py-3 rounded-xl text-sm font-semibold transition"
              style={{
                background: step1Valid ? "#1B2B6B" : "#d1d5db",
                color: "#fff",
                cursor: step1Valid ? "pointer" : "not-allowed",
              }}
            >
              Add New Vehicle
            </button>
          </div>
        )}

        {/* ── Step 2 ── */}
        {step === 2 && !showSuccess && (
          <div>
            <UploadZone
              label="Upload Car Photos (Front, Back, Side, Interior)"
              files={carPhotos}
              onFiles={setCarPhotos}
            />
            <UploadZone
              label="Upload Vehicle License (Front and Back)"
              files={licenseFiles}
              onFiles={setLicenseFiles}
            />
            <UploadZone
              label="Upload Insurance document"
              files={insuranceFiles}
              onFiles={setInsuranceFiles}
            />

            <button
              onClick={handleSubmit}
              disabled={!step2Valid}
              className="w-full mt-2 py-3 rounded-xl text-sm font-semibold transition"
              style={{
                background: step2Valid ? "#1B2B6B" : "#d1d5db",
                color: "#fff",
                cursor: step2Valid ? "pointer" : "not-allowed",
              }}
            >
              Submit for Review
            </button>
          </div>
        )}
      </div>
    </ModalLayout>
  );
}