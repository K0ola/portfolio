import React, { useState, useRef } from 'react';
import './ProjectsPage.css';

function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalStyle, setModalStyle] = useState({});
  const cardRef = useRef({});

  const projects = [
    {
      id: 1,
      title: "DataViz",
      description: "Projet étudiant - Visualisation statistiques des Oscars depuis 1927",
      imageUrl: "./assets/imgs/projects/dataviz_illu.jpg",
      links: [
        { label: "GitHub", url: "https://github.com/BinroLeCrab/Oscars-DataViz" },
        { label: "Visiter le projet", url: "https://dataviz.com/" }
      ],
      technologies: ["JavaScript", "D3.js", "HTML5", "CSS"],
      date: "2021-01-01"
    },
    {
      id: 2,
      title: "K0la's Game",
      description: "Projet étudiant - Jeu | tour par tour| de stratégie en ligne",
      imageUrl: "./assets/imgs/projects/dataviz_illu.jpg",
      links: [
        { label: "GitHub", url: "https://github.com/user/DataViz" },
        { label: "Visiter le projet", url: "https://dataviz.com/" }
      ],
      technologies: ["PHP", "JavaScript", "ThreeJS", "HTML5", "CSS", "MySQL"],
      date: "2021-01-01"
    },
    {
      id: 3,
      title: "ENT",
      description: "Projet étudiant - Plateforme de gestion des notes | emploi du temps | documents",
      imageUrl: "./assets/imgs/projects/dataviz_illu.jpg",
      links: [
        { label: "GitHub", url: "https://github.com/K0ola/ENT" },
        { label: "Visiter le projet", url: "" }
      ],
      technologies: ["PHP", "CSS", "HTML5", "JavaScript", "MySQL"],
      date: "2022-02-01"
    },
    {
      id: 4,
      title: "Augma | ResaWeb",
      description: "Projet étudiant - Site de réservation de katana en ligne",
      imageUrl: "./assets/imgs/projects/dataviz_illu.jpg",
      links: [
        { label: "GitHub", url: "https://github.com/K0ola/ResaWeb---Augma" },
        { label: "Visiter le projet", url: "" }
      ],
      technologies: ["PHP", "JavaScript", "CSS", "HTML5", "MySQL"],
      date: "2022-05-15"
    },
    {
      id: 5,
      title: "Portrait Chinois",
      description: "Projet étudiant - Site web de portrait chinois interactif",
      imageUrl: "./assets/imgs/projects/dataviz_illu.jpg",
      links: [
        { label: "GitHub", url: "https://github.com/K0ola/portrait-chinois" },
        { label: "Visiter le projet", url: "" }
      ],
      technologies: ["JavaScript", "CSS", "HTML5"],
      date: "2022-02-01"
    },
    {
      id: 6,
      title: "Portfolio",
      description: "Projet personnel - Site web portfolio",
      imageUrl: "./assets/imgs/projects/dataviz_illu.jpg",
      links: [
        { label: "GitHub", url: "https://github.com/K0ola/portfolio" },
        { label: "Visiter le projet", url: "https://arthur-zachary.dev" }
      ],
      technologies: ["React", "CSS", "ThreeJs", "HTML5", "JavaScript"],
      date: "2022-02-01"
    },
    {
      id: 7,
      title: "Hangman",
      description: "Projet étudiant - Jeu du pendu en ligne",
      imageUrl: "./assets/imgs/projects/dataviz_illu.jpg",
      links: [
        { label: "GitHub", url: "https://github.com/K0ola/Hangman" },
        { label: "Visiter le projet", url: "https://hangman.arthur-zachary.dev/" }
      ],
      technologies: ["React", "CSS", "HTML5", "JavaScript"],
      date: "2022-02-01"
    },
    {
      id: 8,
      title: "Todoom | Forum en PHP MVC",
      description: "Projet étudiant - Forum en PHP MVC",
      imageUrl: "./assets/imgs/projects/dataviz_illu.jpg",
      links: [
        { label: "GitHub", url: "" },
        { label: "Visiter le projet", url: "https://todoom.eu" }
      ],
      technologies: ["PHP", "CSS", "HTML5", "JavaScript", "MySQL"],
      date: "2022-02-01"
    },
  ];
  
  const getModalStyle = () => ({
    position: 'fixed',
    top: '100vh',
    left: '50%',
    width: '50vw',
    height: '70vh',
    transform: 'translate(-50%, 0)',
    borderRadius: '10px',
    transition: 'all 0.3s ease',
    zIndex: 1000,
    opacity: 0,
  });
  
  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    setModalStyle(getModalStyle());
  
    setTimeout(() => {
      setModalStyle(currentStyle => ({
        ...currentStyle,
        top: '50vh',
        transform: 'translate(-50%, -50%)',
        opacity: 1,
      }));
    }, 10);
  };
  
  const closeModal = () => {
    setModalStyle(currentStyle => ({
      ...currentStyle,
      top: '100vh',
      opacity: 0,
    }));
  
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedProject(null);
      setModalStyle({});
    }, 300);
  };
  
  return (
    <section id='projects'>
      <header>
        <h1>My Projects</h1>
      </header>
      <div className="wrapper">
        {projects.map(project => (
          <div
            className="card"
            key={project.id}
            onClick={() => {
              const cardRect = cardRef.current[project.id].getBoundingClientRect();
              openModal(project, cardRect);
            }}
            ref={el => cardRef.current[project.id] = el}
          >
            <div className="poster">
              <img src={project.imageUrl} alt={project.title} />
            </div>
            <div className="details">
              <h2>{project.title}</h2>
              <p className="desc">{project.description}</p>
              <div className="tags">
                {project.technologies.map((tech, index) => (
                  <span className="tag" key={`${tech}-${index}`}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedProject && (
        <div className={`modal ${isModalOpen ? 'open' : ''}`} style={modalStyle}>
          <div className="modal-content">
            <button onClick={closeModal} className='close'>x</button>
            <img src={selectedProject.imageUrl} alt={selectedProject.title} className="modal-img" />
            <h2>{selectedProject.title}</h2>
            <p>{selectedProject.description}</p>
            <div className="modal-tags">
              {selectedProject.technologies.map((tech, index) => (
                <span className="tag" key={`${tech}-${index}`}>{tech}</span>
              ))}
            </div>
            <div className="modal-links">
              {selectedProject.links.map(link => (
                <a key={link.url} href={link.url} target="_blank">{link.label}</a>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* <div className='crea_project'>
        <img src='./assets/imgs/projects/dataviz_illu.jpg' alt='crea_project'/>
        <div className='crea_project_contenu'>
          <h2>Podcast Horreur</h2>
          <p>Projet étudiant - Podcast de sensibilisation au harcelement scolaire</p>
          <video controls>
            <source src='./assets/videos/podcast_horreur.mp4' type='video/mp4' />
          </video>
      </div>
      </div> */}
    </section>
  );
}

export default ProjectsPage;
