import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazyimage',
  templateUrl: './lazyimage.component.html',
  styleUrl: './lazyimage.component.css'
})
export class LazyimageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false;

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 300);
  }

  ngOnInit(): void {
    if( !this.url ) throw new Error('Url required');
  }

}
