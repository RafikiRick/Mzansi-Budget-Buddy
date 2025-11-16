<!DOCTYPE html>
<html>
<head>
    <title>Savings Performance Report - Mzansi Budget Buddy</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .header { text-align: center; margin-bottom: 30px; }
        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0; }
        .stat-card { border: 1px solid #e5e5e5; padding: 15px; border-radius: 8px; }
        .progress-bar { background: #e5e7eb; border-radius: 10px; height: 20px; margin: 10px 0; }
        .progress-fill { background: #10b981; height: 100%; border-radius: 10px; }
        .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
    </style>
</head>
<body>
<div class="header">
    <h1>Savings Performance Report</h1>
    <p>Generated on: {{ date('Y-m-d H:i:s') }}</p>
</div>

<div class="stats-grid">
    <div class="stat-card">
        <h3>Success Rate</h3>
        <p style="font-size: 20px; font-weight: bold; color: #10b981;">{{ number_format($savingsStats['successRate'], 1) }}%</p>
        <p style="font-size: 12px; color: #666;">User success rate</p>
    </div>
    <br>
    <div class="stat-card">
        <h3>Total Goals</h3>
        <p style="font-size: 20px; font-weight: bold; color: #3b82f6;">{{ $savingsStats['totalGoals'] }}</p>
        <p style="font-size: 12px; color: #666;">All savings goals</p>
    </div>
    <br>
    <div class="stat-card">
        <h3>Completed Goals</h3>
        <p style="font-size: 20px; font-weight: bold; color: #8b5cf6;">{{ $savingsStats['completedGoals'] }}</p>
        <p style="font-size: 12px; color: #666;">Successfully achieved</p>
    </div>
    <br>
    <div class="stat-card">
        <h3>Completion Rate</h3>
        <p style="font-size: 20px; font-weight: bold; color: #f59e0b;">{{ number_format($completionRate, 1) }}%</p>
        <p style="font-size: 12px; color: #666;">Goal completion rate</p>
    </div>
</div>

<div style="margin: 20px 0;">
    <h3>Goal Progress Overview</h3>

    <div style="margin: 15px 0;">
        <div style="display: flex; justify-content: between; margin-bottom: 5px;">
            <span>Completed Goals</span>
            <span>{{ $savingsStats['completedGoals'] }} / {{ $savingsStats['totalGoals'] }}</span>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: {{ $completionRate }}%;"></div>
        </div>
    </div>

    <div style="margin: 15px 0;">
        <div style="display: flex; justify-content: between; margin-bottom: 5px;">
            <span>Active Goals</span>
            <span>{{ $activeGoals }} / {{ $savingsStats['totalGoals'] }}</span>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: {{ $activeGoalsPercentage }}%; background: #3b82f6;"></div>
        </div>
    </div>
</div>

<div class="footer">
    Mzansi Budget Buddy - Admin Report
</div>
</body>
</html>
