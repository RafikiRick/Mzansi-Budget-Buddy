<!DOCTYPE html>
<html>
<head>
    <title>User Growth Report - Mzansi Budget Buddy</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .header { text-align: center; margin-bottom: 30px; }
        .chart-placeholder { height: 300px; background: #f8f9fa; display: flex; align-items: center; justify-content: center; margin: 20px 0; }
        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0; }
        .stat-card { border: 1px solid #e5e5e5; padding: 15px; border-radius: 8px; }
        .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
    </style>
</head>
<body>
<div class="header">
    <h1>User Growth Report</h1>
    <p>Generated on: {{ date('Y-m-d H:i:s') }}</p>
</div>

<div class="data-table">
    <h3>User Growth Data</h3>
    <table style="width: 100%; border-collapse: collapse;">
        <tr style="background: #f8f9fa;">
            <th style="border: 1px solid #ddd; padding: 8px;">Month</th>
            <th style="border: 1px solid #ddd; padding: 8px;">New Users</th>
        </tr>
        @foreach($userGrowth as $month)
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">{{ $month['month'] }}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">{{ $month['count'] }}</td>
            </tr>
        @endforeach
    </table>
</div>

<div class="stats-grid">
    <div class="stat-card">
        <h3>Total Users (6 months)</h3>
        <p style="font-size: 24px; font-weight: bold; color: #3b82f6;">{{ $totalUsers }}</p>
    </div>
    <div class="stat-card">
        <h3>Latest Growth</h3>
        <p style="font-size: 24px; font-weight: bold; color: #10b981;">+{{ $latestGrowth }}%</p>
    </div>
</div>

<div class="footer">
    Mzansi Budget Buddy - Admin Report
</div>
</body>
</html>
