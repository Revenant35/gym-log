import {Component, computed, inject, resource, signal} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {ExerciseService} from '../../services/exercise-service';
import {lastValueFrom} from 'rxjs';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-exercise-screen',
  imports: [
    IonicModule,
    FormsModule
  ],
  templateUrl: './exercise-search-screen.html',
  styleUrl: './exercise-search-screen.scss'
})
export class ExerciseSearchScreen {
  private readonly exerciseService = inject(ExerciseService);

  readonly query = signal<string>('');
  readonly page = signal<number>(1);
  readonly pageSize = signal<number>(20);

  private readonly searchParams = computed<ExerciseSearchParams>(() => ({
    query: this.query(),
    page: this.page(),
    limit: this.pageSize(),
  }));

  readonly exercises = resource({
    params: () => ({
      query: this.query(),
      page: this.page(),
      limit: this.pageSize(),
    }),
    loader: ({params}) => lastValueFrom(this.exerciseService.searchExercises({
      query: params.query,
      page: params.page,
      limit: params.limit,
    })),
  })
}
