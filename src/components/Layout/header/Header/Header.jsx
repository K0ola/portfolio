import s from './Header.module.scss';

import SwitchTheme from '../SwitchTheme/SwitchTheme';

function Header() {
    return (
        <div className={s.header}>
            <h2>Arthur</h2>
            <div>
                <SwitchTheme />
            </div>
        </div>
    )

}

export default Header;