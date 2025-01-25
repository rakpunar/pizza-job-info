// modules/styles.js
export const styles = `
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
        background: #1a1a1a;
        border-radius: 8px;
    }

    .gauge {
        width: 180px;
        height: 180px;
        margin: 10px;
        position: relative;
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
    }

    .gauge .gauge-label {
        font-size: 12px;
        fill: #888;
    }

    .gauge .tick-text {
        font-size: 10px;
        fill: #888;
    }

    .job-info {
        width: 100%;
        text-align: center;
        padding: 10px;
        margin-top: 10px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 5px;
        font-size: 14px;
        color: #aaa;
    }

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
    }

    .inventory-header input {
        width: 100%;
        padding: 8px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 4px;
        color: white;
        outline: none;
        transition: background 0.3s;
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
        background: rgba(255, 255, 255, 0.05);
        border-radius: 4px;
        transition: background 0.2s;
    }

    .inventory-item:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    .item-name {
        color: #fff;
        font-size: 14px;
    }

    .item-amount {
        background: rgba(255, 255, 255, 0.1);
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 12px;
        min-width: 30px;
        text-align: center;
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
        background: #ff4444;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.3s;
        font-size: 14px;
    }

    .tool-button:hover {
        background: #ff6666;
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