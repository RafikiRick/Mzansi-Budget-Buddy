<?php

namespace App\Actions\Fortify;

use App\Models\User;
use App\Rules\AllowedEmailDomains;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255', 'regex:/^[A-Za-z\s]+$/'], // Regex Name Validation
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
                new AllowedEmailDomains, // Enabling New Domain Rule
            ],
            'password' => $this->passwordRules(),
        ], [
            'name.regex' => 'The name field may only contain letters and spaces.', // Name Error Handling
        ])->validate();

        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
        ]);
    }
}
