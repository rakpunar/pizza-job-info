// app.js

const styles = `
    .widget {
        position: absolute;
        background: rgba(20, 20, 20, 0.95);
        border-radius: 10px;
        padding: 15px;
        color: white;
        user-select: none;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .dashboard-widget {
        top: 20px;
        right: 20px;
        width: 400px;
        z-index: 1000;
    }

    .gauge-container {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        padding: 10px;
        background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
        border-radius: 8px;
        box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
    }

    .gauge {
        width: 180px;
        height: 180px;
        margin: 10px;
        position: relative;
        background: radial-gradient(circle at center, #2a2a2a, #1a1a1a);
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
    }

    .gauge svg {
        width: 100%;
        height: 100%;
    }

    .gauge text {
        fill: white;
        font-family: Arial, sans-serif;
    }

    .gauge .gauge-value {
        font-size: 24px;
        font-weight: bold;
        text-shadow: 0 0 5px rgba(255,255,255,0.5);
    }

    .gauge .gauge-label {
        font-size: 12px;
        fill: #888;
    }

    .gauge .tick-text {
        font-size: 12px;
        fill: #888;
        font-weight: bold;
    }

    .job-info {
        width: 100%;
        text-align: center;
        padding: 10px;
        margin-top: 10px;
        background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.1));
        border-radius: 5px;
        font-size: 14px;
        color: #aaa;
        text-shadow: 0 0 5px rgba(255,255,255,0.2);
    }

    /* Inventory styles.. */
    .inventory-widget {
        top: 20px;
        left: 20px;
        width: 300px;
        max-height: 500px;
        display: flex;
        flex-direction: column;
        z-index: 1000;
    }

    .inventory-header {
        padding: 15px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .inventory-header h3 {
        margin: 0 0 10px 0;
        color: #4CAF50;
        font-size: 16px;
        text-shadow: 0 0 5px rgba(76,175,80,0.3);
    }

    .inventory-header input {
        width: 100%;
        padding: 8px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 4px;
        color: white;
        outline: none;
        transition: all 0.3s;
    }

    .inventory-header input:focus {
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 0 5px rgba(255,255,255,0.2);
    }

    .inventory-content {
        overflow-y: auto;
        max-height: 400px;
        padding: 10px;
    }

    .inventory-item {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        margin: 5px 0;
        background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.08));
        border-radius: 4px;
        transition: all 0.2s;
    }

    .inventory-item:hover {
        background: linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.12));
        transform: translateX(5px);
    }

    .item-name {
        color: #fff;
        font-size: 14px;
        text-shadow: 0 0 5px rgba(255,255,255,0.2);
    }

    .item-amount {
        background: rgba(255, 255, 255, 0.1);
        padding: 4px 10px;
        border-radius: 10px;
        font-size: 12px;
        min-width: 40px;
        text-align: center;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    }

    .inventory-footer {
        padding: 10px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        text-align: right;
        font-size: 12px;
        color: #888;
    }

    .toolbar {
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1001;
        background: rgba(20, 20, 20, 0.95);
        padding: 10px;
        border-radius: 5px;
        display: flex;
        gap: 10px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .tool-button {
        padding: 8px 16px;
        background: linear-gradient(145deg, #ff4444, #ff6666);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 14px;
        text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    }

    .tool-button:hover {
        background: linear-gradient(145deg, #ff6666, #ff4444);
        transform: translateY(-2px);
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }

    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
    }
`;

class App {
    constructor() {
        this.widgets = new Map();
        this.init();
    }

    init() {
        this.addStyles();
        this.initWidgets();
        this.setupEventListeners();
        this.loadPositions();
    }

    addStyles() {
        const styleSheet = document.createElement("style");
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    initWidgets() {
        this.widgets.set('dashboard', new DashboardWidget());
        this.widgets.set('inventory', new InventoryWidget());
        this.widgets.set('toolbar', new ToolbarWidget());

        const container = document.getElementById('app');
        this.widgets.forEach(widget => {
            container.appendChild(widget.render());
        });
    }

    setupEventListeners() {
        window.addEventListener('message', (event) => {
            const data = event.data.data;
            if (data) {
                this.widgets.forEach(widget => widget.update(data));
            }
        });
    }

    loadPositions() {
        const savedPositions = localStorage.getItem('widgetPositions');
        if (savedPositions) {
            const positions = JSON.parse(savedPositions);
            Object.entries(positions).forEach(([id, pos]) => {
                const element = document.getElementById(id);
                if (element) {
                    element.style.top = pos.top || '20px';
                    element.style.left = pos.left || '20px';
                }
            });
        }
    }

    savePositions() {
        const widgets = document.querySelectorAll('.widget');
        const positions = {};
        widgets.forEach(widget => {
            positions[widget.id] = {
                top: widget.style.top,
                left: widget.style.left
            };
        });
        localStorage.setItem('widgetPositions', JSON.stringify(positions));
    }
}

class DashboardWidget {
    constructor() {
        this.element = null;
    }

    render() {
        const widget = document.createElement('div');
        widget.className = 'widget dashboard-widget';
        widget.id = 'dashboard';

        widget.innerHTML = `
            <div class="gauge-container">
                <div class="gauge speed">
                    <svg viewBox="0 0 200 200">
                        <defs>
                            <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style="stop-color:#00ff00" />
                                <stop offset="50%" style="stop-color:#ffff00" />
                                <stop offset="100%" style="stop-color:#ff0000" />
                            </linearGradient>
                        </defs>
                        <path class="gauge-bg" d="M20,100 A80,80 0 0,1 180,100" 
                              stroke="#333" stroke-width="20" fill="none"/>
                        <path class="gauge-fill" d="M20,100 A80,80 0 0,1 180,100" 
                              stroke="url(#speedGradient)" stroke-width="20" fill="none" 
                              stroke-dasharray="251.2" stroke-dashoffset="251.2"/>
                        ${this.generateTicks()}
                        <text x="100" y="140" text-anchor="middle" class="gauge-value">0</text>
                        <text x="100" y="160" text-anchor="middle" class="gauge-label">KM/H</text>
                    </svg>
                </div>
                <div class="gauge rpm">
                    <svg viewBox="0 0 200 200">
                        <defs>
                            <linearGradient id="rpmGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style="stop-color:#00ff00" />
                                <stop offset="50%" style="stop-color:#ffff00" />
                                <stop offset="100%" style="stop-color:#ff0000" />
                            </linearGradient>
                        </defs>
                        <path class="gauge-bg" d="M20,100 A80,80 0 0,1 180,100" 
                              stroke="#333" stroke-width="20" fill="none"/>
                        <path class="gauge-fill" d="M20,100 A80,80 0 0,1 180,100" 
                              stroke="url(#rpmGradient)" stroke-width="20" fill="none" 
                              stroke-dasharray="251.2" stroke-dashoffset="251.2"/>
                        ${this.generateTicks(true)}
                        <text x="100" y="140" text-anchor="middle" class="gauge-value">0</text>
                        <text x="100" y="160" text-anchor="middle" class="gauge-label">RPM x1000</text>
                    </svg>
                </div>
                <div class="job-info">Current Job: <span id="jobName">None</span></div>
            </div>
        `;

        this.element = widget;
        this.makeDraggable(widget);
        return widget;
    }

    generateTicks(isRPM = false) {
        let ticks = '';
        const maxValue = isRPM ? 8 : 240;
        const step = isRPM ? 1 : 20;

        for (let i = 0; i <= maxValue; i += step) {
            const angle = -120 + (i * (240 / maxValue));
            const rad = (angle * Math.PI) / 180;
            const x1 = 100 + 60 * Math.cos(rad);
            const y1 = 100 + 60 * Math.sin(rad);
            const x2 = 100 + 70 * Math.cos(rad);
            const y2 = 100 + 70 * Math.sin(rad);

            ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                           stroke="white" stroke-width="2"/>`;

            if (i % (step * 2) === 0) {
                const textX = 100 + 85 * Math.cos(rad);
                const textY = 100 + 85 * Math.sin(rad);
                ticks += `<text x="${textX}" y="${textY}" text-anchor="middle" 
                               class="tick-text">${i}</text>`;
            }
        }
        return ticks;
    }

    update(data) {
        if (!this.element) return;

        if (data.speed !== undefined) {
            this.updateGauge('speed', data.speed, 240);
        }

        if (data.rpm !== undefined) {
            this.updateGauge('rpm', data.rpm * 1000, 8000); // RPM değerini 1000 ile çarpıyoruz ve max 8000 RPM
        }

        if (data.job_name) {
            this.element.querySelector('#jobName').textContent = data.job_name || 'None';
        }
    }
    
    updateGauge(type, value, maxValue) {
        const gauge = this.element.querySelector(`.gauge.${type}`);
        if (!gauge) return;

        const normalizedValue = Math.min(value, maxValue);
        const percentage = (normalizedValue / maxValue);
        const offset = 251.2 * (1 - percentage);

        const fill = gauge.querySelector('.gauge-fill');
        const valueText = gauge.querySelector('.gauge-value');

        fill.style.strokeDashoffset = offset;
        valueText.textContent = Math.round(normalizedValue);
    }

    makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        element.addEventListener('mousedown', dragMouseDown);

        function dragMouseDown(e) {
            if (e.target.tagName.toLowerCase() === 'input') return;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.addEventListener('mousemove', elementDrag);
            document.addEventListener('mouseup', closeDragElement);
            element.style.transition = 'none';
        }

        function elementDrag(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            const newTop = element.offsetTop - pos2;
            const newLeft = element.offsetLeft - pos1;

            const maxX = window.innerWidth - element.offsetWidth;
            const maxY = window.innerHeight - element.offsetHeight;

            element.style.top = Math.max(0, Math.min(maxY, newTop)) + "px";
            element.style.left = Math.max(0, Math.min(maxX, newLeft)) + "px";
        }

        function closeDragElement() {
            document.removeEventListener('mousemove', elementDrag);
            document.removeEventListener('mouseup', closeDragElement);
            element.style.transition = 'background 0.3s';
            window.app.savePositions();
        }
    }
}

class InventoryWidget {
    constructor() {
        this.items = new Map();
        this.element = null;
    }

    render() {
        const widget = document.createElement('div');
        widget.className = 'widget inventory-widget';
        widget.id = 'inventory';

        widget.innerHTML = `
                    <div class="inventory-header">
                        <h3>Inventory</h3>
                        <input type="text" id="inventorySearch" placeholder="Search items...">
                    </div>
                    <div class="inventory-content" id="inventoryItems"></div>
                    <div class="inventory-footer">
                        <span id="weight-info">Weight: 0/0</span>
                    </div>
                `;

        const searchInput = widget.querySelector('#inventorySearch');
        searchInput.addEventListener('input', () => this.filterItems(searchInput.value));

        this.element = widget;
        this.makeDraggable(widget);
        return widget;
    }

    update(data) {
        if (!this.element) return;

        if (data.inventory) {
            try {
                const inventory = JSON.parse(data.inventory);
                this.items = new Map(Object.entries(inventory));
                this.renderItems();
            } catch (e) {
                console.error('Error parsing inventory:', e);
            }
        }

        if (data.weight !== undefined && data.max_weight !== undefined) {
            this.element.querySelector('#weight-info').textContent =
                `Weight: ${data.weight}/${data.max_weight}`;
        }
    }

    filterItems(searchTerm) {
        this.renderItems(searchTerm);
    }

    renderItems(searchTerm = '') {
        if (!this.element) return;

        const container = this.element.querySelector('#inventoryItems');
        container.innerHTML = '';

        Array.from(this.items.entries())
            .filter(([name]) => name.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => a[0].localeCompare(b[0]))
            .forEach(([name, data]) => {
                const item = document.createElement('div');
                item.className = 'inventory-item';
                const displayName = name
                    .replace(/_/g, ' ')
                    .replace(/\|/g, ' - ')
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');

                item.innerHTML = `
                            <span class="item-name">${displayName}</span>
                            <span class="item-amount">${data.amount}</span>
                        `;
                container.appendChild(item);
            });
    }

    makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        element.addEventListener('mousedown', dragMouseDown);

        function dragMouseDown(e) {
            if (e.target.tagName.toLowerCase() === 'input') return;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.addEventListener('mousemove', elementDrag);
            document.addEventListener('mouseup', closeDragElement);
            element.style.transition = 'none';
        }

        function elementDrag(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            const newTop = element.offsetTop - pos2;
            const newLeft = element.offsetLeft - pos1;

            const maxX = window.innerWidth - element.offsetWidth;
            const maxY = window.innerHeight - element.offsetHeight;

            element.style.top = Math.max(0, Math.min(maxY, newTop)) + "px";
            element.style.left = Math.max(0, Math.min(maxX, newLeft)) + "px";
        }

        function closeDragElement() {
            document.removeEventListener('mousemove', elementDrag);
            document.removeEventListener('mouseup', closeDragElement);
            element.style.transition = 'background 0.3s';
            window.app.savePositions();
        }
    }
}

class ToolbarWidget {
    constructor() {
        this.element = null;
    }

    render() {
        const toolbar = document.createElement('div');
        toolbar.className = 'toolbar';

        toolbar.innerHTML = `
                    <button onclick="window.app.clearCacheAndReload()" class="tool-button">
                        🗑️ Clear Cache & Reload
                    </button>
                `;

        this.element = toolbar;
        return toolbar;
    }

    update() {
        // Toolbar doesn't need updates
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

export { App };
