import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Output() public update = new EventEmitter<boolean>();
  @Input() public name: string = "";
  @Input() public quantity: number = 0;

  constructor() { }

  ngOnInit() {
  }

  public _update(isAdd) {
    this.update.emit(isAdd);
  }

}
