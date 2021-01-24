import { Injectable } from '@angular/core';
import { GobanTheme, themes } from '../components/themes/themes';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  public theme: GobanTheme = themes[0];
  public animateKeypoints: boolean = false;
  public targetsRunAway: boolean = false;

  constructor() { }
}