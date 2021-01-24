import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { Position, IntStatus, Intersection } from 'zbaduk-commons';
import { GobanTheme, themes } from '../themes/themes';

@Component({
  selector: 'goban',
  templateUrl: './goban.component.html',
  styleUrls: ['./goban.component.css']
})
export class GobanComponent implements OnChanges {
  @Input()
  public theme: GobanTheme = themes[0];

  public offsetX = 20;
  public offsetY = 20;
  public cellWidth = 31;
  public cellHeight = 31;
  public strokeWidth = 1;
  public stoneRadius = 14;
  public boardSize = 19;
  public fontSize = 13;
  public fullWidth = 20 * 2 + 31 * 18;
  public fullHeight = this.fullWidth;

  @Input()
  public animateKeypoints = true;

  @Input()
  public position: Position = null;

  @Input()
  public keyPoints: Intersection[] = [];

  @Input()
  public lastMove: Intersection = null;

  public currentViewBoxArray: number[];

  ngOnChanges(changes: SimpleChanges) {
    if (this.position != null) {
      this.boardSize = this.position.size;
    }
    if (changes.themes != null) {
      this.changeDetectorRef.markForCheck();
    }
  }

  public set resolution(value: number) {
    this.offsetX = value * 20 / 31;
    this.offsetY = value * 20 / 31;
    this.cellWidth = value;
    this.cellHeight = value;
    this.strokeWidth = value * 1 / 31;
    this.stoneRadius = value * 14 / 31;
    this.fontSize = value * 13 / 31;

    // zoom related settings.
    this.fullWidth = this.offsetX * 2 + this.cellWidth * (this.boardSize - 1);
    this.fullHeight = this.offsetY * 2 + this.cellHeight * (this.boardSize - 1);

    // destroy current zoom.
    this.currentViewBoxArray = [0, 0, this.fullWidth, this.fullHeight];
  }

  @Output('gobanClick')
  private gobanClickEmitter: EventEmitter<Intersection> = new EventEmitter<Intersection>();

  @Input()
  public moveNumber: number;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  get items(): any[] {
    return new Array(this.boardSize);
  }

  public onClick(event: MouseEvent): void {
    const intersection = this.getClickedIntersection(event);

    // notify the outside-world about this click.
    this.gobanClickEmitter.emit(intersection);
  }

  public getClickedIntersection(event: MouseEvent): Intersection {
    const offsetX = 0;
    const offsetY = 0;

    const x = Math.round((event.offsetX + offsetX - this.offsetX) / this.cellWidth);
    const y = Math.round((event.offsetY + offsetY - this.offsetY) / this.cellHeight);
    return Intersection.getIntersection(x, y, this.position.size);
  }

  public get stoneIntersections(): any[] {
    const position = this.position;

    const result = [];
    for (let x = 0; x < position.size; x++) {
      for (let y = 0; y < position.size; y++) {
        const status: IntStatus = position.getStatus(x, y);
        if (status <= 0) {
          continue;
        }

        const svgColor = status === IntStatus.BLACK ? 'black' : 'white';
        result.push({ x, y, svgColor });
      }
    }
    return result;
  }

  public onResized(event: ResizedEvent): void {
    const { newWidth, newHeight } = event;

    const factor = (((20 + 18 * 31 + 20) / 19) / 31) * this.boardSize;
    const toolbarHeight = 62;

    const resolution = Math.floor(Math.min(newWidth / factor, (newHeight - toolbarHeight) / factor));
    this.resolution = resolution < 0 ? 0 : resolution;
  }
}
