import { expect, type Page, type Locator } from "@playwright/test"

export class CareerPage {
    page
    pageTitle
    mainHeading

    constructor(page: Page) {
        this.page = page
        // Initializing static contents of the career page
        this.pageTitle = "Create Next App"
        this.mainHeading = "Join Our Team"
    }

    async goto() {
        await this.page.goto("/career-page")
    }

    assertTitle() {
        expect(this.page).toHaveTitle(this.pageTitle)
    }

    getMainHeadingLocator(): Locator {
        return this.page.getByRole('heading', { name: this.mainHeading });
    }

    getJobCardLocator(jobTitle: string, jobDescription: string, jobIndex: number | undefined) {
        /* NOTE
         * Omit the argument 'jobIndex' if the career-page has only 1 job post.
         * And if the career-page has more than 1 job, this fucntion expects an integer in 'jobIndex' parameter
         * Indexing starts from zero.
         */
        if (jobIndex !== undefined) {
            return this.page.getByRole('heading', { name: jobTitle }).nth(jobIndex)
        } else {
            return this.page.getByRole('heading', { name: jobTitle })
        }
    }

    getApplyButtonLocator(jobIndex: number | undefined) {
        /* NOTE
         * Omit the argument 'jobIndex' if the career-page has only 1 job post.
         * And if the career-page has more than 1 job, this fucntion expects an integer in 'jobIndex' parameter
         * Indexing starts from zero.
         */
        if (jobIndex !== undefined) {
            return this.page.getByRole('button', { name: 'Apply Now' }).nth(jobIndex)
        } else {
            return this.page.getByRole('button', { name: 'Apply Now' })
        }
    }
}