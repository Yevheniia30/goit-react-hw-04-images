// import PropTypes from 'prop-types';
import s from './Loader.module.css';
import { MutatingDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className={s.loader}>
      <MutatingDots
        height="100"
        width="100"
        color="#3f51b5"
        ariaLabel="loading"
      />
      ;
    </div>
  );
};

// Loader.propTypes = {};
