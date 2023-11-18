import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _tagHistory: string[] = [];

  get tagsHistory() {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string):void {
    
  }

  public searchtag(tag: string): void {
    if (tag.length === 0) return;

    this._tagHistory.unshift(tag);
  }
}
