import React, { FC } from 'react';

interface CreditsProps {}

const Credits: FC<CreditsProps> = () => {
  return (
    <div>
      <ul>
        <li>
          Infographic vector created by freepik -{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            title="Freepik"
            href="https://www.freepik.com/free-photos-vectors/infographic">
            www.freepik.com
          </a>
        </li>
        <li>
          Icons made by{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.flaticon.com/authors/freepik"
            title="Freepik">
            Freepik
          </a>{' '}
          from{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.flaticon.com/"
            title="Flaticon">
            www.flaticon.com
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Credits;
