<x-guest-layout>
    @push('styles')
        <style>
            .text-danger {
                --tw-text-opacity: 1;
                color: rgba(220, 38, 38, var(--tw-text-opacity));
                font-size: 0.875rem;
                line-height: 1.25rem;
            }
            .disable:disabled {
                cursor: not-allowed;
            }
        </style>
    @endpush
    <x-jet-authentication-card>
        <x-slot name="logo">
            <x-jet-authentication-card-logo />
        </x-slot>

{{--        <x-jet-validation-errors class="mb-4" />--}}

        @if (session('status'))
            <div class="mb-4 font-medium text-sm text-green-600">
                {{ session('status') }}
            </div>
        @endif

        <form method="post" action="{{ route('users.store') }}" id="userForm">
            <div>
                <label for="name">Name</label>
                <input id="name" name="name" class="block mt-1 w-full" type="text" value="{{ old('name') }}" autofocus />
            </div>

            <div class="mt-4">
                <label for="email">Email</label>
                <input id="email" name="email" class="block mt-1 w-full" type="email" value="{{ old('email') }}" />
            </div>

            <div class="mt-4">
                <label for="password">Password</label>
                <input id="password" name="password" class="block mt-1 w-full" type="password" />
            </div>

            <div class="mt-4">
                <label for="password_confirmation">Confirm Password</label>
                <input id="password_confirmation" name="password_confirmation" type="password" class="mt-1 block w-full" />
            </div>
        </form>
    </x-jet-authentication-card>

    @push('scripts')
        <script>
            submitAjaxForm(
                "#userForm",
                "#btnDisable",
                "{{ route('/') }}"
            )
        </script>
    @endpush
</x-guest-layout>
