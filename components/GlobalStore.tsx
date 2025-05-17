import axios from "axios";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { Movie } from "../types/movie";

export const isPhoneValidAtom = atom(false);
export const isCodeValidAtom = atom(false);
export const phoneNumberAtom = atom("");
export const codeAtom = atom("");
export const isSetCreateUserAtom = atom(false);
export const isLoggedInAtom = atom(false);
export const isDarkModeAtom = atom(false);
export const preferencesAtom = atom<string[]>([]);
export const defaultCategoriesAtom = atom<string[]>([]);
export const isDefaultCategoriesFetchedAtom = atom(false);
export const validUserAtom = atom<User | null>(null);
export const isUserCreatedAtom = atom(false);
export const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export const phoneRegex = /^(\d{3,5}[-\.\s]?\d{4})$/;
export const nameRegex =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæČŠŽ∂ð ,.'-]+$/u;
// export const isTabChangeAtom = atom<number[]>([1]);

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

export const dropDownOptionsAtom = atom<{
  animals: string[];
  countries: string[];
  religions: string[];
  sexualOrientations: string[];
  politicalOrientations: string[];
  genders: string[];
  languages: string[];
}>({
  animals: [],
  countries: [],
  religions: [],
  sexualOrientations: [],
  politicalOrientations: [],
  genders: [],
  languages: [],
});

export const userPreferencesAtom = atom<string[]>([]);
export type User = {
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
  const user = get(newUserAtom);
  if (!user) return;
  set(newUserAtom, user);
});

///////////////// USER API CALLS //////////////////

export const fetchUserByIdAtom = atom(null, async (get, set, id: string) => {
  try {
    const res = await axios.get(`http://localhost:5013/api/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (res.status === 404) {
      return false;
    }
    const data = res.data;
    set(validUserAtom, data);
    console.log("User fetched successfully:", data);
    return true;
  } catch (error) {
    console.error("Error fetching user:", error);
    return false;
  }
});

// export const postUserAtom = atom(null, async (get, set, user: User) => {
//   if (!user) return;
//   console.log("User:", user);

//   const res = await fetch("http://localhost:5013/api/User", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       password: user.password,
//       chosenDefaultPreferences: user.chosenDefaultPreferences,
//       userDefinedPreferences: user.userDefinedPreferences,
//       starredMovies: user.starredMovies,
//       profilePicture: user.profilePicture,
//       birthday: user.birthday,
//       gender: user.gender,
//       favoriteDirectors: user.favoriteDirectors,
//       favoriteActors: user.favoriteActors,
//       religion: user.religion,
//       countryOfBirth: user.countryOfBirth,
//       countryOfResidence: user.countryOfResidence,
//       politicalOrientation: user.politicalOrientation,
//       sexualOrientation: user.sexualOrientation,
//       secondLanguage: user.secondLanguage,
//       favoriteAnimal: user.favoriteAnimal,
//       firstLanguage: user.firstLanguage,
//     }),
//   });

//   if (!res.ok) {
//     const errorData = await res.json().catch(() => null);
//     throw new Error(
//       `HTTP error! status: ${res.status}${
//         errorData ? ` - ${JSON.stringify(errorData)}` : ""
//       }`
//     );
//   }

//   const data = await res.json();
//   console.log("User created successfully:", data);
//   set(isUserCreatedAtom, true);
// });

// export const putUserAtom = atom(null, async (get) => {
//   const user = get(newUserAtom);
//   if (!user) return;
//   const res = await fetch(`http://localhost:5013/api/User/${user.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   });
//   if (!res.ok) {
//     throw new Error(`HTTP error! status: ${res.status}`);
//   }
//   const data = await res.json();
//   console.log(data);
// });

// export const deleteUserAtom = atom(async () => {
//   const user = useAtomValue(newUserAtom);
//   if (!user) return;
//   const res = await fetch(`http://localhost:5013/api/User/${user.id}`, {
//     method: "DELETE",
//   });
//   if (!res.ok) {
//     throw new Error(`HTTP error! status: ${res.status}`);
//   }
//   const data = await res.json();
//   console.log(data);
//   const setUserCreatedAtom = useSetAtom(isUserCreatedAtom);
//   setUserCreatedAtom(false);
//   const setNewUserAtom = useSetAtom(newUserAtom);
//   setNewUserAtom(null);
// });

///////////////// DEFAULT CATEGORIES API CALLS //////////////////

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

/////////////////// TRENDING MOVIES API CALLS //////////////////

export type TrendingMovie = Movie;

export const trendingMoviesAtom = atom<Movie[]>([]);

//////////////////
// https://image.tmdb.org/t/p/w500/FHHfHcUgGAxziP1C3lLt0q2T4s.jpg
