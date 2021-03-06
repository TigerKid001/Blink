import { Component, OnInit } from '@angular/core';
import { LoggingService, Logger } from 'src/app/services/logging.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupportComponent } from '../modals/support/support.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbarCollapsed: boolean;
  private logger: Logger;

  constructor(private logging: LoggingService, private modalService: NgbModal) {
    this.logger = this.logging.getLogger(NavbarComponent.name, LoggingService.Level.Debug);
  }

  ngOnInit() {
    this.navbarCollapsed = true;
  }

  showYourLove(): void {
    this.modalService.open(SupportComponent);
  }

}
