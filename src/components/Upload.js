import React, { useState } from "react";

function Upload() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData is required when sending files
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", image);

    try {
      const response = await fetch(
        "http://localhost:5000/api/uploadImageWithFile",
        {
          method: "POST",
          body: formData, // don't stringify, let browser set Content-Type
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setImageUrl(`http://localhost:5000${data.imageUrl}`); // Set the image URL from the response
        setName("");
        setEmail("");
        setImage(null);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage(`Submission failed: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Upload User with Image</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Name field */}
        <label htmlFor="name-input">Name:</label>
        <input
          id="name-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />

        {/* Email field */}
        <label htmlFor="email-input">Email:</label>
        <input
          id="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        {/* File input */}
        <label htmlFor="image-input">Image:</label>
        <input
          id="image-input"
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <br />

        <button type="submit">Submit</button>
      </form>

      {/* Show response message */}
      {message && <p>{message}</p>}

      {/* Display uploaded image */}
      {imageUrl && (
        <div>
          <p>{imageUrl}</p>
          <h2>Uploaded Image:</h2>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '300px' }} />
        </div>
      )}
    </div>
  );
}

export default Upload;
