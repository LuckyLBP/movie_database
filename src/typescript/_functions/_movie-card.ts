/***** MOVIE-CARD.ts *****/

import { api_image_url } from './fetchApi'

type Movie = {
    poster_path: string,
    title: string,
    vote_average: number,
    release_date: string,
    id: number
}

export function createMovieCard(movie: Movie): HTMLElement {
    const { poster_path, title, vote_average, release_date, id } = movie;
    
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
  
    movieCard.innerHTML = `
      <figure class="poster-box card-banner">
        <img src="${api_image_url}w342${poster_path}" alt="${title}" class="img-cover" loading="lazy">
      </figure>
      
      <h4 class="title">${title}</h4>
      
      <div class="meta-list">
        <div class="meta-item">
          <img src="./assets/images/star.png" width="20" height="20" loading="lazy" alt="rating">
          <span class="span">${vote_average.toFixed(1)}</span>
        </div>
        <div class="card-badge">${release_date.split("-")[0]}</div>
      </div>
      
      <a href="./detail.html" class="card-btn" title="${title}" onclick="getMovieDetail(${id})"></a>
    `;

    return movieCard;
}

