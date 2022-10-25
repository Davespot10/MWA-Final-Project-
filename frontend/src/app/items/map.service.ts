import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemLocation } from './location';
@Injectable({
  providedIn: 'root',
})
export class MapService {
  location = {
    Point: 'USA',
    coordinates: [41.018, -91.9688],
  } as ItemLocation;
  private messageSource: BehaviorSubject<ItemLocation> =
    new BehaviorSubject<ItemLocation>(this.location);
  currentLocation = this.messageSource.asObservable();

  constructor() {}
  changeLocation(location:ItemLocation){
    this.messageSource.next(location)
  }
}
