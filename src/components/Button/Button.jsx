import PropTypes from 'prop-types';
import s from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <div className={s.btnWrapper}>
      <button className={s.btn} onClick={onClick}>
        load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
