import { AgeRating } from "./AgeRating";
import { Genre } from "./Genre";
import { Platform } from "./Platform";
import { Screenshot } from "./Screenshot";
import { Video } from "./Video";

export type Game = {
  aggregated_rating?: number;
  aggregated_rating_count?: number;
  id: number;
  name?: string;
  slug?: string;
  first_release_date?: number;
  cover?: {
    id: number;
    image_id?: string;
  };
  age_ratings?: AgeRating[];
  genres?: Genre[];
  platforms?: Platform[];
  screenshots?: Screenshot[];
  videos?: Video[];
};
