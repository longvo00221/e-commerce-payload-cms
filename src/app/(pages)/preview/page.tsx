'use client'
import { useEffect, useState } from 'react';

const PreviewPage = () => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.cmsLivePreviewData) {
        setPage(event.data.cmsLivePreviewData);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  if (!page) {
    return <div>Loading preview...</div>;
  }

  return (
    <div>
      <header>
        <h1>{page.title}</h1>
      </header>
      <main>
        <div>{/* Render page content here */}</div>
      </main>
    </div>
  );
};

export default PreviewPage;
