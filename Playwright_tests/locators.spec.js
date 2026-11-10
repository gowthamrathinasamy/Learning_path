const { test, expect } = require('@playwright/test');

test.describe('Day 1 – Advanced Locators and Locator Strategies', () => {
//Added the HTML content using before each to use for locator testing
    test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<main>
				<h1>Account settings</h1>
				<form>
					<label for="email">Email address</label>
					<input id="email" type="email" placeholder="name@example.com" />
					<button type="submit" data-testid="save-button">Save changes</button>
				</form>
				<section aria-label="Team members">
					<article class="member">
						<h2>Alex Morgan</h2>
						<p>Role: Administrator</p>
						<button>Edit</button>
					</article>
					<article class="member">
						<h2>Jamie Lee</h2>
						<p>Role: Contributor</p>
						<button>Edit</button>
					</article>
				</section>
			</main>
		`);
	});

	test('locates elements by accessible role and name', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Account settings' })).toBeVisible();
		await expect(page.getByRole('button', { name: 'Save changes' })).toBeVisible();
	});

	test('uses label and placeholder locators for form controls', async ({ page }) => {
		const emailByLabel = page.getByLabel('Email address');
		const emailByPlaceholder = page.getByPlaceholder('name@example.com');

		await emailByLabel.fill('alex@example.com');
		await expect(emailByPlaceholder).toHaveValue('alex@example.com');
	});

	test('uses test IDs and CSS locators when appropriate', async ({ page }) => {
		await expect(page.getByTestId('save-button')).toHaveText('Save changes');
		await expect(page.locator('input[type="email"]')).toHaveCount(1);
	});

	test('narrows a locator with filter and chains to a child', async ({ page }) => {
		const alexCard = page
			.getByRole('region', { name: 'Team members' })
			.locator('article')
			.filter({ has: page.getByRole('heading', { name: 'Alex Morgan' }) });

		await expect(alexCard).toHaveCount(1);
		await expect(alexCard.getByText('Role: Administrator')).toBeVisible();
		await alexCard.getByRole('button', { name: 'Edit' }).click();
	});

	test('uses nth for an intentional position in a locator collection', async ({ page }) => {
		const memberCards = page.locator('section[aria-label="Team members"] article');

		await expect(memberCards).toHaveCount(2);
		await expect(memberCards.nth(1).getByRole('heading')).toHaveText('Jamie Lee');
	});
});
