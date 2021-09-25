import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {MusicEventService} from "../../services/music-event.service";
import {tap} from "rxjs/operators";
import {MusicEvent} from "../../interfaces/music-event.interface";

@Component({
  templateUrl:'search.page.html',
  styleUrls: ['search.page.css']
})
export class SearchPage implements OnInit{
  searchKey:string;
  searchResults: MusicEvent[];

  constructor(private route: ActivatedRoute,
              private musicEventService: MusicEventService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(routeParam=>{
      this.searchKey = this.route.snapshot.queryParamMap.get('q');
      this.findEvent()
    })
    this.searchKey = this.route.snapshot.queryParamMap.get('q') as string;
    console.log(this.searchKey);

  }

  findEvent(){
    this.musicEventService.findEvent(this.searchKey).pipe(tap(data=>{
      this.searchResults=data
      console.log(this.searchResults);
    }))
      .subscribe();
  }

}
