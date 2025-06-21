import { User } from "@/components/GlobalStore";
import axios from "axios";
import { TrendingMovie, trendingMoviesAtom } from "@/components/GlobalStore";
import { useSetAtom } from "jotai";
import { MovieResponse, Movie } from "../types/movie";

export async function postUser(user: User) {
  const response = await axios.post(
    "http://localhost:5013/api/User/register",
    user
  );
  return response.data;
}

export async function getUser(id: number) {
  const response = await axios.get(`http://localhost:5013/api/User/${id}`);
  return response.data;
}

export async function updateUser(user: User) {
  try {
    const response = await axios.patch(
      `http://localhost:5013/api/User/${user.phone}/profile_update`,
      user
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

export async function deleteUser(id: number) {
  const response = await axios.put(`http://localhost:5013/api/User/${id}`);
  return response.data;
}

export async function getUserByPhone(phone: string) {
  const response = await axios.get(
    `http://localhost:5013/api/User/phone/${phone}`
  );
  return response.data;
}

export type DropdownOptionsType = {
  animals: string[];
  countries: string[];
  religions: string[];
  sexualOrientations: string[];
  politicalOrientations: string[];
  genders: string[];
  languages: string[];
};

export async function getDropdownOptions() {
  try {
    const animals = await axios.get(`http://localhost:5013/api/Animal`);
    const countries = await axios.get(`http://localhost:5013/api/Country`);
    const religions = await axios.get(`http://localhost:5013/api/Religion`);
    const sexualOrientations = await axios.get(
      `http://localhost:5013/api/SexualOrientation`
    );
    const politicalOrientations = await axios.get(
      `http://localhost:5013/api/PoliticalOrientation`
    );
    const genders = await axios.get(`http://localhost:5013/api/Gender`);
    const languages = await axios.get(`http://localhost:5013/api/Language`);

    return {
      animals: animals.data.map((a: any) => a.name),
      countries: countries.data.map((c: any) => c.name),
      religions: religions.data.map((r: any) => r.name),
      sexualOrientations: sexualOrientations.data.map((s: any) => s.name),
      politicalOrientations: politicalOrientations.data.map((p: any) => p.name),
      genders: genders.data.map((g: any) => g.name),
      languages: languages.data.map((l: any) => l.name),
    };
  } catch (error) {
    console.error("Error fetching dropdown options:", error);
    return {
      animals: [],
      countries: [],
      religions: [],
      sexualOrientations: [],
      politicalOrientations: [],
      genders: [],
      languages: [],
    };
  }
}

export async function getTrendingMoviesDirect(
  pageId: number
): Promise<Movie[]> {
  try {
    const response = await axios.get<MovieResponse>(
      "http://localhost:5013/api/MoviePack/getmoviesdirect",
      {
        params: { pageId },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}
