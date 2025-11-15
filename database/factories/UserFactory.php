<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= 'password',
            'remember_token' => Str::random(10),
            'two_factor_secret' => Str::random(10),
            'two_factor_recovery_codes' => Str::random(10),
            'two_factor_confirmed_at' => now(),
            'created_at' => $this->faker->dateTimeBetween('-6 months', '-1 month'), // Spread over 6 months
            'updated_at' => $this->faker->dateTimeBetween('-6 months', '-1 month'),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    public function configure(): Factory|UserFactory
    {
        return $this->afterCreating(function (User $user) {
            \Log::info("Creating financial data for user: " . $user->id);
            $this->createUserFinancialData($user);
            \Log::info("Completed user: " . $user->id);
        });
    }

    private function createUserFinancialData(User $user): void
    {
        $incomeTier = $this->determineIncomeTier();

        // Create incomes
        $this->createIncomes($user, $incomeTier);

        // Create expenses for each of the last 6 months
        foreach (range(0, 5) as $monthOffset) {
            $this->createMonthlyExpenses($user, $incomeTier, $monthOffset);
        }

        // Create savings goals
        $this->createSavingsGoals($user, $incomeTier);
    }

    private function determineIncomeTier(): string
    {
        $random = rand(1, 100);
        if ($random <= 20) return 'high';      // 20% high income
        if ($random <= 70) return 'middle';    // 50% middle income
        return 'low';                          // 30% low income
    }

    private function createIncomes(User $user, $tier): void
    {
        $ranges = [
            'low' => [3500, 15000],
            'middle' => [15000, 45000],
            'high' => [45000, 120000]
        ];

        $sources = ['Salary', 'Freelance', 'Business', 'Investments', 'Side Hustle'];

        // 1-2 income sources
        $numSources = rand(1, 2);

        for ($i = 0; $i < $numSources; $i++) {
            $user->incomes()->create([
                'title' => $sources[$i],
                'amount' => rand($ranges[$tier][0], $ranges[$tier][1]) / $numSources,
                'source' => $sources[$i],
                'date' => $this->faker->dateTimeBetween('-6 months', 'now'),
            ]);
        }
    }

    private function createMonthlyExpenses(User $user, $tier, $monthOffset): void
    {
        $categories = [
            'Housing', 'Food', 'Transport', 'Utilities',
            'Healthcare', 'Education', 'Entertainment', 'Debt'
        ];

        $expenseRatios = [
            'Housing' => 0.35, 'Food' => 0.15, 'Transport' => 0.10,
            'Utilities' => 0.08, 'Healthcare' => 0.07, 'Education' => 0.08,
            'Entertainment' => 0.12, 'Debt' => 0.05
        ];

        $totalIncome = $user->incomes->sum('amount');
        $expenses = [];

        foreach ($expenseRatios as $category => $ratio) {
            $expenses[] = [
                'title' => $category . ' Expenses',
                'amount' => $totalIncome * $ratio * (0.8 + (rand(0, 40) / 100)),
                'category' => $category,
                'date' => now()->subMonths($monthOffset)->startOfMonth(),
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Batch insert all expenses for this month
        \DB::table('expenses')->insert($expenses);
    }

    private function createSavingsGoals(User $user, $tier): void
    {
        $goals = [
            ['Emergency Fund', 3, 6], // 3-6 months expenses
            ['Vacation', 0.5, 2],     // 0.5-2x monthly income
            ['Car', 6, 24],           // 6-24x monthly income
            ['House Deposit', 12, 60] // 12-60x monthly income
        ];

        $numGoals = rand(1, 3);
        $selectedGoals = $this->faker->randomElements($goals, $numGoals);

        $monthlyIncome = $user->incomes->sum('amount');

        foreach ($selectedGoals as $goal) {
            $target = $monthlyIncome * rand($goal[1] * 1000, $goal[2] * 1000) / 1000;
            $saved = $target * (rand(10, 80) / 100); // 10-80% progress

            $user->savings()->create([
                'name' => $goal[0],
                'target_amount' => $target,
                'saved_amount' => $saved,
                'deadline' => $this->faker->dateTimeBetween('+3 months', '+2 years'),
                'description' => 'Savings goal for ' . $goal[0],
            ]);
        }
    }

    /**
     * Indicate that the model does not have two-factor authentication configured.
     */
    public function withoutTwoFactor(): static
    {
        return $this->state(fn (array $attributes) => [
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
            'two_factor_confirmed_at' => null,
        ]);
    }
}
