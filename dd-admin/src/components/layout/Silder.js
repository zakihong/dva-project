import React from 'react';
import Menus from './Menus';
import styles from './layout.less';
import logo from 'assets/rrs.png';
function Silder() {
  return (
    <aside className={styles.silder}>
      <div className={styles.logo}>
        <img src={logo} alt="" />
      </div>
      {Menus()}
    </aside>
  );
}

Silder.propTypes = {};

export default Silder;
