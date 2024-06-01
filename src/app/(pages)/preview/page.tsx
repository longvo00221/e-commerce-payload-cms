'use client'
import { useEffect, useState } from 'react';
import { Blocks } from '../../_components/Blocks';

const PagePreview = () => {
  const [page, setPage] = useState(null);
  console.log(page)
  useEffect(() => {
    const listener = (event) => {
      if (event.data.cmsLivePreviewData) {
        console.log(event.data.cmsLivePreviewData)
        setPage(event.data.cmsLivePreviewData);
      }
    };

    window.addEventListener('message', listener, false);

    return () => {
      window.removeEventListener('message', listener);
    };
  }, []);

  useEffect(() => {
    (opener ?? parent).postMessage('ready', '*');
  }, []);

  if (!page) return <div>Loading...</div>;

  return (
    <div>
      <header>
        <h1>{page.title}</h1>
      </header>
      <main>
        <Blocks blocks={page.content} />
      </main>
    </div>
  );
};

export default PagePreview;
