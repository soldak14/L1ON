import Style from "./Banner.module.scss";
import featured from "../../images/banner/featured.png";
import { Button } from "../../ui/button/Button";

export const Banner = () => {
  return (
    <div className={Style.banner}>
      <div className={Style.content}>
        <img src={featured} alt="featured" />
        <h1 className={Style.title}>Finney | $FINN</h1>
        <h3 className={Style.text}>$FINN backed by 420 Finney’s that have been inscribed on Bitcoin </h3>
        <Button>Minting</Button>
      </div>
    </div>
  );
};
