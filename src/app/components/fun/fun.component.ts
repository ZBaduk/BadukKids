import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { IntStatus, Intersection, Position } from 'zbaduk-commons';

@Component({
  selector: 'app-fun',
  templateUrl: './fun.component.html',
  styleUrls: ['./fun.component.scss']
})
export class FunComponent implements OnInit {
  public position: Position;
  public keyPoints: Intersection[];

  private toPlay = IntStatus.BLACK;
  private toKill = IntStatus.WHITE;


  constructor(private configuration: ConfigurationService) { }

  public get animateKeyPoints() { return this.configuration.animateKeypoints; }

  public get theme() { return this.configuration.theme; }

  private createChallenge() {
    const size = 7;
    this.position = new Position(size, 0);
    const center = Intersection.getIntersection(3, 3, size);
    this.position = this.position.play(center, this.toKill);

    // add 3 more moves
    for (let i = 0; i < 3; i++) {
      const rnd = this.randomInt(this.position.size);
      const res = this.position.play(rnd, this.toKill);
      if (res != null) {
        this.position = res;
      }
    }

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
          if (status2 === this.toKill) {
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

  randomInt(size) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);

    return Intersection.getIntersection(x, y, size);
  }

  public isKeyPoint(point: Intersection): boolean {
    const status = this.position.getStatus(point.x, point.y);
    if (status !== IntStatus.EMPTY) {
      return false;
    }

    return this.keyPoints.indexOf(point) !== -1;
  }

  ngOnInit() {
    this.createChallenge();
  }

  public onGobanClick(point: Intersection) {
    if (!this.isKeyPoint(point)) {
      return;
    }

    this.onPlay(point);
  }

  public onPlay(point: Intersection) {
    const position = this.position.play(point, this.toPlay);
    if (position == null) {
      // an illegal move.
      return;
    }
    this.position = position;

    const remaining = this.position.getIntersectionsByColor(this.toKill)
    if (remaining.length === 0) {
      // all are captured
      setTimeout(() => {
        if (confirm('Well done ! - Play again ?')) {
          this.createChallenge();
        }
      });
    } else if (this.configuration.targetsRunAway === true) {
      // stones should run away.
      setTimeout(() => this.tryEscape())
    }
  }

  public tryEscape() {
    const intersections = this.position.getIntersectionsByColor(this.toKill)
    for (const intersection of intersections) {
      const { chain, liberties } = this.position.getChainAndLiberties(intersection);

      // first group with exactly one liberty should play a move.
      if (liberties.length === 1) {
        const newPosition = this.position.play(liberties[0], this.toKill);
        if (newPosition == null) {
          // it's an illegal move.
        }

        // apply move, and update playable keypoints for human player.
        this.position = newPosition;
        this.keyPoints = this.findKeyPoints();
        return;
      }
    }
  }
}
}
