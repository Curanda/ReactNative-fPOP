import { atom } from "jotai";

export const isPhoneValidAtom = atom(false);
export const isCodeValidAtom = atom(false);
export const phoneNumberAtom = atom("");
export const codeAtom = atom("");
export const isSetCreateUserAtom = atom(false);
export const isLoggedInAtom = atom(false);
export const isDarkModeAtom = atom(false);
export const preferencesAtom = atom<string[]>([]);
export const isDefaultCategoriesFetchedAtom = atom(false);
export const validUserAtom = atom<User | null>(null);
export const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export const phoneRegex = /^(\d{3,5}[-\.\s]?\d{4})$/;
export const nameRegex =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
export const dummyUser = atom<Users>({
  "001234567890": {
    id: 1234567890,
    name: "John Doe",
    email: "john@doe.com",
    phone: "001234567890",
    password: "password",
    chosenDefaultPreferences: ["action", "adventure", "comedy"],
    userDefinedPreferences: null,
    starredMovies: ["The Dark Knight", "Inception", "The Matrix"],
    profilePicture: null,
    birthday: "1990-01-01T00:00:00",
    gender: null,
    favoriteDirectors: null,
    favoriteActors: null,
    religion: null,
    countryOfBirth: null,
    countryOfResidence: null,
    politicalOrientation: null,
    sexualOrientation: null,
    firstLanguage: "english",
    secondLanguage: null,
    favoriteAnimal: null,
  },
});

export const newUserAtom = atom<User | null>(null);

export const defaultPreferencesAtom = atom<string[]>([
  "action",
  "adventure",
  "comedy",
  "crime",
  "drama",
  "fantasy",
  "horror",
  "mystery",
  "romance",
  "sci-fi",
  "thriller",
  "western",
  "animation",
  "family",
  "music",
  "documentary",
  "tv movie",
  "war",
  "history",
  "musical",
  "sport",
  "biography",
  "reality",
  "kids",
  "adult",
]);

export const userPreferencesAtom = atom<string[]>([]);
export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  chosenDefaultPreferences: string[];
  userDefinedPreferences: string[] | null;
  starredMovies: string[];
  profilePicture: string | null;
  birthday: string;
  gender: string | null;
  favoriteDirectors: string[] | null;
  favoriteActors: string[] | null;
  religion: string | null;
  countryOfBirth: string | null;
  countryOfResidence: string | null;
  politicalOrientation: string | null;
  sexualOrientation: string | null;
  firstLanguage: string;
  secondLanguage: string | null;
  favoriteAnimal: string | null;
};

export type Users = {
  [key: string]: User;
};

export const setUserDetailsAtom = atom(null, (get, set, newUser: User) => {
  const users = get(dummyUser);
  users[newUser.phone] = newUser;
  set(dummyUser, users);
});

export const fetchUserByIdAtom = atom(null, async (get, set, id: string) => {
  try {
    const res = await fetch(`http://localhost:5013/api/User/${Number(id)}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    set(validUserAtom, data);
    console.log(data);
    return true;
  } catch (error) {
    console.error("Error fetching user:", error);
    return false;
  }
});

export const fetchDefaultCategoriesAtom = atom(null, async (get, set) => {
  const res = await fetch(`http://localhost:5013/api/DefaultCategory`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  const categories = data.map((category: any) => category.name);
  set(defaultPreferencesAtom, categories);
  set(isDefaultCategoriesFetchedAtom, true);
});
