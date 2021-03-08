import axios from 'axios';
// eslint-disable-next-line
export const postGratitude = (user_id, description) => {
  try {
    axios
      .post('http://localhost:7865/users/gratitudes/', { user_id, description })
      .then(() => {});
  } catch (err) {
    // eslint-disable-next-line
    console.error("err", err);
  }
};
