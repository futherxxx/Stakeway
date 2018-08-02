import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(locked: any, query: string): any {
        console.log(locked); //this shows in the console
        console.log(query); //this does not show anything in the console when typing
        if (!query) {
            return locked;
        }
        return locked.filter((lock) => {
            return lock.name.toLowerCase().match(query.toLowerCase());
        });
    }
}