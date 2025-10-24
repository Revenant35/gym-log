import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CreateExercise, Exercise, ExerciseSearchParams, UpdateExercise } from '../models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/exercises`;

  findMany(params: ExerciseSearchParams): Observable<{exercises: Exercise[], count: number}> {
    let httpParams = new HttpParams()
      .set('skip', ((params.page - 1) * params.limit).toString())
      .set('take', params.limit.toString());

    if (params.query) {
      httpParams = httpParams.set('query', params.query);
    }

    return this.http.get<{data: Exercise[], count: number}>(this.apiUrl, { params: httpParams }).pipe(
      map(response => ({ exercises: response.data, count: response.count }))
    );
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
