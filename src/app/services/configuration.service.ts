import { Injectable } from '@angular/core';
import { GobanTheme, randomTheme } from '../data/themes/themes';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  public theme: GobanTheme = randomTheme();
  public animateKeypoints: boolean = false;
  public targetsRunAway: boolean = true;

  constructor() { }
}
