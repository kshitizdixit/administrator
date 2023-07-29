import { Injectable } from '@angular/core';
import { User } from '../domains/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { map, catchError, take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static readonly apiUrl = "http://3.137.37.164:5000/";

  constructor(private httpService: HttpClient) { }


  public getDashboardData(): any {
    return this.httpService.get(`${UserService.apiUrl}dashboard`, {}).pipe(map(res => res));
  }

  public getUsersList(pageNumber: number): any {    
    return this.httpService.get(`${UserService.apiUrl}users/listing/`+pageNumber, {}).pipe(map(res => res));    
  }

  public getVideosList(pageNumber: number): any {    
    return this.httpService.get(`${UserService.apiUrl}videoListing/`+pageNumber, {}).pipe(map(res => res));    
  }

  public getCategoriesList(pageNumber: number): any {    
    return this.httpService.get(`${UserService.apiUrl}getCategories/${pageNumber}`, {}).pipe(map(res => res));    
  }

  public changeStatus(userId: number): any {    
    return this.httpService.delete(`${UserService.apiUrl}/changeStatus/`+userId, {}).pipe(map(res => res));    
  }

  public changeVideoStatus(videoId: number): any {
    return this.httpService.delete(`${UserService.apiUrl}/videoStatus/`+videoId, {}).pipe(map(res => res));    
  }

  public changeCategoryStatus(categoryId: number): any {
    return this.httpService.delete(`${UserService.apiUrl}/categoryStatus/`+categoryId, {}).pipe(map(res => res));    
  }
  
  public deleteUser(userId: any) {
    return this.httpService.delete(`${UserService.apiUrl}delUser/`+userId, {}).pipe(map(res => res));   
  } 

  public deleteVideo(videoId: any) {
    return this.httpService.delete(`${UserService.apiUrl}delVideo/`+videoId, {}).pipe(map(res => res));   
  }

  public deleteCategory(categoryId: any) {
    return this.httpService.delete(`${UserService.apiUrl}delCategory/`+categoryId, {}).pipe(map(res => res));   
  }


  
  
  public submitUserData(userInfo: any): Observable<any> {
    return this.httpService.post(`${UserService.apiUrl}adminLogin`, { email: userInfo.email, password: userInfo.password }).pipe(
      map((data: any) => {
        console.log("======", data.token);
       
      //  const payloadContent = JSON.parse(window.atob(data.token));
      //  console.log("======", payloadContent);
        return data;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }


  public addUser(formData: any): Observable<any> {
    return this.httpService.post(`${UserService.apiUrl}addUser`, formData).pipe(
      map((data: any) => {
        console.log("Add RES======", data);
        return data;
      }),
      catchError(error => {
        console.log("Add ERROR======", error);
        return throwError(error);
      })
    );
  }

  public updateUser(formData: any): Observable<any> {
    let userData = JSON.parse(localStorage.getItem('user') || '{}'); 
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.httpService.patch(`${UserService.apiUrl}editUser/`+userData.userId, formData, httpOptions).pipe(
      map((data: any) => {
        console.log("======", data);
        return data;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  public addCategory(formData: any, categoryId: number): Observable<any> {
    const apiUrl = categoryId > 0 ? `${UserService.apiUrl}editCategoryaa/${categoryId}` : `${UserService.apiUrl}addCategory/`; 
    return this.httpService.post(apiUrl, formData).pipe(map(data => data));
  }
  
  
  

}
