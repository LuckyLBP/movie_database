/***** _SIDEBAR.ts *****/

import { api_key, fetchDataFromApi } from "./fetchApi";

export function createSidebar(): void {
  // Assuming genreList's type based on usage
  const genreList: Record<string, string> = {};

  fetchDataFromApi(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`, ({ genres }: { genres: Array<{ id: string, name: string }> }) => {
    genres.forEach(genre => {
      genreList[genre.id] = genre.name;
    });
    genreLink();
  });

  const sidebarInner = document.createElement("div");
  sidebarInner.classList.add("sidebar-inner");
  sidebarInner.innerHTML = `
    <div class="sidebar-list">
    
      <p class="title">Genre</p>
    
    </div>
    
    <div class="sidebar-list">
    
      <p class="title">Language</p>
    
      <a href="./movie-list.html" menu-close class="sidebar-link"
        onclick='getMovieList("with_original_language=en", "English")'>English</a>
    
      <a href="./movie-list.html" menu-close class="sidebar-link"
        onclick='getMovieList("with_original_language=se", "Swedish")'>Swedish</a>
    
    </div>
    <div class="sidebar-footer">
    <p class="copyright"> Made by <a href="https://github.com/LuckyLBP">LuckyLBP</a></p>
      <img src="assets/img/tmdb-logo.png" width="130" height="17" alt="the movie database logo">
    </div>
    </div>
  `;

  const genreLink = function (): void {
    Object.entries(genreList).forEach(([genreId, genreName]) => {

      const link = document.createElement("a");
      link.classList.add("sidebar-link");
      link.href = "./movie-list.html";
      link.setAttribute("menu-close", "");
      link.setAttribute("onclick", `getMovieList("with_genres=${genreId}", "${genreName}")`);
      link.textContent = genreName;
      sidebarInner.querySelector(".sidebar-list")?.appendChild(link);

    });

    const sidebar = document.querySelector("[sidebar]") as HTMLElement;
    sidebar.appendChild(sidebarInner);
    toggleSidebar(sidebar);
  };

  const toggleSidebar = function (sidebarElement: HTMLElement): void {
    const sidebarBtn = document.querySelector("[menu-btn]") as HTMLElement;
    const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
    const sidebarClose = document.querySelectorAll("[menu-close]");
    const overlay = document.querySelector("[overlay]") as HTMLElement;

    addEventOnElements(sidebarTogglers, "click", () => {
      sidebarElement.classList.toggle("active");
      sidebarBtn.classList.toggle("active");
      overlay.classList.toggle("active");
    });

    addEventOnElements(sidebarClose, "click", () => {
      sidebarElement.classList.remove("active");
      sidebarBtn.classList.remove("active");
      overlay.classList.remove("active");
    });
  };

  // Assuming addEventOnElements is defined elsewhere
  // You need to define or import this function
  function addEventOnElements(elements: NodeListOf<Element>, eventType: string, callback: EventListenerOrEventListenerObject): void {
    elements.forEach(element => {
      element.addEventListener(eventType, callback);
    });
  }
}
