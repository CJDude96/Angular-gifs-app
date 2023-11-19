import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from './../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  constructor(private http: HttpClient) {
    this.loadLocarStorage();
    console.log('Gifs list loaded')
  }

  public gifList: Gif[] = [];
  private _tagHistory: string[] = [];
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = '6t4stUpjeAxsOLAVjja5zhV22wqcyNwE';

  get tagsHistory() {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLocaleLowerCase();

    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  private loadLocarStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagHistory = JSON.parse(localStorage.getItem('history')!);
    
    if(this._tagHistory.length === 0) return;
    this.searchtag(this._tagHistory[0])
  }

  public async searchtag(tag: string): Promise<void> {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 8)
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
      });
  }
}
