import { Component } from '@angular/core';

@Component({ // decorates the class as a component with the follwing parameters
  selector: 'pm-root', // the name of the directive that renders the component
  templateUrl: './app.component.html', // path to the html content
  styleUrls: ['./app.component.css'] // path to the css files, there can be multiple such files
})
export class AppComponent {// export this class so that it can be imported by other classes.
  title = 'Acme Product Management';
}
