import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { Intersection, IntStatus, Position } from 'zbaduk-commons';

@Component({
  selector: 'theme-preview',
  templateUrl: './theme-preview.component.html',
  styleUrls: ['./theme-preview.component.scss']
})
export class ThemePreviewComponent implements OnInit {
  public position: Position;
  public keyPoints: Intersection[];

  constructor(private configuration: ConfigurationService) { }

  public get animateKeyPoints() { return this.configuration.animateKeypoints; }

  public get showLibertyArrows() { return this.configuration.showLibertyArrows; }

  public get theme() { return this.configuration.theme; }

  private createChallenge() {
    const size = 3;
    this.position = new Position(size, 0);

    this.position = this.position.play(Intersection.getIntersection(1, 1, size), IntStatus.WHITE);
    this.position = this.position.play(Intersection.getIntersection(2, 1, size), IntStatus.BLACK);
    this.position = this.position.play(Intersection.getIntersection(1, 2, size), IntStatus.BLACK);

    // calculate keypoints
    this.keyPoints = this.findKeyPoints();
  }

  private findKeyPoints(): Intersection[] {
    const keypoints = [];
    const { size } = this.position;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const status = this.position.getStatus(i, j);
        if (status !== IntStatus.EMPTY) {
          continue;
        }

        // collect neighbours
        const intersection = Intersection.getIntersection(i, j, size);
        const neighbours = intersection.getNeighbours(size);

        // is any of these killable ?
        let hit = false;
        for (const n of neighbours) {
          const status2 = this.position.getStatus(n.x, n.y);
          if (status2 === IntStatus.WHITE) {
            hit = true;
            break;
          }
        }

        if (hit) {
          keypoints.push(intersection);
        }
      }
    }

    return keypoints;
  }

  ngOnInit() {
    this.createChallenge();
  }
}

