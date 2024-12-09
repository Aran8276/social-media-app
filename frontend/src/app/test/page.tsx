"use client";

import { baseUrl, getJwtToken } from "@/components/GlobalVariables";
import axios from "axios";
import React, { useState } from "react";

export default function Page() {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photos[]", files[i]);
    }

    formData.append("content", "testing");
    formData.append("visibility", "public");

    console.log(formData);

    try {
      const response = await axios.post(`${baseUrl}/api/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getJwtToken()}`,
        },
      });
      setUploadedFiles(response.data.files); // Adjust this based on your API response
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div>
        {Array.from(files).map((file, index) => (
          <p key={index}>{file.name}</p>
        ))}
      </div>
      <div>
        {uploadedFiles.map((file, index) => (
          <p key={index}>{file.name}</p>
        ))}
      </div>
    </div>
  );
}
