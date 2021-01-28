import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { Position, IntStatus, Intersection } from 'zbaduk-commons';
import { GobanTheme, randomTheme } from '../../data/themes/themes';

@Component({
  selector: 'goban',
  templateUrl: './goban.component.html',
  styleUrls: ['./goban.component.css']
})
export class GobanComponent implements OnChanges, OnInit {
  @Input()
  public theme: GobanTheme = randomTheme();

  public arrowColor = 'blue';
  public blockedColor = 'red';
  public arrowLength = 0.6;

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
  public showLibertyArrows = true;

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
      this.fullWidth = this.offsetX * 2 + this.cellWidth * (this.boardSize - 1);
      this.fullHeight = this.offsetY * 2 + this.cellHeight * (this.boardSize - 1);
    }
    if (changes.themes != null) {
      this.changeDetectorRef.markForCheck();
    }
  }

  ngOnInit() {
    const { innerWidth, innerHeight } = window;
    this.resizeToPx(innerWidth, innerHeight);
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
    if (this.position == null) return null;

    const offsetX = 0;
    const offsetY = 0;

    const x = Math.round((event.offsetX + offsetX - this.offsetX) / this.cellWidth);
    const y = Math.round((event.offsetY + offsetY - this.offsetY) / this.cellHeight);
    return Intersection.getIntersection(x, y, this.position.size);
  }

  public get stoneIntersections(): any[] {
    if (this.position == null) return [];
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
    console.log(event);

    const factor = (((20 + 18 * 31 + 20) / 19) / 31) * this.boardSize;
    const toolbarHeight = 62;

    const resolution = Math.floor(Math.min(newWidth / factor, (newHeight - toolbarHeight) / factor));
    this.resolution = resolution < 0 ? 0 : resolution;
  }

  public onResizedAngular10(event): void {
    const newWidth = event.target.innerWidth || event.target['defaultView'].innerWidth;
    const newHeight = event.target.innerHeight || event.target['defaultView'].innerHeight;

    this.resizeToPx(newWidth, newHeight);
  }

  private resizeToPx(newWidth, newHeight) {
    const factor = (((20 + 18 * 31 + 20) / 19) / 31) * this.boardSize;
    const toolbarHeight = 120;

    const resolution = Math.floor(Math.min(newWidth / factor, (newHeight - toolbarHeight) / factor));
    this.resolution = resolution < 0 ? 0 : resolution;
  }

  public isEmpty(x: number, y: number): boolean {
    return this.position.getStatus(x, y) <= 0;
  }

  public isOpponent(x: number, y: number): boolean {
    return this.position.getStatus(x, y) === IntStatus.BLACK;
  }

  public getArrow(x: number, y: number): string {
    if (this.isEmpty(x, y)) return "url(#libertyArrow)";
    if (this.isOpponent(x, y)) return "url(#blockedArrow)";
    return null;
  }

  public getArrowLineColor(x: number, y: number): string {
    if (this.isEmpty(x, y)) return this.arrowColor;
    if (this.isOpponent(x, y)) return this.blockedColor;
    return this.arrowColor;
  }

  public get4Directions(centerX, centerY): ArrowInfo[] {

    // the 4 arrows to draw
    const fourDirections = [];
    if (centerX < this.boardSize-1) fourDirections.push([centerX+1, centerY]);
    if (centerY < this.boardSize-1) fourDirections.push([centerX, centerY+1]);
    if (centerX > 0) fourDirections.push([centerX-1, centerY]);
    if (centerY > 0) fourDirections.push([centerX, centerY-1]);

    return fourDirections.map(([x, y]) => {
      return {
        x1: this.offsetX + centerX * this.cellWidth,
        y1: this.offsetY + centerY * this.cellHeight,
        x2: this.offsetX + (centerX + (x - centerX) * this.arrowLength) * this.cellWidth,
        y2: this.offsetY + (centerY + (y - centerY) * this.arrowLength) * this.cellHeight,
        stroke: this.getArrowLineColor(x, y),
        strokeWidth: this.strokeWidth * 2,
        markerEnd: this.getArrow(x, y)
      }
    })
  }
}

interface ArrowInfo {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  stroke: string,
  strokeWidth: number
  markerEnd: string,
}
