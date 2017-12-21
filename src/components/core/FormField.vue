<template lang="pug">
  .FormField.field

    label.label
      | {{ label }}
      template(v-if='!validations.$params.required')
        span.is-size-7.has-text-grey-light
          |  (optional)

    .control
      template(v-if='type === "select"')
        .select(:class='statusValidationClass',)
          select(v-bind:value='value', @input='updateValue($event.target.value);')
            option(value='').
              {{ placeholder }}
            option(v-for='option in selectOptions', :value='option.value' ).
              {{ option.name }}

      template(v-else)
        input.input(
          ref='input',
          :type='type',
          v-bind:value='value',
          :placeholder='placeholder',
          :class='statusValidationClass',
          @input='updateValue($event.target.value);',
          )

      template(v-if='validations.$dirty')
        template(v-for='(param, paramType) in validations.$params')
          p.help.is-danger(v-if="!validations[paramType]").
            {{ setErrorMessage(validations, paramType) }}
      slot
</template>

<script>

const errorMessages = {
  alpha: 'Please enter characters digits.',
  alphaNum: 'Please enter digits and characters digits.',
  between: 'Please enter a value between {min} and {max}.',
  email: 'Please enter a valid email address.',
  maxLength: 'Please enter no more than {0} characters.',
  maxValue: 'Please enter a value less than or equal to {0}.',
  minLength: 'Please enter at least {min} characters.',
  minValue: 'Please enter a value greater than or equal to {0}.',
  numeric: 'Please enter a valid number.',
  required: 'This field is required.',
  sameAs: 'Please enter the same value again.',
  url: 'Please enter a valid URL.',
}

export default {
  name: 'FormField',
  props: {
    value: {
      default: '',
      type: String,
      required: false,
    },
    label: {
      default: 'Label',
      type: String,
      required: true,
    },
    placeholder: {
      default: '',
      type: String,
      required: false,
    },
    options: {
      default: function () {
        return []
      },
      type: Array,
      required: false,
    },
    type: {
      default: 'text',
      type: String,
      required: false,
      validator: function (inputType) {
        const inputTypes = ['button',
          'select',
          'checkbox',
          'color',
          'date',
          'datetime-local',
          'email',
          'file',
          'hidden',
          'image',
          'month',
          'number',
          'password',
          'radio',
          'range',
          'reset',
          'search',
          'submit',
          'tel',
          'text',
          'time',
          'url',
          'week',
        ]
        return inputTypes.includes(inputType)
      },
    },
    validations: {
      default: function () {
        return { }
      },
      type: Object,
      required: false,
    },
  },
  data () {
    return {
      errorMessages: errorMessages,
      selectOptions: [],
    }
  },
  computed: {
    statusValidationClass () {
      const isDirty = this.validations.$dirty
      const isInvalid = this.validations.$invalid
      return {
        'is-danger': (isDirty && isInvalid),
        'is-success': (isDirty && !isInvalid),
      }
    },
  },
  methods: {
    setErrorMessage (validations, paramType) {
      let errorMessage = this.errorMessages[paramType]
      Object.keys(validations.$params[paramType]).forEach((propertyValidate) => {
        let pattern = new RegExp(`{${propertyValidate}}`, 'g')
        let replaceTo = validations.$params[paramType][propertyValidate]
        errorMessage = errorMessage.replace(pattern, replaceTo)
      })
      return errorMessage
    },
    updateValue (value) {
      this.validations.$touch()
      this.$emit('input', value)
    },
  },
}
</script>

<style lang="stylus">
// .FormField
</style>
