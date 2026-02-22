import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.appHighlight);
    this.renderer.setStyle(this.el.nativeElement, 'padding', '0.25rem 0.5rem');
    this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '4px');
  }
}