import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {flatMap, tap} from 'rxjs/operators'
import { IdentityService } from '../identity.service';

declare var pphwebsdk: any;

@Component({
  selector: 'app-setup-paypal',
  templateUrl: './setup-paypal.component.html',
  styleUrls: ['./setup-paypal.component.css']
})
export class SetupPaypalComponent implements OnInit {
  public paypalLoginURL = "";
  public token = "";
  public status = "";
  public payPalSetupDone = false;
  private base = "https://www.sandbox.paypal.com/signin/authorize?"
  private clientID = "AQJ0aKVRNaWwuJH_dsa4Szc_0wu8L_0yXO0dR2rX3Z09hnuVl-IVKQsfDLMuFa7ytpiS_USJq4saCXmt";
  private redirectURI = "http://localhost:8080/oauth/redirect";
  private scope = "openid https://uri.paypal.com/services/paypalattributes/business https://uri.paypal.com/services/paypalhere address email profile";
  private responseType = "code";

  
  constructor(private activatedRoute: ActivatedRoute, private identity: IdentityService) {
    this.paypalLoginURL = this.formatPayPalLoginURL();

    activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      this.token = params.token;
    })
  }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe((params) => {
        this.token = params.token;
        if (this.token) {
          this.identity.setAccessToken(this.token);
          //this.initUIFlow();
        }
      })
      
  }

  public statusCheck() {
    console.log("I was clicked")
    this.status = "OK";
  }

  public connect() {
    this.connectToMediatorApp()
      .subscribe(() => {
        this.payPalSetupDone = true;
      })
  }

  private formatPayPalLoginURL(): string {
    return `${this.base}scope=${this.scope}&response_type=${this.responseType}&redirect_uri=${encodeURI(this.redirectURI)}&client_id=${this.clientID}`
  }

  private initUIFlow() {
    this.connectToMediatorApp()
      .subscribe(
        () => {
          console.log('nexting')
          this.payPalSetupDone = true
          console.log(this);
        },
        (err) => {},
        () => {
          console.log("done");
        }
      )
  }

  private connectToMediatorApp(): Observable<any> {
    return new Observable((observer) => {
      pphwebsdk.Setup.isSetupComplete()
        .then(() => {
            observer.next();
            observer.complete();
        })
        .catch(() => {
            console.log("Start UI flow");
            pphwebsdk.Setup.startUIFlow(() => {
                observer.next();
                observer.complete();
            })
        })
    })
  }

}
