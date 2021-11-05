<template>
	<n-layout-sider
		:collapsed-width="10"
		show-trigger="arrow-circle"
		bordered
		width="300"
		content-style="padding: 1rem;"
	>
		<n-h1 style="text-align: center">Design Your Palette</n-h1>
		<div class="action-btns">
			<n-button type="error">Delete Palette</n-button>
			<n-button type="info">Random Color</n-button>
		</div>
		<n-form
			:model="formValue"
			:rules="rules"
			size="large"
			class="form"
			ref="formRef"
			:show-label="false"
		>
			<ColorPicker
				class="form__color__picker"
				:theme="theme ? 'dark' : 'light'"
				:color="color"
				:width="260"
				:show-alpha="false"
				:disable-input-field="true"
				@changeColor="updateColor"
				:colors-default="[
					'#000000',
					'#FFFFFF',
					'#FF1900',
					'#F47365',
					'#FFB243',
					'#FFE623',
					'#6EFF2A',
					'#1BC7B1',
					'#00BEFF',
					'#2E81FF',
					'#5D61FF',
					'#FF89CF',
					'#FC3CAD',
					'#BF3DCE',
					'#8E00A7'
				]"
			/>
			<n-form-item path="name">
				<n-input
					type="text"
					v-model:value="formValue.name"
					placeholder="Color Name"
				/>
			</n-form-item>
			<n-button
				@click="handleValidateClick"
				class="add-color-btn"
				:color="color"
				:disabled="false"
			>
				Add Color
			</n-button>
		</n-form>
	</n-layout-sider>
</template>

<script>
	import { ColorPicker } from 'vue-color-kit'
	import 'vue-color-kit/dist/vue-color-kit.css'
	import { ref, inject } from 'vue'
	import { useMessage } from 'naive-ui'
	export default {
		components: {
			ColorPicker
		},
		setup(props, { emit }) {
			const defaultColor =
				'#' + (Math.random().toString(16) + '00000').slice(2, 8)
			const color = ref(defaultColor)
			const message = useMessage()
			const theme = inject('theme')

			const formRef = ref(null)
			const formValue = ref({ name: '' })

			const rules = {
				name: {
					type: 'string',
					required: true,
					trigger: 'blur',
					validator: (rule, value) => {
						if (value.trim().length <= 3) {
							return new Error('Name must be of 3 characters.')
						}
					}
				}
			}

			const updateColor = (c) => {
				console.log(c)
				color.value = c.hex
			}

			const handleValidateClick = (e) => {
				e.preventDefault()
				formRef.value.validate((errors) => {
					if (!errors) {
						message.success('Valid')
						emit('addColor', color.value, formValue.value.name)
					} else {
						message.error('Invalid')
					}
				})
			}

			return {
				color,
				formValue,
				formRef,
				updateColor,
				rules,
				handleValidateClick,
				theme
			}
		}
	}
</script>

<style lang="scss" scoped>
	.action-btns {
		display: flex;
		justify-content: space-between;
	}

	.form {
		padding: 1rem 0;
		display: flex;
		flex-direction: column;

		&__color__picker {
			align-self: center;
			margin-bottom: 1rem;
		}
	}

	.add-color-btn {
		width: 100%;
		border: 1px solid rgba(0, 0, 0, 0.2);
	}
</style>
