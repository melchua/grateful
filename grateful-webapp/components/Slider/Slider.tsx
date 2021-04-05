import React, { useState } from 'react';

import styles from '../../styles/Slider.module.css';

type PropType = {
  locked: boolean;
};

const Slider = ({ locked }: PropType) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    if (!locked) {
      setChecked(!checked);
    }
  };

  return (
    <label className={styles.switch} htmlFor="smsCheckbox">
      <input
        id="smsCheckbox"
        type="checkbox"
        checked={checked}
        onChange={handleCheck}
      />
      <span className={styles.slider} />
    </label>
  );
};

export default Slider;
