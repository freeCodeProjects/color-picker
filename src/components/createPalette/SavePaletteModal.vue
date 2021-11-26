<template>
	<n-modal v-model:show="showSaveModal" @update:show="$emit('closeModal')">
		<n-card
			style="width: min-content"
			title="Save Palette"
			header-style="text-align: center"
			:bordered="false"
			size="medium"
		>
			<n-form
				:model="formValue"
				:rules="rules"
				size="large"
				class="form"
				ref="formRef"
				:show-label="false"
			>
				<n-form-item path="name">
					<n-input
						type="text"
						v-model:value="formValue.name"
						placeholder="Palette Name"
					/>
				</n-form-item>
				<n-form-item path="emoji">
					<n-input
						type="text"
						v-model:value="formValue.emoji"
						placeholder="Choose a Emoji from below"
						:disabled="true"
					/>
				</n-form-item>
				<Picker :data="emojiIndex" set="google" @select="selectEmoji" />
				<n-button
					@click="handleValidateClick"
					type="primary"
					style="margin-top: 1rem"
					:disabled="loading"
					:loading="loading"
				>
					Save
				</n-button>
				<n-button
					@click="$emit('closeModal')"
					type="default"
					style="margin-left: 1rem"
				>
					Cancel
				</n-button>
			</n-form>
		</n-card>
	</n-modal>
</template>

<script>
	import { ref } from 'vue'
	import data from 'emoji-mart-vue-fast/data/all.json'
	import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src'
	import 'emoji-mart-vue-fast/css/emoji-mart.css'

	export default {
		components: {
			Picker
		},
		props: {
			showSaveModal: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			}
		},
		emits: ['savePalette', 'closeModal'],
		setup(props, { emit }) {
			const emojiIndex = new EmojiIndex(data)
			const formRef = ref(null)
			const formValue = ref({ name: '', emoji: '' })

			const rules = {
				name: {
					type: 'string',
					required: true,
					trigger: 'blur',
					validator: (rule, value) => {
						if (value.trim().length < 5) {
							return new Error('Name must be atleast 5 characters long.')
						}
					}
				},
				emoji: {
					type: 'string',
					required: true,
					trigger: 'blur',
					validator: (rule, value) => {
						if (value.trim().length < 1) {
							return new Error('Choose a emoji from below.')
						}
					}
				}
			}

			const selectEmoji = (emoji) => {
				console.log(emoji.native)
				formValue.value.emoji = emoji.native
			}

			const handleValidateClick = (e) => {
				e.preventDefault()
				formRef.value.validate((errors) => {
					if (!errors) {
						submitForm()
					}
				})
			}

			const submitForm = () => {
				emit('savePalette', formValue.value)
			}

			return {
				emojiIndex,
				selectEmoji,
				formRef,
				formValue,
				rules,
				handleValidateClick
			}
		}
	}
</script>
