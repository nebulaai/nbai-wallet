import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  ngOnInit() {
    this.autoLogout();
  }

  autoLogout() {
      let lastTime = new Date().getTime();
      let currentTime = new Date().getTime();
      let timeOut = 30 * 60 * 1000;   //set period is 30 mins;
      // let timeOut =  2*5000;   //set period is 10 seconds;
      document.onmouseover = function() {
        lastTime = new Date().getTime();
      };
      let interTime = setInterval(() => {
        currentTime = new Date().getTime();
        if (currentTime - lastTime > timeOut) {
          clearInterval(interTime);
          // console.log('timeout, leave!');
          window.location.reload();
        }
      }, 1000);

  }
}
