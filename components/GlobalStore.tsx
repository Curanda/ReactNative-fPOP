import { atom } from "jotai";

export const isPhoneValidAtom = atom(false);
export const isCodeValidAtom = atom(false);
export const phoneNumberAtom = atom("");
export const codeAtom = atom("");
export const isSetCreateUserAtom = atom(false);
export const isLoggedInAtom = atom(false);
export const isDarkModeAtom = atom(false);
export const preferencesAtom = atom([]);
export const emailAtom = atom("");
export const nameAtom = atom("");
export const bdayAtom = atom("");
export const dummyUser = atom({
  "001234567890": {
    id: 1,
    name: "John Doe",
    email: "john@doe.com",
    phone: "001234567890",
    password: "password",
    preferences: ["action", "adventure", "comedy"],
    starredMovies: ["The Dark Knight", "Inception", "The Matrix"],
    profilePicture:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngfind.com%2Fpngs%2Fm%2F610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png&f=1&nofb=1&ipt=d42742362f627ab50378d1c50487e256c046c11cca1ba05c36ad52cae9a59192",
    bday: "1990-01-01",
  },
});
export const defaultPreferencesAtom = atom([
  "Action",
  "Adventure",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Western",
  "Animation",
  "Family",
  "Music",
  "Documentary",
  "TV Movie",
  "War",
  "History",
  "Musical",
  "Sport",
  "Biography",
  "Reality",
  "Kids",
  "Adult",
]);

export const userPreferencesAtom = atom<string[]>([]);
