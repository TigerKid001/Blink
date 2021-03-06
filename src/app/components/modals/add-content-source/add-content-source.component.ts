import { Component, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap, switchMap, catchError } from 'rxjs/operators';
import { FeedService } from 'src/app/services/feed.service';
import { LoggingService, Logger } from 'src/app/services/logging.service';


const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


@Component({
  selector: 'app-add-content-source',
  templateUrl: './add-content-source.component.html',
  styleUrls: ['./add-content-source.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddContentSourceComponent {
  showProgressbar: boolean;
  private logger: Logger;
  public model: any;

  constructor(public activeModal: NgbActiveModal,
              private feedService: FeedService,
              private loggingService: LoggingService) {
    this.model = null;
    this.showProgressbar = false;
    this.logger = this.loggingService.getLogger(AddContentSourceComponent.name, LoggingService.Level.Debug);
  }

  searchFeeds = (text$: Observable<string>) =>
    text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => this.showProgressbar = true),
    switchMap(term =>
      this.feedService.searchStreams(term).pipe(
        tap(() => this.showProgressbar = false),
        catchError(() => {
          this.showProgressbar = true;
          return of([]);
        }))
    ),
    tap(() => this.showProgressbar = false)
    )

    feedSourceTitleFormatter = (source: { title: string }): string => source.title.trim();

    closeIfSourceSelected() {
      if (this.model) {
        this.activeModal.close(this.model);
      }
    }

    getTrimmedString(src: any, field: string,  length: number) {
      if (src && src[field] && src[field].length > 0) {
        return src[field].trim().substring(0, length);
      }
      return '';
    }

}
