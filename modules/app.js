// modules/app.js
import { DashboardModule } from './dashboard.js';
import { InventoryModule } from './inventory.js';
import { SettingsModule } from './settings.js';
import { StorageManager } from './storage.js';

class App {
    constructor() {
        this.modules = new Map();
        this.init();
    }

    init() {
        this.registerModule('dashboard', new DashboardModule());
        this.registerModule('inventory', new InventoryModule());
        this.registerModule('settings', new SettingsModule());
        
        this.loadModules();
        this.setupEventListeners();
        StorageManager.loadPositions();
    }

    registerModule(name, module) {
        this.modules.set(name, module);
    }

    loadModules() {
        const container = document.getElementById('app');
        this.modules.forEach(module => {
            const element = module.render();
            if (element) {
                container.appendChild(element);
            }
        });
    }

    setupEventListeners() {
        window.addEventListener('message', (event) => {
            const data = event.data.data;
            if (data) {
                this.modules.forEach(module => module.update(data));
            }
        });
    }
}

window.app = new App();