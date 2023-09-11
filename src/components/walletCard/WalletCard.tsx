import Styles from "./WalletCard.module.scss";

export const WalletCard = ({
  title,
  onLogin,
  href,
  isInstall,
  icon,
}: {
  title: string;
  onLogin: () => void;
  href: string;
  isInstall: boolean;
  icon?: string | undefined;
}) => {
  return (
    <div>
      {isInstall ? (
          <div className={Styles.wallet} onClick={onLogin}>
            <div className={Styles.imgBlock}>
              <img src={icon} alt="icon" />
            </div>
            <h3>{title}</h3>
          </div>
      ) : (
        <a href={href}>
          <div className={Styles.wallet}>
            <div className={Styles.imgBlock}>
              <img src={icon} alt="icon" />
            </div>
            <h3>{title}</h3>
          </div>
        </a>
      )}
    </div>
  );
};
