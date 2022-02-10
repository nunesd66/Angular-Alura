import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'ap-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
  
  @Output() onTyping: EventEmitter<string> = new EventEmitter<string>();
  @Input() value: string = '';
  debounce: Subject<string> = new Subject<string>();

  ngOnInit(): void {
    this.debounce
    .pipe(debounceTime(1000))
    .subscribe(f => this.onTyping.emit(f));
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  onKeyUp(target : any) {
    if(target instanceof EventTarget) {
      const element = target as HTMLInputElement;
      this.debounce.next(element.value);
    }
  }

}