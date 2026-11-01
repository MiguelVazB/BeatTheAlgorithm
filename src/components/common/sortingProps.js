import PropTypes from 'prop-types';

export const sortingProps = {
  randomNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  difficulty: PropTypes.string.isRequired,
  countDownOver: PropTypes.bool.isRequired,
  winner: PropTypes.string.isRequired,
  setWinner: PropTypes.func.isRequired,
};
export const playerProps = {
  randomNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  active: PropTypes.bool,
  setWinner: PropTypes.func.isRequired,
};
