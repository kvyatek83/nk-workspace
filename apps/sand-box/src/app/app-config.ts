import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as envJson from '../assets/environments/environment.json';

export type Config = typeof envJson;
@Injectable({
  providedIn: 'root'
})
export class AppConfig {

    private _config: Config | undefined;
    constructor(private http: HttpClient) {}

    get config(): Config | undefined {
        return this._config;
    }

    loadConfig(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.http.get<Config>('/assets/environments/environment.json').subscribe(config => {
                this._config = config;
                resolve();
            }, reject)
        });
    }
 }
