import './AboutPage.css';

function AboutPage() {

  return (
    <section id='about'>
      <header>
        <h1>About me</h1>
      </header>
      <div>
      <img src='./assets/imgs/moi.png' alt='Arthur Zachary'></img>
        <p>Je suis actuellement étudiant en deuxième année de BUT en Métiers du Multimédia et de l'Internet (<span>BUT MMI</span>) à l'Université Gustave Eiffel. De <span>nature très curieux</span>, je suis <span>sérieux</span>, <span>engagé</span> et je ne renonce jamais face aux difficultés. <span>Passionné</span> d'escalade, j'aime relever les défis. On me reconnaît comme étant <span>très ouvert</span>, <span>sociable</span>, avec une touche d'<span>humour</span> pour compléter ma personnalité.</p>
      </div>
      <h2>My Video CV</h2>
      <div id='div_video_cv'>
        <p>Vous pouvez regarder l'intégralité de mon CV vidéo réalisé dans le cadre d'un projet étudiant.</p>
        <video src='./assets/media/cv_video.mp4' alt="cv vidéo" controls></video>

      </div>
    </section>
  );
}

export default AboutPage;
