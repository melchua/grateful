import axios from 'axios';
// eslint-disable-next-line
export const getUserBySub = async (sub) => {
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_NODE_SERVER}/api/users/${sub}`,
      {
        id: sub,
      },
    );
    return resp.data;
  } catch (err) {
    // eslint-disable-next-line
    console.error("err", err);
  }
  return null;
};

export const addUserBySub = (sub) => {
  try {
    axios
      .post(`${process.env.NEXT_PUBLIC_NODE_SERVER}/api/users/`, null, {
        params: { sub },
      })
      .then(() => {});
  } catch (err) {
    // eslint-disable-next-line
    console.error("err", err);
  }
};

export const updateUserById = (id, phoneNumber) => {
  try {
    axios.put(`${process.env.NEXT_PUBLIC_NODE_SERVER}/api/users/${id}`, {
      phoneNumber,
    });
  } catch (err) {
    // eslint-disable-next-line
    console.log("err", err);
  }
};
