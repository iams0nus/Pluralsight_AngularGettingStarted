import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
  @Input()// decorate the rating as input, because we are fetching it from parent component,
  // the ngOnChanges method is invoked whenever this value changes
  rating: number;
  starWidth: number;
  @Output()// decorate the notify as an output, this can be used to bind events to the parent module,
  // this notify is bound in the parent html with function
  notify: EventEmitter<string> = new EventEmitter<string>(); // initialize an event emitter that emits a string data

  // this method is invoked when the stars are clicked triggering an event emission to the parent class
  onClick() {
    this.notify.emit(`The rating was clicked: ${this.rating}`); // use the notify event emitter's emit function to emit a string,
    // caught as $event in the parent class
  }
  // invoked when any of the @input() properties are modified
  ngOnChanges(): void {
    this.starWidth = this.rating * 75 / 5;
  }
}
