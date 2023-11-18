import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {

  constructor( private http: HttpClient){}

  private _tagHistory: string[] = [];
  private serviceUrl: string = "https://api.giphy.com/v1/gifs";
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
  }

  public async searchtag(tag: string): Promise<void> {
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    
    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit', 8)
      .set('q', tag)

    this.http.get(`${this.serviceUrl}/search`, { params })
    .subscribe( resp => {
      console.log(resp)
    })
  }
}
