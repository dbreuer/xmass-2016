import { Component } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(  private route: ActivatedRoute,
                private router: Router) {
    console.log(this.route.params);
  }
  title = 'app works!';

}
