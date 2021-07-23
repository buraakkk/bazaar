import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Uploader = ({ data }) => {
  const history = useHistory();
  const [selectedFiles, setSelectedFiles] = useState(null);

  const toProductPage = (id) => history.push(`/${id}`);

  const handleClick = async () => {
    const isFilled = Object.keys(data).every((key) => data[key]);
    try {
      if (!selectedFiles || !isFilled) return;

      const videoRequests = [];
      const imageRequests = [];

      for (const file of selectedFiles) {
        const formData = new FormData();

        formData.append('file', file);
        formData.append('folder', process.env.REACT_APP_UPLOAD_FOLDER);
        formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);

        const [type] = file.type.split('/');
        const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}`;

        if (type === 'video') videoRequests.push(axios.post(`${url}/video/upload`, formData));
        if (type === 'image') imageRequests.push(axios.post(`${url}/image/upload`, formData));
      }

      const videoResponses = await axios.all(videoRequests);
      const imageResponses = await axios.all(imageRequests);

      data.videos = videoResponses.map((response) => response.data.secure_url);
      data.images = imageResponses.map((response) => response.data.secure_url);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/products/create`, data);
      const { id } = response.data;

      if (id) toProductPage(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        required
        multiple
        type="file"
        className="mt-2 mb-2 "
        accept="image/*, video/*" //?? size/limit/format
        onChange={(e) => setSelectedFiles(e.target.files)}
      />
      <Button
        type="submit"
        className="w-100"
        onClick={handleClick}
        style={{ background: 'var(--color-main)' }}
      >
        Add Product
      </Button>
    </div>
  );
};

export default Uploader;
