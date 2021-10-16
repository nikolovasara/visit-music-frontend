import {Genre} from "../../interfaces/music-performer.interface";

export class EventFilter{
  country: string;
  genre: Genre;
  date: Date[];
  dateCondition: string;
  price: number[];
  keyword: string;

  constructor() {
  }
}
