import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public server = 'http://localhost:65113/';
    public apiUrl = 'api/people';
    public serverWithApiUrl = this.server + this.apiUrl;
}
