// modules/inventory.js
import { DragManager } from './dragManager.js';

export class InventoryModule {
    constructor() {
        this.items = new Map();
    }

    render() {
        const widget = document.createElement('div');
        widget.className = 'widget inventory-widget draggable';
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

        DragManager.makeDraggable(widget);
        return widget;
    }

    update(data) {
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
            document.getElementById('weight-info').textContent = 
                `Weight: ${data.weight}/${data.max_weight}`;
        }
    }

    renderItems(searchTerm = '') {
        const container = document.getElementById('inventoryItems');
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

    filterItems(searchTerm) {
        this.renderItems(searchTerm);
    }
}