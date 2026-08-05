
import { test, expect } from '@playwright/test';
import { CareerPage } from "../page-objects/career-page"
import { ApplicationForm } from '../page-objects/application-form';

test.describe.configure({ mode: 'serial' });
test('[1] Verify that the career page loads successfully and validate the page title and main heading.', async ({ page }) => {
  const careerPage = new CareerPage(page)
  await careerPage.goto()
  await careerPage.assertVisibleTitle("Create Next App")
  await careerPage.assertVisibleMainHeading("Join Our Team")
})

test('[2] Verify that all job listings are displayed correctly and each job card contains required information (job title, description, and apply button).', async ({ page }) => {
  const careerPage = new CareerPage(page)
  await careerPage.goto()
  // First job
  await careerPage.assertVisibleJobTitle("Software Engineer", 0)
  await careerPage.assertVisibleJobDescription("Software Engineer We are seeking a highly skilled Software Engineer to join our team in the staffing and recruiting industry, working on a permanent basis in a remote setting,")
  await careerPage.assertVisibleApplyButton(0)
  // Second job
  await careerPage.assertVisibleJobTitle("Software Engineer", 1)
  await careerPage.assertVisibleJobDescription("rdfcgvh")
  await careerPage.assertVisibleApplyButton(1)
})

test('[3] Click on the "Apply" button for a job and verify that the application form opens with all required fields.', async ({ page }) => {
  const applicaitonForm = new ApplicationForm(page)
  await applicaitonForm.goto()
  await applicaitonForm.assertVisibleRequiredFields()
})

test.describe('[5] Verify form behavior.', () => {

  test('Submission with empty fields.', async ({ page }) => {
    const applicationForm = new ApplicationForm(page)
    await applicationForm.goto()
    await applicationForm.verifyEmptySubmissionValidation()
  })

  test('Submission with invalid email.', async ({ page }) => {
    const applicaitonForm = new ApplicationForm(page)
    await applicaitonForm.goto()
    await applicaitonForm.submitInvalidEmail()
  })

  test('Successfull form submission with valid data.', async ({ page }) => {
    const applicaitonForm = new ApplicationForm(page)
    await applicaitonForm.goto()
    await applicaitonForm.submitValidData()
  })

})