import s from './About.module.scss';


function About() {
    return (
        <section id="about" className={s.about}>
            <div className={s.about__illu}>

            </div>

            <div className={s.about__content_1}>
            </div>
            <div className={s.about__content_2}>
                <a href="#">
                    my cv
                </a>
                <a href="#">
                    my book
                </a>
            </div>

            <div className={s.about__content_3}>
            </div>
        </section>
    );
}

export default About;