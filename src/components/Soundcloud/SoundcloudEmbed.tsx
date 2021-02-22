import React, { useEffect, useState } from 'react';

interface ISoundCloud {
  url: string;
}
const SoundcloudEmbed: React.FC<ISoundCloud> = ({ url }) => {
  // Get the SoundCloud URL
  const [iFrame, setiFrame] = useState({ html: '' });

  // Get the JSON data of song details with embed code from SoundCloud oEmbed
  useEffect(() => {
    fetch(
      `https://soundcloud.com/oembed?format=json&url=${url}&iframe=true&show_comments=false&maxheight=120`,
      {
        method: 'POST',
      },
    )
      .then((response) => {
        try {
          return response;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
          return error;
        }
      })

      .then((response) => response.json())
      .then((body) => {
        setiFrame(body);
      });
  }, [url]);

  const oEmbed = iFrame.html;
  return (
    <div className="column is-two-fifths m-lg">
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: oEmbed }}
      />
    </div>
  );
};

export { SoundcloudEmbed };
