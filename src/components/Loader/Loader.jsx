import { BallTriangle } from 'react-loader-spinner';
export const Loader = () => {
  return (
    <BallTriangle
      height={100}
      width={100}
      radius={50}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
    />
  );
};
