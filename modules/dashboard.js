// modules/dashboard.js
import { DragManager } from './dragManager.js';

export class DashboardModule {
    constructor() {
        this.speedValue = 0;
        this.rpmValue = 0;
        this.job = 'None';
    }

    render() {
        const widget = document.createElement('div');
        widget.className = 'widget dashboard-widget draggable';
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
                            <filter id="dropShadow">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                                <feOffset dx="1" dy="1"/>
                                <feMerge>
                                    <feMergeNode/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        <path class="gauge-bg" d="M20,100 A80,80 0 0,1 180,100" stroke="#333" stroke-width="20" fill="none"/>
                        <path class="gauge-fill" d="M20,100 A80,80 0 0,1 180,100" stroke="url(#speedGradient)" stroke-width="20" fill="none" stroke-dasharray="251.2" stroke-dashoffset="251.2"/>
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
                        <path class="gauge-bg" d="M20,100 A80,80 0 0,1 180,100" stroke="#333" stroke-width="20" fill="none"/>
                        <path class="gauge-fill" d="M20,100 A80,80 0 0,1 180,100" stroke="url(#rpmGradient)" stroke-width="20" fill="none" stroke-dasharray="251.2" stroke-dashoffset="251.2"/>
                        ${this.generateTicks()}
                        <text x="100" y="140" text-anchor="middle" class="gauge-value">0</text>
                        <text x="100" y="160" text-anchor="middle" class="gauge-label">RPM x1000</text>
                    </svg>
                </div>
                <div class="job-info">Current Job: <span id="jobName">None</span></div>
            </div>
        `;

        DragManager.makeDraggable(widget);
        return widget;
    }

    generateTicks() {
        let ticks = '';
        for (let i = 0; i <= 240; i += 20) {
            const angle = -120 + (i * 1.5);
            const rad = (angle * Math.PI) / 180;
            const x1 = 100 + 60 * Math.cos(rad);
            const y1 = 100 + 60 * Math.sin(rad);
            const x2 = 100 + 70 * Math.cos(rad);
            const y2 = 100 + 70 * Math.sin(rad);
            
            ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="white" stroke-width="2"/>`;
            if (i % 40 === 0) {
                const textX = 100 + 85 * Math.cos(rad);
                const textY = 100 + 85 * Math.sin(rad);
                ticks += `<text x="${textX}" y="${textY}" text-anchor="middle" fill="white" class="tick-text">${i}</text>`;
            }
        }
        return ticks;
    }

    update(data) {
        if (data.speed !== undefined) {
            this.updateGauge('speed', data.speed);
        }
        if (data.rpm !== undefined) {
            this.updateGauge('rpm', data.rpm * 1000);
        }
        if (data.job_name) {
            document.getElementById('jobName').textContent = data.job_name || 'None';
        }
    }

    updateGauge(type, value) {
        const gauge = document.querySelector(`.gauge.${type}`);
        if (!gauge) return;

        const maxValue = type === 'speed' ? 240 : 8000;
        const normalizedValue = Math.min(value, maxValue);
        const percentage = (normalizedValue / maxValue);
        const offset = 251.2 * (1 - percentage);

        gauge.querySelector('.gauge-fill').style.strokeDashoffset = offset;
        gauge.querySelector('.gauge-value').textContent = Math.round(normalizedValue);
    }
}