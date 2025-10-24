import { Component, inject, resource, signal } from '@angular/core';
import {
  ChevronLeft,
  ChevronRight,
  LucideAngularModule,
  Search,
  LoaderCircle,
  Dumbbell,
} from 'lucide-angular';
import { ExerciseService } from '../../../services/exercise.service';
import { Debounce } from '../../../directives/debounce';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-exercises',
  imports: [LucideAngularModule, Debounce],
  templateUrl: './exercises.component.html',
})
export class ExercisesComponent {
  private exerciseService = inject(ExerciseService);

  public query = signal('');
  public page = signal(1);
  public limit = signal(10);

  readonly exercisesResource = resource({
    params: () => ({
      query: this.query(),
      page: this.page(),
      limit: this.limit(),
    }),
    loader: ({ params }) =>
      lastValueFrom(
        this.exerciseService.findMany({
          query: params.query,
          page: params.page,
          limit: params.limit,
        }),
      ),
    defaultValue: [],
  });

  setTake(v: number) {
    if (v !== this.limit()) {
      this.limit.set(v);
      this.page.set(1);
    }
  }

  nextPage() {
    this.page.set(this.page() + 1);
  }

  prevPage() {
    if (this.page() <= 1) {
      return;
    }

    this.page.set(this.page() - 1);
  }

  protected readonly Search = Search;
  protected readonly LoaderCircle = LoaderCircle;
  protected readonly Dumbbell = Dumbbell;
  protected readonly ChevronRight = ChevronRight;
  protected readonly ChevronLeft = ChevronLeft;
}
