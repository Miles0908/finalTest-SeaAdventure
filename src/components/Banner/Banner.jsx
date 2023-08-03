import styles from "./Banner.module.scss";
import banner from "../../assets/banner.jpeg";

const Banner = () => {
  return (
    <div className={styles.Banner__Wrapper}>
      <img className={styles.Banner__Img} src={banner} alt="banner" />
      <div className={styles.Banner__Text}>
        <h3>
          +20 <br />
          Destinazioni
        </h3>

        <h3>
          +15 <br />
          Imbarcazioni
        </h3>

        <h3>
          +40 <br /> Itinerari
        </h3>
      </div>
    </div>
  );
};

export default Banner;
