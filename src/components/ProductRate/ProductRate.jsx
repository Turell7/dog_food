import { getProductRate } from '../../tools/helpers'
import styles from './styles.module.scss'

export function ProductRate({ product }) {
  const rate = getProductRate(product) / 0.05

  return (

    <div className={styles.form__item}>
      {/* <div className={styles.form__label}>Рейтинг</div> */}
      <div className={styles.rating}>
        <div className={styles.rating__body}>
          <div className={styles.rating__active} style={{ width: `${rate}%` }} />
          {/* <div className={styles.rating__items}>
            <input type="radio" className={styles.rating__item} value="1" name="rating" />
            <input type="radio" className={styles.rating__item} value="2" name="rating" />
            <input type="radio" className={styles.rating__item} value="3" name="rating" />
            <input type="radio" className={styles.rating__item} value="4" name="rating" />
            <input type="radio" className={styles.rating__item} value="5" name="rating" />
          </div> */}
        </div>
        <div className={styles.rating__value}>{getProductRate(product)}</div>
      </div>
    </div>
  )
}
