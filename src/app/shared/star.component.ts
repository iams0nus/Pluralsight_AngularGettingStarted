import { Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector:  'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
  @Input()
  rating: number;
  starWidth: number;
  @Output()
  notify: EventEmitter<string> = new EventEmitter<string>();

  onClick() {
    this.notify.emit(`The rating was clicked: ${this.rating}`);
  }
  ngOnChanges(): void {
    this.starWidth = this.rating * 75 / 5;
  }
}
