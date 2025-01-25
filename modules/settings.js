// modules/settings.js
export class SettingsModule {
    render() {
        const toolbar = document.createElement('div');
        toolbar.className = 'toolbar';
        
        toolbar.innerHTML = `
            <button onclick="this.clearCacheAndReload()" class="tool-button">
                <i class="fas fa-trash"></i> Clear Cache & Reload
            </button>
        `;

        toolbar.querySelector('button').addEventListener('click', () => {
            this.clearCacheAndReload();
        });

        return toolbar;
    }

    clearCacheAndReload() {
        localStorage.clear();
        window.location.reload(true);
    }

    update() {
        // Settings modülü için update gerekmiyor
    }
}