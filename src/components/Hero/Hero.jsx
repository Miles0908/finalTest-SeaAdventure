import styles from "./Hero.module.scss";
import hero from "../../assets/hero.jpeg";
const Hero = () => {
  return (
    <div className={styles.Hero__Wrapper}>
      <img className={styles.Hero__Img} src={hero} alt="hero" />
      <div className={styles.Hero__Text}>
        <h3>Lorem ipsum dolor sit amet.</h3>
      </div>
    </div>
  );
};

export default Hero;
