import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LeaveFeedback } from '../shared/leaveFeedback';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalSettings } from '../global';
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
    
    feedbackUrl = GlobalSettings.baseUrl + "/api/Feedback";

    constructor(private http: HttpClient) { }

    public getFeedbacks(): Observable<Feedback[]>{
      return this.http.get<Feedback[]>(this.feedbackUrl);
    }

    addFeedback(leaveFeedback: LeaveFeedback): Observable<LeaveFeedback> {
      console.log('in addFeedback mrthod');
      
        return this.http.post<LeaveFeedback>(this.feedbackUrl, leaveFeedback)
          .pipe(
            catchError(this.handleError)
          );
      }

      handleError(error: any) {

        let errorMessage = '';
     
        if (error.error instanceof ErrorEvent) {
     
          // client-side error
        
          errorMessage = `Error: ${error.error.message} `;
     
        } else {
     
          // server-side error
     
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     
        }
     
        window.alert(errorMessage);
     
        return throwError(errorMessage);
     
      }
}