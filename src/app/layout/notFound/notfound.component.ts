import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-notfound',
  standalone: true,
  templateUrl: 'notfound.component.html',
  imports: [RouterLink, NavbarComponent, MatButtonModule, TranslateModule],
  styles: `
     .notfound{
        display: flex;
        justify-content: center;
        align-items: center;    
        flex-direction: column;
     }
    `,
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
