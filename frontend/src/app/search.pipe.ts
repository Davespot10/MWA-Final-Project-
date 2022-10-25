import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchText',
})
export class SearchPipe implements PipeTransform {
  transform(list: any[], searchItems: string): any {
    if (searchItems === '') {
      return list;
    }
    const items = [];
    for (const item of list) {
      if (
        item['postType'].toLowerCase() === searchItems.toLowerCase() ||
        item['itemType'].toLowerCase() === searchItems.toLowerCase() ||
        item['description'].toLowerCase() === searchItems.toLowerCase()
      ) {
        items.push(item);
      }
    }
    return items;
  }
}
