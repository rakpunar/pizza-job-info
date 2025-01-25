// modules/storage.js
export const StorageManager = {
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
    },

    loadPositions() {
        const savedPositions = localStorage.getItem('widgetPositions');
        if (savedPositions) {
            const positions = JSON.parse(savedPositions);
            Object.entries(positions).forEach(([id, pos]) => {
                const widget = document.getElementById(id);
                if (widget) {
                    widget.style.top = pos.top || '20px';
                    widget.style.left = pos.left || '20px';
                }
            });
        }
    }
};