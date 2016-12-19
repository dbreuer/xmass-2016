/**
 * Created by davidwestbury on 19/12/2016.
 */
import { Component } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-future',
    template: `<div id="container"><h2 [innerHTML]="type"></h2></div>`,
    styleUrls: ['./future.component.css']
})
export class FutureComponent {
    title: string;
    greeting: string = ", I am a message from the future, and i will tell you that you have a marvelous christmass in 2016, and an awsome year in 2017! Bests, David B.";
    fullContent: string;
    type: string = '';

    constructor(  private route: ActivatedRoute,
                  private router: Router,
                    public sanitizer: DomSanitizer) {
        this.title = this.route.snapshot.params['id'];
        this.fullContent = "Hello " + this.route.snapshot.params['id'] + this.greeting;

        this.speak(this.fullContent);
    }

    startType(): void {
        let textToSpeech = this.fullContent.split("");
        let i = 0;
        for(let l of textToSpeech) {
            i++;
            setTimeout(()=> {
                this.type += l;
            }, i * 50);
        }
    }

    replay(event: Event): void {
        event.preventDefault();
        window.speechSynthesis.pause();
        window.speechSynthesis.cancel();
        this.type = '';
        this.speak(this.fullContent);
    }


    speak(text: string): void {
        var u = new SpeechSynthesisUtterance();
        u.text = text;
        u.lang = 'en-GB';

        window.speechSynthesis.speak(u);
        this.startType()
    }
}
