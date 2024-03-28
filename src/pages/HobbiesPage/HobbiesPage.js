import './HobbiesPage.css';



function HobbiesPage() {
  return (
    <section id='hobbies'>
            <header>
            <h1>My Hobbies</h1>
        </header>
        <div className='hobbie_div' id='video_game'>
          <h2>Video Games</h2>
        </div>
        <div className='hobbie_div' id='movie'>
          <h2>Movies</h2>
        </div>
        <div className='hobbie_div' id='music'>
          <h2>Music</h2>
        </div>
        <div className='hobbie_div' id='manga'>
          <h2>Manga</h2>
        </div>
        <div className='hobbie_div' id='development'>
          <h2>development</h2>
        </div>
        <div className='hobbie_div' id='climbing'>
          <h2>Climbing</h2>
        </div>

    </section>
  );
}

export default HobbiesPage;