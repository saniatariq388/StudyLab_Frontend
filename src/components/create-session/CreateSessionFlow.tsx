"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { extractTextFromImage } from "../../lib/ocr";
import { createStudySession, generateFlashcards } from "../../services/studySessionService";
import { uploadImages } from "../../services/uploadService"; // FIX: naya import
import UploadDropzone from "./UploadDropzone";
import UploadedPagesPanel from "./UploadedPagesPanel";
import ExtractionConfigForm from "./ExtractionConfigForm";

interface StagedFile {
  id: string;
  file: File;
}

export default function CreateSessionFlow() {
  const [files, setFiles] = useState<StagedFile[]>([]);
  const [pastedText, setPastedText] = useState<string>("");
  const [sessionName, setSessionName] = useState(
    `Study Session — ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
  );
  const [density, setDensity] = useState<"core" | "detailed">("core");
  const [status, setStatus] = useState<"idle" | "ocr" | "uploading" | "generating" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleFilesAdded = (newFiles: FileList) => {
    const staged = Array.from(newFiles).map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
    }));
    setFiles((prev) => [...prev, ...staged]);
  };
  const handleTextPasted = (text: string) => {
    setPastedText(text);
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleGenerate = async () => {
    if (files.length === 0 && !pastedText.trim()) {
      setErrorMsg("Please upload at least one page or paste some text.");
      return;
    }

    setErrorMsg("");
    try {
      const session = await createStudySession({ name: sessionName });

      let combinedText = pastedText.trim();
      let uploadedImageIds: number[] = []; // FIX: yahan image IDs collect karenge

      if (files.length > 0) {
        setStatus("ocr");
        for (const staged of files) {
          const text = await extractTextFromImage(staged.file);
          combinedText += "\n\n" + text;
        }

        // FIX: OCR ke baad, asal image files ko Strapi par upload karo
        setStatus("uploading");
        uploadedImageIds = await uploadImages(files.map((f) => f.file));
      }

      if (!combinedText.trim()) {
        throw new Error("Could not extract any text from the uploaded pages.");
      }

      setStatus("generating");
      await generateFlashcards({
        extractedText: combinedText,
        studySessionId: session.documentId,
        density,
        imageIds: uploadedImageIds, // FIX: backend ko bhej rahe hain
      });

      router.push(`/review-cards?sessionId=${session.documentId}`);
    } catch (err: any) {
      setStatus("error");
      const rawMessage = err?.message || "";
      const isModelOverloaded =
        rawMessage.includes("503") ||
        rawMessage.toLowerCase().includes("high demand") ||
        rawMessage.toLowerCase().includes("currently experiencing");

      setErrorMsg(
        isModelOverloaded
          ? "The AI model is currently busy. Please wait a few seconds and click Try Again."
          : rawMessage || "Something went wrong."
      );
    }
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        <UploadDropzone onFilesAdded={handleFilesAdded} onTextPasted={handleTextPasted} />
        <ExtractionConfigForm
          sessionName={sessionName}
          onSessionNameChange={setSessionName}
          density={density}
          onDensityChange={setDensity}
        />
      </div>
      <div className="col-span-1 space-y-6">
        <UploadedPagesPanel files={files} onRemove={handleRemoveFile} />

        {pastedText && (
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="mb-1 text-xs font-medium text-gray-500">Pasted Text</p>
            <p className="line-clamp-3 text-sm text-gray-700">{pastedText}</p>
          </div>
        )}

        {errorMsg && (
          <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{errorMsg}</div>
        )}

        <button
          onClick={handleGenerate}
          disabled={status === "ocr" || status === "uploading" || status === "generating"}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {status === "ocr" && "Reading pages..."}
          {status === "uploading" && "Uploading images..."}
          {status === "generating" && "Generating flashcards with AI..."}
          {status === "idle" && "✨ Generate Flashcards with AI"}
          {status === "error" && "Try Again"}
        </button>
      </div>
    </div>
  );
}