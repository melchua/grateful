import React from 'react';

import styles from '../../styles/Slider.module.css';

type PropType = {
  locked: boolean;
  checked: boolean;
  setChecked: any;
  setOther: any;
};

const Slider = ({
  locked, checked, setChecked, setOther,
}: PropType) => {
  const handleCheck = () => {
    if (!locked) {
      setChecked(!checked);
      setOther(checked);
    }
  };

  return (
    // having an input id leads to only the first slider being altered when clicking any slider
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={styles.switch}>
      <input type="checkbox" checked={checked} onChange={handleCheck} />
      <span className={styles.slider} />
    </label>
  );
};

export default Slider;
