import logo from "./assets/logo.svg"
import styles from "./App.module.scss"
import Hero from "./components/Hero/Hero"
import Banner from "./components/Banner/Banner"
import CardList from "./components/CardList"
import RandomList from "./components/RandomList/RandomList"

function App() {


  return (
    <>
     <div className={styles.App}>
    <header className={styles.Header}><img className={styles.Logo} src={logo} alt="logo" /></header>
     <Hero/>
     <CardList/>
     <Banner/>
     <RandomList/>
     </div>
    </>
  )
}

export default App
