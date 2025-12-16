/**
 * Created by davidbreuer on 16/12/2025.
 */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-future',
    standalone: false,
    template: `
        <div id="container" (click)="handleClick()">
            <p *ngIf="!hasStarted" class="click-to-start">{{ clickToStartText }}</p>
            <h2 [class.done]="isDone" [innerHTML]="type"></h2>
            <a *ngIf="isDone" 
               href="https://youtu.be/k4KDSwJTJsQ?si=Md5VmcCahliAaHoL&t=0" 
               target="_blank" 
               class="youtube-button">
                {{ watchOnYouTubeText }}
            </a>
        </div>
    `,
    styleUrls: ['./future.component.css']
})
export class FutureComponent {
    title: string;
    isDone: boolean = false;
    langSelect: string = 'en-GB';
    greeting: Record<string, string> = {
        'en-GB': ', I am a message from the future and I have to say that you will have a wonderful Christmas in 2025 and a fantastic year in 2026! Best regards, Dávid B.',
        'hu-HU': ', Én egy üzenet vagyok a jövőből, és el kell mondanom, hogy csodálatos karácsonyod lesz 2025-ben, és egy fantasztikus éved 2026-ben! Legjobbakat, Dávid B.'
    };
    translations: Record<string, { clickToStart: string; watchOnYouTube: string }> = {
        'en-GB': {
            clickToStart: 'Click to start',
            watchOnYouTube: 'Watch on YouTube'
        },
        'hu-HU': {
            clickToStart: 'Kattints az indításhoz',
            watchOnYouTube: 'Nézd meg YouTube-on'
        }
    };
    fullContent: string;
    type: string = '';
    hasStarted: boolean = false;

    get clickToStartText(): string {
        return this.translations[this.langSelect]?.clickToStart || this.translations['en-GB'].clickToStart;
    }

    get watchOnYouTubeText(): string {
        return this.translations[this.langSelect]?.watchOnYouTube || this.translations['en-GB'].watchOnYouTube;
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public sanitizer: DomSanitizer
    ) {
        this.title = this.route.snapshot.params['id'];
        this.langSelect = this.route.snapshot.params['lang'];
        this.fullContent = 'Hello ' + this.title + this.greeting[this.langSelect];
    }

    handleClick(): void {
        if (!this.hasStarted) {
            this.initiateSpeech();
        }
    }

    initiateSpeech(): void {
        if (this.hasStarted) {
            return;
        }
        this.hasStarted = true;
        this.speak(this.fullContent);
    }

    startType(): void {
        const textToSpeech = this.fullContent.split('');
        let time = 0;
        for (let l = 0; l < textToSpeech.length; l++) {
            time = time + 50;
            ((time, l) => {
                setTimeout(() => {
                    this.type += textToSpeech[l];
                    if (l === textToSpeech.length - 1) {
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
        this.isDone = false;
        this.hasStarted = false;
    }

    speak(text: string): void {
        const u = new SpeechSynthesisUtterance();
        u.text = text;
        u.lang = this.langSelect;

        u.onstart = () => {
            console.log('Speech started successfully');
        };

        u.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            // If speech fails, still show the text
            if (!this.isDone && this.type === '') {
                this.startType();
            }
        };

        try {
            window.speechSynthesis.speak(u);
            this.startType();
        } catch (error) {
            console.error('Error calling speech synthesis:', error);
            this.startType();
        }
    }
}
