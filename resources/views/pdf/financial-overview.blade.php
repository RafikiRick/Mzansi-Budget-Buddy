<!DOCTYPE html>
<html>
<head>
    <title>Financial Overview Report - Mzansi Budget Buddy</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .header { text-align: center; margin-bottom: 30px; }
        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0; }
        .stat-card { border: 1px solid #e5e5e5; padding: 15px; border-radius: 8px; }
        .data-table { margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #f8f9fa; font-weight: bold; }
        td, th { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
    </style>
</head>
<body>
<div class="header">
    <h1>Financial Overview Report</h1>
    <p>Generated on: {{ date('Y-m-d H:i:s') }}</p>
</div>

<div class="stats-grid">
    <div class="stat-card">
        <h3>Total Platform Income</h3>
        <p style="font-size: 20px; font-weight: bold; color: #10b981;">R {{ number_format($financialStats['totalPlatformIncome'], 2) }}</p>
    </div>
    <br>
    <div class="stat-card">
        <h3>Total Platform Expenses</h3>
        <p style="font-size: 20px; font-weight: bold; color: #ef4444;">R {{ number_format($financialStats['totalPlatformExpenses'], 2) }}</p>
    </div>
    <br>
    <div class="stat-card">
        <h3>Net Cash Flow</h3>
        <p style="font-size: 20px; font-weight: bold; color: #3b82f6;">R {{ number_format($netCashFlow, 2) }}</p>
    </div>
    <br>
    <div class="stat-card">
        <h3>Average Savings Rate</h3>
        <p style="font-size: 20px; font-weight: bold; color: #8b5cf6;">{{ number_format($financialStats['averageSavingsRate'], 1) }}%</p>
    </div>
    <br>
</div>

<div class="data-table">
    <h3>Top Expense Categories</h3>
    <table>
        <tr>
            <th>Category</th>
            <th>Transaction Count</th>
        </tr>
        @foreach($financialStats['mostCommonCategories'] as $category)
            <tr>
                <td>{{ $category->category }}</td>
                <td>{{ $category->count }}</td>
            </tr>
        @endforeach
    </table>
</div>

<div class="footer">
    Mzansi Budget Buddy - Admin Report
</div>
</body>
</html>
