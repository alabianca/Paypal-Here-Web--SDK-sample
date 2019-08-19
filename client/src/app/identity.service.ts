import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class IdentityService {
    public $accessToken: BehaviorSubject<string> = new BehaviorSubject<string>("");
    private access_token: string = "";
    constructor() {

    }

    public setAccessToken(token: string) {
        this.access_token = token;
        this.$accessToken.next(token);
    }
}