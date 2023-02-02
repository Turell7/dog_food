import styles from './styles.module.scss'

export function Loader() {
  return (
    <div className="flex justify-center">
      <div className={styles.lds_ellipsis}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}
