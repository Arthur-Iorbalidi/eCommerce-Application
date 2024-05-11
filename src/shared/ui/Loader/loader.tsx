import { FC } from 'react';
import LoaderSvg from '../../../assets/loader.svg';

interface LoaderProps {
  width?: number;
  height?: number;
}

const Loader: FC<LoaderProps> = ({
  width = 100,
  height = 100,
}: LoaderProps) => (
  <div>
    <img
      src={LoaderSvg}
      alt="Loader"
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  </div>
);

export default Loader;
