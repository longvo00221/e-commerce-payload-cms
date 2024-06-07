import React from 'react'
import styles from './index.module.scss'
const Loader = () => {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-black/30 z-[99999999]">
      <span className={styles.loader}></span>
    </div>
  )
}
export default Loader
