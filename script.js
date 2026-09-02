document.addEventListener('DOMContentLoaded', function () {
    const callsInput = document.getElementById('callsPerDay');
    const orderInput = document.getElementById('avgOrder');
    const button = document.getElementById('calcButton');
 
    const rMissed = document.getElementById('rMissed');
    const rOrders = document.getElementById('rOrders');
    const rRevenue = document.getElementById('rRevenue');
 
    const MISS_RATE = 0.43;      // Breez, Feb 2025
    const CAPTURE_RATE = 0.5;    // Mora captures ~half of missed calls (peak/overload windows only)
    const ORDER_PRODUCING = 0.5; // ~half of captured calls are order-type, not just questions
    const SUCCESS_RATE = 0.5;    // ~half of those complete successfully (floor-case, conservative)
 
    function formatUSD(n) {
        return '$' + Math.round(n).toLocaleString('en-US');
    }
 
    function calculate() {
        const callsPerDay = parseFloat(callsInput.value);
        const avgOrder = parseFloat(orderInput.value);
 
        if (!callsPerDay || callsPerDay <= 0 || !avgOrder || avgOrder <= 0) {
            rMissed.textContent = '0';
            rOrders.textContent = '0';
            rRevenue.textContent = '$0';
            return;
        }
 
        const missedPerMonth = callsPerDay * 30 * MISS_RATE;
        const captured = missedPerMonth * CAPTURE_RATE;
        const orderProducing = captured * ORDER_PRODUCING;
        const successfulOrders = orderProducing * SUCCESS_RATE;
        const revenue = successfulOrders * avgOrder;
 
        rMissed.textContent = Math.round(missedPerMonth).toLocaleString('en-US');
        rOrders.textContent = Math.round(successfulOrders).toLocaleString('en-US');
        rRevenue.textContent = formatUSD(revenue);
    }
 
    button.addEventListener('click', calculate);
    callsInput.addEventListener('keyup', function (e) { if (e.key === 'Enter') calculate(); });
    orderInput.addEventListener('keyup', function (e) { if (e.key === 'Enter') calculate(); });
});
