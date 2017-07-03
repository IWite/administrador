import { NgModule } from '@angular/core';
import { devVariables } from "./dev";
import { prodVariables } from "./prod";
import { EnvVariables } from "./env.token";

declare const process: any; 

export function environmentFactory() {
  return process.env.IONIC_ENV === 'prod' ? prodVariables : devVariables;
}

@NgModule({
    providers: [
        {
            provide: EnvVariables,
            useFactory: environmentFactory
        }
    ],
})
export class EnvironmentsModule {}