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

    // Locator Getters 

    getMainHeading(): Locator {
        return this.page.getByRole('heading', { name: this.mainHeading });
    }

    getJobByTitle(jobTitle: string, jobIndex: number | undefined): Locator {
        /* NOTE
         * Invoke this method with 'jobIndex' argument only if the 'jobTitle' is not unique.
         * Else ignore the 'jobIndex' argument
         * Indexing starts from zero.
         */
        if (jobIndex !== undefined) {
            return this.page.getByRole('heading', { name: jobTitle }).nth(jobIndex)
        } else {
            return this.page.getByRole('heading', { name: jobTitle })
        }
    }

    getJobByDescription(jobDescription: string): Locator {
        return this.page.getByText(jobDescription)
    }

    getJobApplyButton(jobIndex: number | undefined): Locator {
        /* NOTE
         * Invoke this method with 'jobIndex' argument only if there are more than one job.
         * Else ignore the 'jobIndex' argument
         * Indexing starts from zero.
         */
        if (jobIndex !== undefined) {
            return this.page.getByRole('button', { name: 'Apply Now' }).nth(jobIndex)
        } else {
            return this.page.getByRole('button', { name: 'Apply Now' })
        }
    }
}