import { FC } from 'react';
import LoaderSvg from '../../../assets/images/loader.svg';

interface LoaderProps {
  width?: number;
  height?: number;
}

const Loader: FC<LoaderProps> = ({ width = 15, height = 15 }: LoaderProps) => (
  <div>
    <img
      src={LoaderSvg}
      alt="Loader"
      style={{
        width: `${width}rem`,
        height: `${height}rem`,
      }}
    />
  </div>
);

export default Loader;
