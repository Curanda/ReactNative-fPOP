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
    profilePicture: "https://via.placeholder.com/150",
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
