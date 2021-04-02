// axios header setup
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector("meta[name='csrf-token']").getAttribute('content');

// Ajax form submit logic
function submitAjaxForm(selector, disable, redirect = null) {
    // select the button, when button pressed
    const disableBtn = document.querySelector(disable)

    document.querySelector(selector).addEventListener('submit', function(event) {
        // prevent the default action this form
        event.preventDefault()

        let required = false

        const requiredFields = document.querySelectorAll('.required')
        if (requiredFields) {
            requiredFields.forEach((element) => {
                element.addEventListener('keyup', () => element.style.border = "")
                // get fields name attribute
                const nameAttributes = element.getAttribute('name')

                // converting text where have `_` or `CamelCase` to `camel case`
                const convertingText = nameAttributes.replace("_", " ")
                                                            .replace( /([A-Z])/g, " $1" )

                const attribute = convertingText.charAt(0).toLowerCase() + convertingText.slice(1).toLowerCase();

                if ("" === element.value) {
                    element.style.border = "1px solid #a94442";

                    element.insertAdjacentHTML('afterend', `<p class="text-danger">This ${ attribute } field is required.</p>`)

                    required = true
                } else {
                    element.style.border = "";
                    clearInputErrors()
                }
            })
        }

        if (required === false) {
            // disable the selected button
            disableBtn.disabled = true

            // ajax submit with axios, we take the form action attribute by calling `this.action`
            axios.post(this.action, new FormData(this))
                .then(() => {
                    // when form submitted successfully the reset the form
                    this.reset()

                    // redirect user, if get redirect url
                    if (redirect !== null) {
                        window.location.href = redirect
                    }

                    // active the selected button again
                    disableBtn.disabled = false
                })
                .catch(({response}) => {
                    // catch the errors
                    const errors = response.data.errors

                    // split the key from errors
                    const items = Object.keys(errors)

                    // clear previous errors when form submit
                    clearInputErrors()

                    // active the selected button again
                    disableBtn.disabled = false

                    // catch the every split keys
                    items.forEach((item) => {
                        // catch dom by id those same as input `name` attribute
                        const firstItemDOM = document.getElementById(item)

                        // if have any errors occurs then show them
                        if (errors.hasOwnProperty(item)) {
                            // show the errors under the input tag
                            firstItemDOM.insertAdjacentHTML('afterend', `<p class="text-danger">${ errors[item][0] }</p>`)
                        }
                    })
                });
        }
    });
}

function clearInputErrors() {
    const clearErrors = document.querySelectorAll('.text-danger')
    clearErrors.forEach((element) => element.textContent = '')
}
