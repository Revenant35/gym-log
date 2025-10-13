import {Component, computed, model} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {ExerciseLog} from '../../models';

@Component({
  selector: 'app-exercise-logging-card',
    imports: [
        IonicModule
    ],
  templateUrl: './exercise-logging-card.html',
  styleUrl: './exercise-logging-card.scss'
})
export class ExerciseLoggingCard {
  readonly log = model.required<ExerciseLog>()
  readonly isExpanded = model(false)

  readonly isCompleted = computed(() => {
    return this.log().sets.every(set => set.completed)
  })

  readonly completedSets = computed(() => {
    return this.log().sets.filter(set => set.completed).length;
  })

  readonly totalSets = computed(() => {
    return this.log().sets.length;
  });

  readonly progress = computed(() => {
    return (this.completedSets() / this.totalSets()) * 100;
  });

  readonly progressColor = computed(() => {
    return this.isCompleted() ? 'success' : 'primary';
  });

  toggleExpand() {
    this.isExpanded.update(value => !value);
  }

  updateSetWeight(index: number, value: number): void {
    this.log.update(log => {
      log.sets[index].weight = value;
      return { ...log };
    });
  }

  updateSetReps(index: number, value: number): void {
    this.log.update(log => {
      log.sets[index].reps = value;
      return { ...log };
    });
  }

  completeSet(index: number) {
    this.log.update(log => {
      log.sets[index].completed = true;
      return { ...log };
    });

    if(this.isCompleted()) {
      this.isExpanded.set(false);
    }
  }

  uncompleteSet(index: number) {
    this.log.update(log => {
      log.sets[index].completed = false;
      return { ...log };
    });
  }

  removeSet(index: number) {
    this.log.update(log => {
      log.sets.splice(index, 1);
      return { ...log };
    });
  }

  addSet() {
    this.log.update(log => {
      log.sets.push({ reps: 0, weight: 0, completed: false });
      return { ...log };
    });
  }
}
