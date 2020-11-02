import React, { FC } from 'react';
import Loader from 'react-loader-spinner';

interface CardProps {
  isLoading: boolean;
  heading: string;
  data: {
    value: number;
    newValue?: number;
  };
  classNames: {
    container: string;
    title: string;
    number: string;
    newValue?: string;
  };
}

const Card: FC<CardProps> = ({ isLoading, heading, data, classNames }) => {
  const newValue = data.newValue ?? false;

  return (
    <div className={classNames.container}>
      <span className={classNames.title}>{heading}</span>
      <span className={classNames.number}>{data.value}</span>
      {newValue ? (
        !isLoading ? (
          <span className={classNames.newValue}>+ {data.newValue}</span>
        ) : (
          <Loader type="ThreeDots" color="#f12f2d" height={25} width={25} />
        )
      ) : null}
    </div>
  );
};

export default Card;
