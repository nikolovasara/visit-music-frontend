import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MusicEvent} from "../interfaces/music-event.interface";

@Injectable()
export class MusicEventService{
  url = 'http://localhost:9090/api/music-events'
  constructor(private _http: HttpClient) {}

  getAll(){
    return this._http.get<MusicEvent[]>(this.url)
  }

  getById(id: string){
    return this._http.get<MusicEvent>(`${this.url}/${id}`)
  }

  createMusicEvent(eventName: string){
    //TODO
    const formData = {
      name: eventName
    }

    return this._http.post(`${this.url}`, formData)
  }



}
