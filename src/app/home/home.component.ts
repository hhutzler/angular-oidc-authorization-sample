import {Component, OnInit, OnDestroy, Injectable} from '@angular/core';
import { OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';
import {Observable, Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {MessageService} from "../message.service";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit, OnDestroy {
  userData$: Observable<UserDataResult>;
  private subscriptions = new Subscription();
  isAuthenticated = false;
  email = null;
  email2 = null;
  configId = null;
  username = null;
  logHeader= "";
  defaultRoles = null;

  constructor(public oidcSecurityService: OidcSecurityService,
              private http: HttpClient,
              public accountService: AccountService,
              public messageService: MessageService ) {}

  ngOnInit()  {
    this.logHeader = "HomeComponent:ngOnInit():";
    this.messageService.add(this.logHeader + 'Initial call to isAuthenticated: ' + this.isAuthenticated );
    /*  this.subscriptions.add not needed here as we use async in html template. See
        https://stackoverflow.com/questions/38008334/angular-rxjs-when-should-i-unsubscribe-from-subscription
     */
    this.subscriptions.add(this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated,
                                                           allConfigsAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;

      console.warn('authenticated: ', isAuthenticated);
      allConfigsAuthenticated.forEach((configItem) => {
        console.warn('--- ConfigId: ', configItem.configId);
        });
      })
    );
    this.messageService.add(this.logHeader + 'isAuthenticated inside Authenticated$ subscription: ' + this.isAuthenticated );
    this.subscriptions.add(this.oidcSecurityService.userData$.subscribe((userDataResult) => {
      console.log('userDataResult::');
      /* Check for null and undefined  or main object and nested userData objects
      *  There are two different userdata objects holding the same data.
      *  Not sure why we have duplicate data here
      *  - userDataResult.userData                -> Singe Object
      *  - userDataResult.allUserData[0].userData  -> Array of Objects
      *
      * During Logoff this the userData Objects are set to null !
      */
      if (userDataResult != null) {
        if (userDataResult.allUserData[0].userData != null) {
            // ...
          this.configId = userDataResult.allUserData[0].configId;
          this.username = userDataResult.allUserData[0].userData.preferred_username;
          this.accountService.setPreferredUsername(this.username );
          this.email = userDataResult.allUserData[0].userData.email;
          this.defaultRoles= userDataResult.allUserData[0].userData.default_roles;
          console.log('userDataResult.allUserData[0].configId       : ', this.configId);
          console.log('userDataResult.allUserData[0].userData.email : ', this.email);
        }
        this.accountService.getAccounts();

      }
    }));

    this.userData$ = this.oidcSecurityService.userData$;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
