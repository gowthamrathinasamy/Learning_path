const { test, expect } = require('@playwright/test');

test('Day 2: locator chaining, filtering, and scoping', async ({ page }) => {
	await page.setContent(`
		<main>
			<section aria-label="Products">
				<article class="product">
					<h2>Wireless Mouse</h2>
					<p>Category: Accessories</p>
					<button>Add to cart</button>
				</article>
				<article class="product">
					<h2>Mechanical Keyboard</h2>
					<p>Category: Accessories</p>
					<button>Add to cart</button>
				</article>
				<article class="product">
					<h2>Desk Lamp</h2>
					<p>Category: Lighting</p>
					<button>Add to cart</button>
				</article>
			</section>
		</main>
	`);

	// Scope product queries to the Products section, then chain to its cards.
	const products = page.getByRole('region', { name: 'Products' });
	const productCards = products.locator('article.product');
	await expect(productCards).toHaveCount(3);

	// Filter the cards by content and find a descendant within the match.
	const keyboardCard = productCards.filter({ hasText: 'Mechanical Keyboard' });
	await expect(keyboardCard.getByRole('heading', { name: 'Mechanical Keyboard' })).toBeVisible();
	await expect(keyboardCard.getByRole('button', { name: 'Add to cart' })).toBeVisible();

	// Filter using a locator, then scope the category query to that card.
	const lampHeading = page.getByRole('heading', { name: 'Desk Lamp' });
	const lampCard = productCards.filter({ has: lampHeading });
	await expect(lampCard.locator('p')).toHaveText('Category: Lighting');
});
