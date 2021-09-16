import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MusicEvent} from "../interfaces/music-event.interface";
import {StorageService} from "./storage.service";

@Injectable()
export class MusicEventService{
  url = 'http://localhost:9090/api/music-events';
  headers: HttpHeaders;

  constructor(private _http: HttpClient, private storageService: StorageService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(storageService.getItem('user')).token}`
    })
  }

  getAll(){
    return this._http.get<MusicEvent[]>(this.url,  {headers: this.headers})
  }

  getById(id: string){
    return this._http.get<MusicEvent>(`${this.url}/${id}`,{headers: this.headers})
  }

  createMusicEvent(eventName: string){
    //TODO
    const formData = {
      name: eventName
    }

    return this._http.post(`${this.url}`, formData, {headers: this.headers})
  }

  findAllPageable(page,size){
    const formData = {
      page: page,
      size: size
    }
    return this._http.get<any[]>(`${this.url}/pagination`, {params: formData, headers: this.headers})
  }

}
