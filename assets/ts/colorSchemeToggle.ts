import StackColorScheme from 'ts/colorScheme';

class ColorSchemeToggle {
    private emoji: HTMLElement;
    private colorScheme: StackColorScheme;

    constructor(emoji: HTMLElement, colorScheme: StackColorScheme) {
        this.emoji = emoji;
        this.colorScheme = colorScheme;
        this.initializeEventListeners();
        this.updateEmoji();
    }

    private initializeEventListeners() {
        this.emoji.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleColorScheme();
        });
    }

    private toggleColorScheme() {
        const newScheme = this.emoji.textContent === '☀️' ? 'light' : 'dark';
        this.colorScheme.setColorScheme(newScheme);
        this.updateEmoji();
    }

    private updateEmoji() {
        this.emoji.textContent = this.colorScheme.currentScheme === 'dark' ? '☀️' : '🌙';
    }
}

export default ColorSchemeToggle;