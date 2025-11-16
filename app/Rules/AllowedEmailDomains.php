<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class AllowedEmailDomains implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $allowedDomains = [
            'gmail.com',
            'yahoo.com',
            'hotmail.com',
            'aol.com',
            'outlook.com',
            'comcast.net',
            'icloud.com',
            'msn.com',
            'hotmail.co.uk',
            'sbcglobal.net',
            'live.com',
            'yahoo.co.in',
            'me.com',
            'att.net',
            'mail.ru',
            'bellsouth.net',
            'rediffmail.com',
            'cox.net',
            'yahoo.co.uk',
            'verizon.net',
            'ymail.com',
            'hotmail.it',
            'yahoo.com.tw',
            'mac.com',
            'live.se',
            'live.nl',
            'yahoo.com.br',
            'googlemail.com',
            'libero.it',
            'web.de',
            'btinternet.com',
            'online.no',
            'yahoo.com.au',
            'live.dk',
            'earthlink.net',
            'yahoo.fr',
            'yahoo.it',
            'gmx.de',
            'hotmail.fr',
            'yahoo.de',
            '163.com',
            'naver.com',
            'bigpond.com',
            'rocketmail.com',
            'live.no',
            'yahoo.ca',
            'bigpond.net.au',
            'hotmail.se',
            'gmx.at',
            'live.co.uk',
            'mail.com',
            'yahoo.in',
            'yandex.ru',
            'qq.com',
            'charter.net',
            'indeedemail.com',
            'alice.it',
            'hotmail.de',
            'bluewin.ch',
            'optonline.net',
            'wp.pl',
            'yahoo.es',
            'hotmail.no',
            'orange.fr',
            'live.it',
            'yahoo.co.id',
            'yahoo.no',
            'hotmail.es',
            'juno.com',
            'wanadoo.fr',
            'facebook.com',
            'yahoo.se',
            'rogers.com',
            'yahoo.com.hk',
            'live.com.au',
            'uol.com.br',
            'shaw.ca',
            't-online.de',
            'yahoo.com.mx',
            'yahoo.com.sg',
            'yahoo.dk'
        ];

        $domain = strtolower(explode('@', $value)[1] ?? '');

        if (!in_array($domain, $allowedDomains)) {
            $fail('The email domain is not allowed. Please use a common email provider.');
        }
    }
}
