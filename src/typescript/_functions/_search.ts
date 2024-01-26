/***** SEARCH.ts *****/

import { api_key, fetchDataFromApi } from "./fetchApi";
import { createMovieCard } from "./_movie-card";

export function search() {
    const searchWrapper = document.querySelector('[search-wrapper]') as HTMLDivElement;
    const searchField = document.querySelector('[search-field]') as HTMLInputElement;

    const searchResultModal = document.createElement('div');
    searchResultModal.classList.add('search-modal');

    document.querySelector('main')?.appendChild(searchResultModal);

    let searchTimeout: NodeJS.Timeout;

    searchField.addEventListener('input', () => {

        if (!searchField.value) {
            searchResultModal.classList.remove('active');
            searchWrapper.classList.remove('searching');
            clearTimeout(searchTimeout);
            return;
        }

        searchWrapper.classList.add('searching');
        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(() => {
            fetchDataFromApi(`search/movie?api_key=${api_key}&query=${searchField.value}`, ({ results:movieList }) => {
                searchWrapper.classList.remove('searching');
                searchResultModal.classList.add('active');
                searchResultModal.innerHTML = '';

                searchResultModal.innerHTML = `
                                                
                <p class="label">Results for</p>

                <h1 class="heading">${searchField.value}</h1>

                <div class="movie-list">
                    <div class="grid-list"></div>
                </div>
                `;

                movieList.forEach((movie:any) => {
                    const movieCard = createMovieCard(movie);

                    searchResultModal.querySelector('.grid-list')?.appendChild(movieCard);
                });
            });
        }, 500)
    })
}