define(function(require){

	var Vue = require('http://cdnjs.cloudflare.com/ajax/libs/vue/1.0.24/vue.min.js'),
		validator = require('validator');

	Vue.use(validator);

	Vue.filter('JSON', function (value) {
		return JSON.stringify(value,null, "\t");
	});

	var App = new Vue({
		el: '#app',
		data: {
			validator: {},
			form: {
				name: '',
				age: null,
				check: false,
				pattern: '',
				email: '',
				addresses: [],
				addresses2: [],
				text: ''
			}
		},
		components: {
			test: {
				template: '<input type="text" v-model="text" value="">',
				compiled: function () {
					this.$watch('text', function (value) {
						this.$parent.form.text = value;
					})
				}
			}
		},
		computed: {
			isValid: function () {
				this.validator;

				return Object.keys(this.validator.form).every(function (key) {
					return this.validator.form[key].valid;
				}.bind(this));
			},
			isModified: function () {
				this.validator;

				return Object.keys(this.validator.form).some(function (key) {
					return this.validator.form[key].modified;
				}.bind(this));
			}
		},
		methods: {
			addAddress: function (e) {
				this.form.addresses2.push({v:e.target.value});
				e.target.value = '';
			},
			onSave: function () {
				alert('form is '+(this.$valid() ? 'VALID' : 'INVALID'));
			}
		}
	});

});

