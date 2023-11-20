import { defineStore } from "pinia";
export const useStore = defineStore("rm-store", {
  state: () => ({
    data: {},
    charactersInfo: [],
    page: 1,
    oneEpisode: {},
    oneCharacter: {},
    location: {},
    pagination: 20,
  }),
  actions: {
    async fetchData() {
      const response = await fetch('https://rickandmortyapi.com/api/', {
        method: "GET",
      });
      this.data = await response.json();
    },
    async getCharacters(array) {
      const url = new URL(this.data.characters);
      const params = { page: this.page };
      url.search = new URLSearchParams(params).toString();
      const response = await fetch(url, { method: "GET" });
      const result = await response.json();
      setTimeout(() => {
        this.charactersInfo = [...this.charactersInfo, ...result.results];
      }, 1000);
      if (array) {
        for (let i = 0; i < array.length; i++) {
          const id = this.charactersInfo.filter(
            (character) => character.id === array[i].split("/").pop()
          );
          await this.getCharacter(id);
          setTimeout(() => {
            this.charactersInfo = [...this.charactersInfo, this.oneCharacter];
          }, 1000);
        }
      }
    },
    async getCharacter(id) {
      const response = await fetch(`${this.data.characters}/${id}`, {
        method: "GET",
      });
      this.oneCharacter = await response.json();
    },
    async fetchNextPage() {
      this.page++;
      await this.getCharacters();
    },

  },
});
