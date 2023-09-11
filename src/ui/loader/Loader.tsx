import Styles from "./Loader.module.scss"
export const Loader = () => {
  return (
    <div className={Styles.screen}>
    <div className={Styles.spinner}></div>
  </div>
  )
}
