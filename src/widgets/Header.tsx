import styles from './Header.module.css'
import { Link } from 'react-router-dom';

function Header() {
    return (  
        <>
            <div className={styles["header"]}>
               <ul className={styles["header-list"]}>
                    <Link to="/"><li className={styles["header-list-element"]}>Главная</li></Link>
                    <Link to="/create"><li className={styles["header-list-element"]}>Создать карточку</li></Link>
                </ul> 
            </div>
        </>
    );
}

export default Header;