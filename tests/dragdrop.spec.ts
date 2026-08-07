import { test, expect } from '@playwright/test';

test.describe('Drag and Drop page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dragdrop');
  });

  test('source image and drop target are visible', async ({ page }) => {
    await expect(page.locator('img').first()).toBeVisible();
    await expect(page.getByText('Drop here')).toBeVisible();
  });

  test('dragging the image into the drop zone works', async ({ page }) => {
    const source = page.locator('img').first(); // narrow to a real id/class once you inspect
    const target = page.getByText('Drop here').locator('..'); // the container div, not just the text node

    const sourceBox = await source.boundingBox();
    const targetBox = await target.boundingBox();
    if (!sourceBox || !targetBox) throw new Error('Could not resolve element bounding boxes');

    // Manual mouse sequence instead of locator.dragTo().
    // dragTo() fires native HTML5 DragEvents. Widgets built on jQuery UI
    // draggable/droppable (very likely what this page uses, given the plain
    // "Drop here" div target) listen for raw mousemove events crossing a
    // distance threshold instead — dragTo()'s single jump often never
    // registers as a "drag start", so nothing happens. Stepping the move
    // and adding a small initial nudge fixes it.
    await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(
      sourceBox.x + sourceBox.width / 2 + 5,
      sourceBox.y + sourceBox.height / 2 + 5
    );
    await page.mouse.move(
      targetBox.x + targetBox.width / 2,
      targetBox.y + targetBox.height / 2,
      { steps: 20 }
    );
    await page.mouse.up();

    // TODO: confirm the real success indicator once the drag lands — common
    // patterns are the image moving into the drop zone's DOM subtree, or the
    // drop zone's text/background changing. Run codegen after a successful
    // manual drag in the browser to see exactly what changed, then assert it, e.g.:
    //   await expect(target.locator('img')).toBeVisible();
  });
});
