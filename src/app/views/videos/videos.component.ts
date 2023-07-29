import { Component, OnInit } from '@angular/core';

import { take } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  public videos: any;  
  public urlSafe: SafeResourceUrl ="";
  public successMessage = "";

  public totalVideos: any;
  public currentPage = 0;
  public totalPagesCount: any;
  public perPageRecord = 10;  


  constructor(private userService: UserService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getVideosData(0);    
  }

  public sanitizeVideoUrl(s:string) {    
    //return s && s.replace('watch?v=','embed/');
   return this.sanitizer.bypassSecurityTrustResourceUrl(s && s.replace('watch?v=','embed/'));
  }

  public getVideosData(pageNumber: number) {
    this.userService
      .getVideosList(pageNumber)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.totalVideos = res.data.count;  
        this.videos = res.userList;        
        console.log('AAAA' + res.status);
        let abc = Math.ceil(this.totalVideos / this.perPageRecord);
        this.totalPagesCount = Array(abc);
        this.currentPage = pageNumber;
      });
  }

  public deleteVideo(rowId: number, videoId: number) {
    if (confirm("Do you really want to delete this Video?")) {
      this.userService
      .deleteVideo(videoId)
      .pipe(take(1))
      .subscribe((res: any) => {        
        this.successMessage = "Video deleted successfully.";
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
        setTimeout(() => {
            this.successMessage = "";
        }, 1000);
        this.getVideosData(0);
      });
    }
    //this.users.splice(rowId, 1);
  }

  public changeVideoStatus(videoId: number) {alert(videoId);
    this.userService
      .changeVideoStatus(videoId)
      .pipe(take(1))
      .subscribe((res: any) => {        
        this.successMessage = "Video status changed successfully.";
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
        setTimeout(() => {
            this.successMessage = "";
        }, 1000);
        this.getVideosData(0);
      });
    
  }

}
