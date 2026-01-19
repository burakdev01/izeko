<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class FaqRequest extends FormRequest
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
            'question' => ['required', 'string', 'max:255'],
            'answer' => ['required', 'string'],
            'active' => ['nullable', 'boolean'],
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
            'question.required' => "Soru alan\u{0131} zorunludur.",
            'question.string' => 'Soru ge\u{00E7}erli bir metin olmal\u{0131}d\u{0131}r.',
            'question.max' => 'Soru en fazla 255 karakter olabilir.',
            'answer.required' => "Cevap alan\u{0131} zorunludur.",
            'answer.string' => 'Cevap ge\u{00E7}erli bir metin olmal\u{0131}d\u{0131}r.',
            'active.boolean' => "Durum alan\u{0131} ge\u{00E7}ersiz.",
        ];
    }
}
