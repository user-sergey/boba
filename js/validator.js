// initialize the validator function
(function ($) {
  const validator = {
    checkField: (e) => {
      const len = e.target.value.length
      if (len >= 3 && len <= 10) return true
      return false 
    },
    keypress: (e) => console.log(e),
    checkAll: (e) => {
      const ctx = e.context[0].elements
      const inputs = new Array(...ctx).map((inp, i) => { console.log(inp); if (inp.className === '') return inp}).filter(e => e)
      const valid = inputs.map(inp => inp.value.length >= 3 && inp.value.length <= 10)
      console.log(valid)
      if (valid.includes(false)) return false
      return true 
    },
  }
// validate a field on "blur" event, a 'select' on 'change' event &amp; a '.reuired' classed multifield on 'keyup':
  $('form').on(
    'blur', 'input[required], input.optional, select.required', validator.checkField
    ).on(
      'change', 'select.required', validator.checkField
      ).on(
        'keypress', 'input[required][pattern]', validator.keypress
        );
  $('.multi.required').on('keyup blur', 'input', function() {
    validator.checkField.apply($(this).siblings().last()[0]);
  });
  // bind the validation to the form submit event
  //$('#send').click('submit');//.prop('disabled', true);
  $('form').submit(function(e) {
    e.preventDefault();
    var submit = true;
    // evaluate the form using generic validaing
    if (!validator.checkAll($(this))) {
        submit = false;
    }
    if (submit) this.submit();
    return false;
  });
})(jQuery);