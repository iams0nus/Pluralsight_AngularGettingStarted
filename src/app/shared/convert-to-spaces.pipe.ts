import { Pipe, PipeTransform } from '@angular/core';

// decorate the class as a pipe having the name convert to spaces
@Pipe({
  name: 'convertToSpaces'
})
export class ConvertToSpacesPipe implements PipeTransform {// all custom pipes must implement the PipeTransform interface
  // the PipeTransform interface's tranform method should be implemented to return the modified values
  transform(value: string, character: string): string {// the parameters can have any name and there can be any no of parameters.
    return value.replace(character, ' ');
  }
}
