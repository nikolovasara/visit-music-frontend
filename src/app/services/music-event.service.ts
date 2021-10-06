import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MusicEvent} from "../interfaces/music-event.interface";
import {StorageService} from "./storage.service";
import {MusicPerformer} from "../interfaces/music-performer.interface";
import {Venue} from "../interfaces/venue.interface";
import {MusicEventForm} from "../models/forms/music-event-form.interface";
import {Id} from "../interfaces/id.interface";
import {VenueForm} from "../models/forms/venue-form.interface";
import {PerformerForm} from "../models/forms/performer-form.interface";

@Injectable()
export class MusicEventService{
  url = 'http://localhost:9090/api/music-events';
  headers: HttpHeaders;

  constructor(private _http: HttpClient, private storageService: StorageService) {
    if(this.storageService.getItem('user')){
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(this.storageService.getItem('user')).token}`
      })
    }

  }

  getAll(){
    return this._http.get<MusicEvent[]>(this.url)
  }

  getById(id: string){
    return this._http.get<MusicEvent>(`${this.url}/${id}`)
  }

  createMusicEvent(formData: MusicEventForm){
    return this._http.post(`${this.url}`, formData)
  }

  updateMusicEvent(id: string, formData:MusicEventForm){
    return this._http.patch(`${this.url}/${id}/edit`, formData, {headers: this.headers})
  }

  deleteMusicEvent(id: string){
    return this._http.delete(`${this.url}/delete/${id}`,{headers: this.headers})
  }

  findAllPageable(page,size){
    const formData = {
      page: page,
      size: size
    }
    return this._http.get<any[]>(`${this.url}/pagination`, {params: formData, headers: this.headers})
  }

  getAllMusicPerformers(){
    return this._http.get<MusicPerformer[]>('http://localhost:9090/api/music-performers',  {headers: this.headers})
  }

  getAllVenues(){
    return this._http.get<Venue[]>('http://localhost:9090/api/venues',  {headers: this.headers})
  }

  findEvent(word:string){
    return this._http.get<MusicEvent[]>(`${this.url}/search`, {params:{word:word}} );
  }

  createVenue(formData: VenueForm){
    return this._http.post(`http://localhost:9090/api/venues`, formData)
  }

  createPerformer(formData: PerformerForm){
    return this._http.post(`http://localhost:9090/api/music-performers`, formData)
  }

}
