type colorScheme = 'light' | 'dark' | 'auto';

class StackColorScheme {
    private localStorageKey = 'StackColorScheme';
    public currentScheme: colorScheme;
    private systemPreferScheme: colorScheme;

    constructor() {
        this.bindMatchMedia();
        this.currentScheme = this.getSavedScheme();
        this.setBodyClass();
    }

    public setColorScheme(scheme: colorScheme) {
        this.currentScheme = scheme;
        this.saveScheme();
        this.setBodyClass();
    }

    private saveScheme() {
        localStorage.setItem(this.localStorageKey, this.currentScheme);
    }

    private isDark() {
        return this.currentScheme === 'dark';
    }

    private dispatchEvent(colorScheme: colorScheme) {
        const event = new CustomEvent('onColorSchemeChange', {
            detail: colorScheme
        });
        window.dispatchEvent(event);
    }

    private setBodyClass() {
        if (this.isDark()) {
            document.documentElement.dataset.scheme = 'dark';
        } else {
            document.documentElement.dataset.scheme = 'light';
        }
        this.dispatchEvent(document.documentElement.dataset.scheme as colorScheme);
    }

    private getSavedScheme(): colorScheme {
        const savedScheme = localStorage.getItem(this.localStorageKey);
        if (savedScheme == 'light' || savedScheme == 'dark' || savedScheme == 'auto') return savedScheme;
        else return 'auto';
    }

    private bindMatchMedia() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            this.systemPreferScheme = e.matches ? 'dark' : 'light';
            this.setBodyClass();
        });
    }
}

export default StackColorScheme;
