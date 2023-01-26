import styles from './styles.module.scss'

export function StarsRating({ rating, size }) {
  return (
    <div className={styles.form__item}>
      {/* <div className={styles.form__label}>Рейтинг</div> */}
      <div className={styles.rating} style={size && { fontSize: `${size}` }}>
        <div className={styles.rating__body}>
          <div className={styles.rating__active} style={{ width: `${rating / 0.05}%` }} />
          {/* Для выбора оценки */}
          {/* <div className={styles.rating__items}>
            <input type="radio" className={styles.rating__item} value="1" name="rating" />
            <input type="radio" className={styles.rating__item} value="2" name="rating" />
            <input type="radio" className={styles.rating__item} value="3" name="rating" />
            <input type="radio" className={styles.rating__item} value="4" name="rating" />
            <input type="radio" className={styles.rating__item} value="5" name="rating" />
          </div> */}
        </div>
        <div className={styles.rating__value}>{rating}</div>
      </div>
    </div>
  )
}
