import axios from 'axios';
// eslint-disable-next-line
export const postGratitude = async (userId, description) => {
  try {
    const posted = await axios.post(
      `${process.env.NEXT_PUBLIC_NODE_SERVER}/api/users/gratitudes/`,
      {
        user_id: userId,
        description,
      },
    );
    return posted;
  } catch (err) {
    // eslint-disable-next-line
    console.error("err", err);
  }
};

export const getGratitudesByUserId = async (userId) => {
  try {
    const gratitudes = await axios.get(
      `${process.env.NEXT_PUBLIC_NODE_SERVER}/api/users/gratitudes/${userId}`,
    );
    return gratitudes;
  } catch (err) {
    // eslint-disable-next-line
    console.error("err", err);
  }
  return [];
};

export const deleteGratitude = async (id) => {
  try {
    const deletedGratitudes = await axios.delete(
      `${process.env.NEXT_PUBLIC_NODE_SERVER}/api/gratitudes/${id}`,
    );
    return deletedGratitudes;
  } catch (err) {
    console.error('err', err);
  }
  return [];
};
