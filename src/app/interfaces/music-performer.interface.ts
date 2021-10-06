import {Id} from "./id.interface";

export interface MusicPerformer {
  id: Id;
  performerName: string;
  country: string;
  genre: string;
}

export enum Genre{
  ROCK, JAZZ, POP, BLUES, FOLK, COUNTRY, METAL, HEAVY_METAL, HIP_HOP, ELECTRONIC, MARIACHI
}
