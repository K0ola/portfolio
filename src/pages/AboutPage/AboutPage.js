import './AboutPage.css';

function AboutPage() {

  return (
    <section id='about'>
      <header>
        <h1>About me</h1>
      </header>
      <div>
      <img src='./assets/imgs/moi.png' alt='Arthur Zachary'></img>
        <p>I am currently a second-year student in a University Technical Degree in Multimedia and Internet Professions (<span>BUT MMI</span>) at <span>Gustave Eiffel University</span>. By nature <span>very curious</span>, I am <span>serious</span>, committed, and never give up in the face of <span>difficulties</span>. Passionate about climbing, I love to take on <span>challenges</span>. I am recognized as being <span>very open</span>, <span>sociable</span>, with a touch of <span>humor</span> to complete my personality.</p>
      </div>
      <h2>My Video CV</h2>
      <div id='div_video_cv'>
        <p>You can watch all of my video cv make for a student project</p>
        <video src='./assets/media/cv_video.mp4' alt="cv vidéo" controls></video>

      </div>
    </section>
  );
}

export default AboutPage;
