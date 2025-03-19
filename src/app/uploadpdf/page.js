"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function PdfUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).filter(file => file.type === "application/pdf");
    if (files.length > 0) {
      setSelectedFiles(files);
      setShowModal(true);
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #f8fafc, #e0e7ff);
        }

        .upload-box {
          border: 2px dashed #3b82f6;
          width: 60%;
          max-width: 500px;
          height: 280px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: #ffffff;
          cursor: pointer;
          padding: 30px;
          box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          transition: all 0.3s ease-in-out;
        }

        .upload-box:hover {
          transform: scale(1.03);
          border-color: #2563eb;
        }

        .input-file {
          display: none;
        }

        .button {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          padding: 14px 24px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 20px;
          transition: all 0.3s ease;
        }

        .button:hover {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          transform: translateY(-2px);
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
        }

        .text {
          color: #1f2937;
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 5px;
        }

        .small-text {
          color: #6b7280;
          font-size: 14px;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 5;
        }

        .modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 30px;
  width: 350px; /* Increase the width */
  max-width: 90%;
  border-radius: 12px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 10;
}


        .modal-text {
          color: black;
          font-size: 16px;
          font-weight: bold;
        }

        .modal-button {
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          margin: 10px;
          transition: all 0.3s;
        }

        .modal-button.yes {
          background: black;
          color: white;
        }

        .modal-button.no {
          background: white;
          color: black;
          border: 1px solid black;
        }

        .modal-button:hover {
          opacity: 0.8;
        }
      `}</style>

      <div className="container">
        <div className="upload-box" onClick={triggerFileSelect}>
          <p className="text">Drag & Drop your PDF files here</p>
          <p className="small-text">or</p>
          <input
            type="file"
            accept="application/pdf"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="input-file"
          />
          <button className="button">Select PDFs</button>
        </div>

        {showModal && (
          <>
            <div className="overlay" onClick={() => setShowModal(false)}></div>
            <div className="modal">
              <p className="modal-text">⚠️ {selectedFiles.length} PDFs uploaded...</p>
              <p className="modal-text">Continue?</p>
              <button className="modal-button no" onClick={() => setShowModal(false)}>No</button>
              <button className="modal-button yes" onClick={() => router.push("/next-page")}>Yes</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


