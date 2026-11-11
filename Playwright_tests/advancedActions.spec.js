const { test, expect } = require('@playwright/test');

test.describe('Day 3 – Advanced Actions and Element Interactions', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<style>
				#hover-target { padding: 16px; width: fit-content; background: #eee; }
				#drop-zone { min-height: 60px; padding: 16px; border: 1px dashed #555; }
			</style>
			<button id="double-click">Double-click me</button>
			<output id="click-count">0</output>

			<div id="hover-target">Hover over me</div>
			<output id="hover-status">Not hovered</output>

			<div id="context-target">Right-click me</div>
			<output id="context-status">Context menu not opened</output>

			<label for="keyboard-input">Keyboard input</label>
			<input id="keyboard-input" />
			<output id="keyboard-status"></output>

			<div id="drag-source" draggable="true">Drag item</div>
			<div id="drop-zone">Drop here</div>
			<output id="drop-status">Nothing dropped</output>

			<script>
				let count = 0;
				document.querySelector('#double-click').addEventListener('dblclick', () => {
					document.querySelector('#click-count').textContent = String(++count);
				});
				document.querySelector('#hover-target').addEventListener('mouseenter', () => {
					document.querySelector('#hover-status').textContent = 'Hovered';
				});
				document.querySelector('#context-target').addEventListener('contextmenu', event => {
					event.preventDefault();
					document.querySelector('#context-status').textContent = 'Context menu opened';
				});
				document.querySelector('#keyboard-input').addEventListener('keydown', event => {
					document.querySelector('#keyboard-status').textContent = event.key;
				});
				const source = document.querySelector('#drag-source');
				source.addEventListener('dragstart', event => {
					event.dataTransfer.setData('text/plain', source.textContent);
				});
				const dropZone = document.querySelector('#drop-zone');
				dropZone.addEventListener('dragover', event => event.preventDefault());
				dropZone.addEventListener('drop', event => {
					event.preventDefault();
					document.querySelector('#drop-status').textContent = event.dataTransfer.getData('text/plain');
				});
			</script>
		`);
	});

	test('performs a double-click', async ({ page }) => {
		await page.getByRole('button', { name: 'Double-click me' }).dblclick();
		await expect(page.locator('#click-count')).toHaveText('1');
	});

	test('hovers over an element', async ({ page }) => {
		await page.locator('#hover-target').hover();
		await expect(page.locator('#hover-status')).toHaveText('Hovered');
	});

	test('opens a custom context menu with a right-click', async ({ page }) => {
		await page.locator('#context-target').click({ button: 'right' });
		await expect(page.locator('#context-status')).toHaveText('Context menu opened');
	});

	test('uses keyboard actions in an input', async ({ page }) => {
		const input = page.getByRole('textbox', { name: 'Keyboard input' });
		await input.focus();
		await page.keyboard.type('Playwright');
		await page.keyboard.press('End');
		await page.keyboard.press('!');

		await expect(input).toHaveValue('Playwright!');
		await expect(page.locator('#keyboard-status')).toHaveText('!');
	});

	test('drags an element into a drop zone', async ({ page }) => {
		await page.locator('#drag-source').dragTo(page.locator('#drop-zone'));
		await expect(page.locator('#drop-status')).toHaveText('Drag item');
	});
});
