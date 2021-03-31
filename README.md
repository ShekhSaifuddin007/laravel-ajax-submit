## Ajax form submit 

You don't need to use Laravel for use this, You can use this without Laravel.

Just copy the files from `public/js/axios`

- 

### How to Use

- for globally use your master file put this end of body tag like this.

```html
<body>
    <script src="{{ asset('/js/axios/axios_0.21.1.js') }}"></script>
    <script src="{{ asset('/js/axios/ajaxFormSubmit.js') }}"></script>
    
    @stack('scripts')
</body>
```

- or inside `head` tag with `defer` attribute.

```html
<head>
    <script src="{{ asset('/js/axios/axios_0.21.1.js') }}" defer></script>
    <script src="{{ asset('/js/axios/ajaxFormSubmit.js') }}" defer></script>
</head>
```

- then inside your form blade use like below.
```html
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

@push('scripts')
    <script>
        submitAjaxForm(
            "#userForm",
            "#btnDisable",
            "{{ route('/') }}"
        )
    </script>
@endpush
```

- Here you can see I give `id` and `name` are same otherwise it will not show the validation error below the input field.

- This function takes 3 parameter first is form id then the form button id and last is redirect url but this is optional.

### from controller 

```php
public function store(UsersRequest $request)
{
    User::create($request->validated());
    
    // if you want to show the flash message then do like this.
    $request->session()->flash('message', 'You are redirected successfully.! Bro wow...');

    return response()->json(['status'=>'Hooray']);
}
```
