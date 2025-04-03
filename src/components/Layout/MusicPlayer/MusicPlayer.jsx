import s from './MusicPlayer.module.scss';

function MusicPlayer() {
    return (
        <div className={s.musicPlayer}>
            <div className={s.musicPlayer__cover}>

            </div>
            <div className={s.musicPlayer__info}>
                <h4 className={s.musicPlayer__title}>Title</h4>
                <p className={s.musicPlayer__artist}>Artist</p>
            </div>
        </div>
    );
    }

export default MusicPlayer;