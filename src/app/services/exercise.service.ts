import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateExercise, Exercise, ExerciseSearchParams, UpdateExercise } from '../models';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://api.atlas-powerlifting.com/exercises';

  findMany(params: ExerciseSearchParams): Observable<Exercise[]> {
    let httpParams = new HttpParams()
      .set('skip', ((params.page - 1) * params.limit).toString())
      .set('take', params.limit.toString());

    if (params.query) {
      httpParams = httpParams.set('query', params.query);
    }

    return this.http.get<Exercise[]>(this.apiUrl, { params: httpParams });
  }

  findOne(id: string): Observable<Exercise> {
    return this.http.get<Exercise>(this.apiUrl + `/${id}`);
  }

  create(exercise: CreateExercise): Observable<Exercise> {
    return this.http.post<Exercise>(this.apiUrl, exercise);
  }

  update(id: string, exercise: UpdateExercise): Observable<Exercise> {
    return this.http.patch<Exercise>(this.apiUrl + `/${id}`, exercise);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + `/${id}`);
  }
}
