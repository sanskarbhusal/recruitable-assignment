
import { test, expect } from '@playwright/test';

test('[1] Verify that the career page loads successfully and validate the page title and main heading.', async ({ page }) => {
  await page.goto("/career-page");
  await expect(page).toHaveTitle("Create Next App");
  await expect(page.getByRole('heading', { name: 'Join Our Team' })).toBeVisible();
})

test('[2] Verify that all job listings are displayed correctly and each job card contains required information (job title, description, and apply button).', async ({ page }) => {
  await page.goto("/career-page")
  // Job no 1
  await expect(page.getByRole('heading', { name: 'Software Engineer' }).nth(0)).toBeVisible();
  await expect(page.getByText('Software Engineer We are')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Apply Now' }).nth(0)).toBeVisible();
  // Job no 2 
  await expect(page.getByRole('heading', { name: 'Software Engineer' }).nth(1)).toBeVisible();
  await expect(page.getByText('rdfcgvh')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Apply Now' }).nth(1)).toBeVisible();
})

test('[3] Click on the "Apply" button for a job and verify that the application form opens with all required fields.', async ({ page }) => {
  await page.goto("/career-page")

  await expect(page.getByRole('button', { name: 'Apply Now' }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: 'Apply Now' }).first().click();
  await page.getByRole('button', { name: 'Enter details manually Fill' }).click();
  await expect(page.getByText('First name*')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'First name*' })).toBeVisible();
  await expect(page.getByText('Last name*')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Last name*' })).toBeVisible();
  await expect(page.getByText('Email*')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Email*' })).toBeVisible();
  await expect(page.getByText('Phone*')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Phone*' })).toBeVisible();
  await expect(page.getByText('Current title*')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Current title*' })).toBeVisible();
  await expect(page.getByText('Current company*')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Current company*' })).toBeVisible();
  await expect(page.getByText('Years of experience*')).toBeVisible();
  await expect(page.getByRole('spinbutton', { name: 'Years of experience*' })).toBeVisible();
  await expect(page.getByText('City*')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'City*' })).toBeVisible();
  await expect(page.getByText('State*')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'State*' })).toBeVisible();
  await expect(page.getByText('Country*')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Country*' })).toBeVisible();
  await expect(page.getByRole('checkbox', { name: 'I agree to the terms and conditions' })).toBeVisible();
})

test.describe('[5] Verify form behavior.', () => {

  test('Submission with empty fields.', async ({ page }) => {
    page.goto("/career-page")
    await page.getByRole('button', { name: 'Apply Now' }).first().click();
    await page.getByRole('button', { name: 'Enter details manually Fill' }).click();

    /** 
     * Assertion on [required] attribute will do the job because the mandatory fields
     * have [required] attribute. If the user tries to submit with empty
     * value in mandatory fields, browser will block the submission automatically.
     **/

    await expect(page.getByRole('textbox', { name: 'First name*' })).toHaveAttribute("required");
    await expect(page.getByRole('textbox', { name: 'Last name*' })).toHaveAttribute("required");
    await expect(page.getByRole('textbox', { name: 'Email*' })).toHaveAttribute("required");
    await expect(page.getByRole('textbox', { name: 'Phone*' })).toHaveAttribute("required");
    await expect(page.getByRole('textbox', { name: 'Current title*' })).toHaveAttribute("required");
    await expect(page.getByRole('textbox', { name: 'Current company*' })).toHaveAttribute("required");
    await expect(page.getByRole('spinbutton', { name: 'Years of experience*' })).toHaveAttribute("required");
    await expect(page.getByRole('textbox', { name: 'City*' })).toHaveAttribute("required");
    await expect(page.getByRole('textbox', { name: 'State*' })).toHaveAttribute("required");
    await expect(page.getByRole('textbox', { name: 'Country*' })).toHaveAttribute("required");
    await expect(page.getByRole('checkbox', { name: 'I agree to the terms and' })).toHaveAttribute("required");
  })

  test('Submission with invalid email.', async ({ page }) => {
    page.goto("/career-page")
    await page.getByRole('button', { name: 'Apply Now' }).first().click();
    await page.getByRole('button', { name: 'Enter details manually Fill' }).click();

    /** 
     * Assertion on [type="email"] attribute will do the job because email field
     * has [type="email"] attribute. If the user tries to submit with invalid email, the 
     * browser will block the form submission automatically.
     * 
     **/
    await expect(page.getByRole('textbox', { name: 'email' })).toHaveAttribute("type", "email");
  })

  test('Successfull form submission with valid data.', async ({ page }) => {
    page.goto("/career-page")
    await page.getByRole('button', { name: 'Apply Now' }).first().click();
    await page.getByRole('button', { name: 'Enter details manually Fill' }).click();

    await page.getByRole('textbox', { name: 'First name*' }).fill('Sanskar');
    await page.getByRole('textbox', { name: 'Last name*' }).fill('Bhusal');
    await page.getByRole('textbox', { name: 'Email*' }).fill('sanskarbhusal123@gmail.com');
    await page.getByRole('textbox', { name: 'Phone*' }).fill('9876543210');
    await page.getByRole('textbox', { name: 'Current title*' }).fill('QA Intern');
    await page.getByRole('textbox', { name: 'Current company*' }).fill('XYZ pvt ltd.');
    await page.getByRole('spinbutton', { name: 'Years of experience*' }).fill('1');
    await page.getByRole('textbox', { name: 'City*' }).fill('Lalitpur');
    await page.getByRole('textbox', { name: 'State*' }).fill('Bagmati');
    await page.getByRole('textbox', { name: 'Country*' }).fill('Nepal');
    await page.getByRole('checkbox', { name: 'I agree to the terms and' }).check();
    await page.getByRole('button', { name: 'Submit application' }).click();
    await expect(page.getByText('Application submitted')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Done' })).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByText('Application submitted')).toBeHidden();
  })

})