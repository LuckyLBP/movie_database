/***** INDEX.ts HOMEPAGE *****/

import { createSidebar } from './_sidebar';
import { api_key, api_image_url, fetchDataFromApi, api_url } from './fetchApi';
import { createMovieCard } from './_movie-card';
import { search } from './_search';
import { addEventsOnElements } from './_searchToggle';

const pageContent = document.querySelector('[page-content]') as HTMLDivElement;

createSidebar();

// Homepage Sections

const homePageSections = [
    
    { title: 'Upcoming Movies', path: `/movie/upcoming` },
    { title: 'Trending Movies', path: `/trending/movie/weekly` },
    { title: 'Top Rated Movies', path: `/movie/top_rated` },
];

// Fetch all genres

const genreList: { [key: number]: string; asString: (genreIdList: number[]) => any } = {

    asString(genreIdList: number[]): any {
        let newGenreList: string[] = [];
        
        genreIdList.forEach((genreId: number) => {
            newGenreList.push(this[genreId]);
        });
    }
}

fetchDataFromApi(`${api_url}genre/movie/list?api_key=${api_key}`, ({ genres }) => {
    genres.forEach((genre: { id: number; name: string; }) => {
        genreList[genre.id] = genre.name;
    });

    fetchDataFromApi(`${api_url}movie/popular?api_key=${api_key}&page=1`, heroBanner);
});

const heroBanner = ({ results: movieList }: { results: any; }) => {

    const banner = document.createElement('section');
    banner.classList.add('banner');
    banner.ariaLabel = 'Popular Movies';

    banner.innerHTML = `
    <div class="banner-slider"></div>
    
    <div class="slider-control">
      <div class="control-inner"></div>
    </div>
    `;

    let controlItemIndex: number = 0;

    for (const [index, movie] of movieList.entries()) {
        
        const poster_path = movie.poster_path;
        const backdrop_path = movie.backdrop_path;
        const title = movie.title;
        const vote_average = movie.vote_average;
        const release_date = movie.release_date;
        const id = movie.id;
        const genre_ids = movie.genre_ids;
        const overview = movie.overview;

        const sliderItem = document.createElement('div');
        sliderItem.classList.add('slider-item');
        sliderItem.setAttribute('slider-item', '');

        sliderItem.innerHTML = `
        <img src="${api_image_url}w1280${backdrop_path}" alt="${title}" class="img-cover" loading=${index === 0 ? "eager" : "lazy"
      }>
      
      <div class="banner-content">
        <h2 class="heading">${title}</h2>
        <div class="meta-list">
          <div class="meta-item">${release_date?.split("-")[0] ?? "Not Released"}</div>
          <div class="meta-item card-badge">${vote_average.toFixed(1)}</div>
        </div>
      
        <p class="genre">${genreList.asString(genre_ids)}</p>
        <p class="banner-text">${overview}</p>
        <a href="./detail.html" class="btn" onclick="getMovieDetail(${id})">
          <img src="./assets/images/play_circle.png" width="24" height="24" aria-hidden="true" alt="play circle">
          <span class="span">Watch Now</span>
        </a>
      </div>
      `;

      banner.querySelector('.banner-slider')?.appendChild(sliderItem);

      const controlItem = document.createElement('button');
      controlItem.classList.add('poster-box', 'slider-item');
      controlItem.setAttribute('slider-control', `${controlItemIndex}`)

      controlItemIndex++;

      controlItem.innerHTML = `
      <img src="${api_image_url}w154${poster_path}" alt="Slide to ${title}" loading="lazy" draggable="false" class="img-cover">
      `;
      banner.querySelector('.control-inner')?.appendChild(controlItem);
    }

    pageContent.appendChild(banner);

    addHeroSlide();

    // Fetch data for homepage sections

    for (const {title, path} of homePageSections) {
        fetchDataFromApi(`${api_url}${path}?api_key=${api_key}&page=1`, createMovieList);
    }
    console.log(homePageSections);
}

// HERO SLIDER FUNCTION

const addHeroSlide = () => {
    const sliderItems = document.querySelectorAll('[slider-item]');
    const sliderControls = document.querySelectorAll('[slider-control]');

    let lastSliderItem = sliderItems[0]
    let lastSliderControl = sliderControls[0]

    const sliderStart = function(this: Element) {

        if (lastSliderItem) {
            lastSliderItem.classList.remove("active");
        }
        if (lastSliderControl) {
            lastSliderControl.classList.remove("active");
        }
    
        const sliderControlIndex = Number(this.getAttribute("slider-control"));
        const newItem = sliderItems[sliderControlIndex];
    
        if (newItem) {
            newItem.classList.add("active");
            this.classList.add("active");
    
            lastSliderItem = newItem;
            lastSliderControl = this;
        }
    };    

    addEventsOnElements(sliderControls, 'click', sliderStart);

    console.log(sliderControls);

}

const createMovieList = ({ results: movieList }: { results: any; }, title: string) => {

    const movieListElem = document.createElement('section');
    movieListElem.classList.add('movie-list');
    movieListElem.ariaLabel = `${title}`;

    movieListElem.innerHTML = `
    <div class="title-wrapper">
      <h3 class="title-large">${title}</h3>
    </div>
    
    <div class="slider-list">
      <div class="slider-inner"></div>
    </div>
    `;

    movieList.forEach((movie: any) => {
        const movieCard = createMovieCard(movie);

        movieListElem.querySelector('.slider-inner')?.appendChild(movieCard);
    })

    pageContent.appendChild(movieListElem);


}

search();


