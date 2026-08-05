import { expect, type Page } from "@playwright/test"
import { applicationFormData } from "../test-data/application-form-data"

export class ApplicationForm {
    page

    constructor(page: Page) {
        this.page = page
    }

    async goto() {
        await this.page.goto("/career-page")
        await this.page.getByRole('button', { name: 'Apply Now' }).first().click();
        await this.page.getByRole('button', { name: 'Enter details manually Fill' }).click();
    }

    async assertVisibleRequiredFields() {
        await expect(this.page.getByText('First name*')).toBeVisible();
        await expect(this.page.getByRole('textbox', { name: 'First name*' })).toBeVisible();
        await expect(this.page.getByText('Last name*')).toBeVisible();
        await expect(this.page.getByRole('textbox', { name: 'Last name*' })).toBeVisible();
        await expect(this.page.getByText('Email*')).toBeVisible();
        await expect(this.page.getByRole('textbox', { name: 'Email*' })).toBeVisible();
        await expect(this.page.getByText('Phone*')).toBeVisible();
        await expect(this.page.getByRole('textbox', { name: 'Phone*' })).toBeVisible();
        await expect(this.page.getByText('Current title*')).toBeVisible();
        await expect(this.page.getByRole('textbox', { name: 'Current title*' })).toBeVisible();
        await expect(this.page.getByText('Current company*')).toBeVisible();
        await expect(this.page.getByRole('textbox', { name: 'Current company*' })).toBeVisible();
        await expect(this.page.getByText('Years of experience*')).toBeVisible();
        await expect(this.page.getByRole('spinbutton', { name: 'Years of experience*' })).toBeVisible();
        await expect(this.page.getByText('City*')).toBeVisible();
        await expect(this.page.getByRole('textbox', { name: 'City*' })).toBeVisible();
        await expect(this.page.getByText('State*')).toBeVisible();
        await expect(this.page.getByRole('textbox', { name: 'State*' })).toBeVisible();
        await expect(this.page.getByText('Country*')).toBeVisible();
        await expect(this.page.getByRole('textbox', { name: 'Country*' })).toBeVisible();
        await expect(this.page.getByRole('checkbox', { name: 'I agree to the terms and conditions' })).toBeVisible();
    }

    async verifyEmptySubmissionValidation() {
        /** 
         * Assertion on [required] attribute will do the job because the mandatory fields
         * have [required] attribute. If the user tries to submit with empty
         * value in mandatory fields, browser will block the submission automatically.
         **/

        await expect(this.page.getByRole('textbox', { name: 'First name*' })).toHaveAttribute("required");
        await expect(this.page.getByRole('textbox', { name: 'Last name*' })).toHaveAttribute("required");
        await expect(this.page.getByRole('textbox', { name: 'Email*' })).toHaveAttribute("required");
        await expect(this.page.getByRole('textbox', { name: 'Phone*' })).toHaveAttribute("required");
        await expect(this.page.getByRole('textbox', { name: 'Current title*' })).toHaveAttribute("required");
        await expect(this.page.getByRole('textbox', { name: 'Current company*' })).toHaveAttribute("required");
        await expect(this.page.getByRole('spinbutton', { name: 'Years of experience*' })).toHaveAttribute("required");
        await expect(this.page.getByRole('textbox', { name: 'City*' })).toHaveAttribute("required");
        await expect(this.page.getByRole('textbox', { name: 'State*' })).toHaveAttribute("required");
        await expect(this.page.getByRole('textbox', { name: 'Country*' })).toHaveAttribute("required");
        await expect(this.page.getByRole('checkbox', { name: 'I agree to the terms and' })).toHaveAttribute("required");

    }

    async submitInvalidEmail() {
        /** 
         * Assertion on [type="email"] attribute will do the job because email field
         * has [type="email"] attribute. If the user tries to submit with invalid email, the 
         * browser will block the form submission automatically.
         * 
         **/
        await expect(this.page.getByRole('textbox', { name: 'email' })).toHaveAttribute("type", "email");
    }

    async submitValidData() {

        await this.page.getByRole('textbox', { name: 'First name*' }).fill(applicationFormData.firstName);
        await this.page.getByRole('textbox', { name: 'Last name*' }).fill(applicationFormData.lastName);
        await this.page.getByRole('textbox', { name: 'Email*' }).fill(applicationFormData.email);
        await this.page.getByRole('textbox', { name: 'Phone*' }).fill(applicationFormData.phone);
        await this.page.getByRole('textbox', { name: 'Current title*' }).fill(applicationFormData.currentTitle);
        await this.page.getByRole('textbox', { name: 'Current company*' }).fill(applicationFormData.currentCompany);
        await this.page.getByRole('spinbutton', { name: 'Years of experience*' }).fill(applicationFormData.yearsOfExperience);
        await this.page.getByRole('textbox', { name: 'City*' }).fill(applicationFormData.city);
        await this.page.getByRole('textbox', { name: 'State*' }).fill(applicationFormData.state);
        await this.page.getByRole('textbox', { name: 'Country*' }).fill(applicationFormData.country);
        await this.page.getByRole('checkbox', { name: 'I agree to the terms and' }).check();
        await this.page.getByRole('button', { name: 'Submit application' }).click();
        await expect(this.page.getByText('Application submitted')).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Done' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Close' }).click();
        await expect(this.page.getByText('Application submitted')).toBeHidden();
    }
}