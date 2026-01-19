<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class FaqReorderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'order' => ['required', 'array'],
            'order.*' => ['integer', 'exists:faqs,id'],
        ];
    }

    /**
     * Get the custom validation messages that apply to the request.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'order.required' => "S\u{0131}ralama bilgisi zorunludur.",
            'order.array' => "S\u{0131}ralama bilgisi liste olmal\u{0131}d\u{0131}r.",
            'order.*.integer' => "S\u{0131}ralama de\u{011F}erleri say\u{0131}sal olmal\u{0131}d\u{0131}r.",
            'order.*.exists' => "Se\u{00E7}ilen soru bulunamad\u{0131}.",
        ];
    }
}
