import { expect, type Page, type Locator } from "@playwright/test"

export class CareerPage {
    page

    constructor(page: Page) {
        this.page = page
    }

    async goto() {
        await this.page.goto("/career-page")
    }

    async assertVisibleTitle(pageTitle: string) {
        await expect(this.page).toHaveTitle(pageTitle)
    }

    assertVisibleMainHeading(mainHeading: string) {
        return this.page.getByRole('heading', { name: mainHeading });
    }

    async assertVisibleJobTitle(jobTitle: string, jobIndex?: number) {
        /* NOTE
         * Invoke this method with 'jobIndex' argument only if the job title is not unique.
         * Else ignore the 'jobIndex' argument
         * Indexing starts from zero.
         */
        if (jobIndex !== undefined) {
            expect(this.page.getByRole('heading', { name: jobTitle }).nth(jobIndex)).toBeVisible()
        } else {
            expect(this.page.getByRole('heading', { name: jobTitle })).toBeVisible()
        }
    }

    async assertVisibleJobDescription(jobDescription: string, jobIndex?: number) {
        /* NOTE
         * Invoke this method with 'jobIndex' argument only if the job description is not unique.
         * Else ignore the 'jobIndex' argument
         * Indexing starts from zero.
         */
        if (jobIndex !== undefined) {
            await expect(this.page.getByText(jobDescription).nth(jobIndex)).toBeVisible()
        } else {
            await expect(this.page.getByText(jobDescription)).toBeVisible()
        }
    }

    async assertVisibleApplyButton(jobIndex?: number) {
        /* NOTE
         * Invoke this method with 'jobIndex' argument only if there are more than one job.
         * Else ignore the 'jobIndex' argument
         * Indexing starts from zero.
         */
        if (jobIndex !== undefined) {
            expect(this.page.getByRole('button', { name: 'Apply Now' }).nth(jobIndex)).toBeVisible()
        } else {
            expect(this.page.getByRole('button', { name: 'Apply Now' })).toBeVisible()
        }
    }
}