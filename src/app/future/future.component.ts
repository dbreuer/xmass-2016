/**
 * Created by davidwestbury on 19/12/2016.
 */
import { Component } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-future',
    template: `<div id="container"><h2 [class.done]="isDone" [innerHTML]="type"></h2></div>`,
    styleUrls: ['./future.component.css']
})
export class FutureComponent {
    title: string;
    isDone: boolean = false;
    langSelect: string = 'en-GB';
    greeting: Object = {
        "en-GB": ", I am a message from the future, and i have to tell you that you have a marvelous christmas in 2016, and an awesome year in 2017! Bests, David B.",
        "hu-HU": ", Én egy üzenet vagyok a jövőből, és el kell mondanom, hogy csodálatos karácsonyod lesz 2016-ban, és egy fantasztikus éved 2017-ben! Legjobbakat, Dávid B."
    };
    fullContent: string;
    type: string = '';

    constructor(  private route: ActivatedRoute,
                  private router: Router,
                    public sanitizer: DomSanitizer) {
        this.title = this.route.snapshot.params['id'];
        this.langSelect = this.route.snapshot.params['lang'];
        this.fullContent = "Hello " + this.title + this.greeting[this.langSelect];

        this.speak(this.fullContent);
    }

    startType(): void {
        let textToSpeech = this.fullContent.split("");
        let time = 0;
        for(let l = 0; l < textToSpeech.length; l++) {
            time = time + 50;
            ((time, l) => {
                setTimeout(()=> {
                    this.type += textToSpeech[l];
                    if (l==textToSpeech.length-1) {
                        this.isDone = true;
                    }
                }, time);
            })(time, l);

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
        u.lang = this.langSelect;

        window.speechSynthesis.speak(u);
        this.startType();

    }
}
