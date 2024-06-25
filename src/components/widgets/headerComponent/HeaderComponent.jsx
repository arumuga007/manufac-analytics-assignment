import styles from './HeaderComponent.module.css';

const HeaderComponent = ({headerText}) => {
    return (
        <div className={styles['header']}>
            {headerText}
        </div>
    )
}

export default HeaderComponent;