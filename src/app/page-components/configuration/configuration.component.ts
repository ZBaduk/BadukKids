import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { GobanTheme, themes } from '../../data/themes/themes';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  public themes = themes;

  constructor(private configuration: ConfigurationService) { }

  ngOnInit(): void {
  }

  get animateKeypoints(): boolean {
    return this.configuration.animateKeypoints === true;
  }

  set animateKeypoints(value: boolean) {
    this.configuration.animateKeypoints = !!value;
  }

  get selectedThemeIndex(): number {
    return themes.indexOf(this.configuration.theme);
  }

  set selectedThemeIndex(themeIndex: number) {
    this.configuration.theme = themes[themeIndex];
  }

  get targetsRunAway(): boolean {
    return this.configuration.targetsRunAway === true;
  }

  set targetsRunAway(value: boolean) {
    this.configuration.targetsRunAway = !!value;
  }
}
