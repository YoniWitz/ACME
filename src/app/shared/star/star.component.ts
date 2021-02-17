import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {
    @Input() rating: number;
    @Output() onRatingClicked: EventEmitter<number> = new EventEmitter<number>();
    starWidth: number;


    ngOnInit(): void {
        this.starWidth = this.rating * 75 / 5
    }

    ratingClicked(): void {
        this.onRatingClicked.emit(this.rating);
    }
}