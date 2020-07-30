let fixtures = {}

beforeEach(() => {
    // Set the viewport size for desktop
    cy.viewport(1024, 768)
    // Start tests from home page
    cy.visit("/")
    // If user is logged in, log out
    cy.get('[data-cy=navbar]').then((navbar)=> {
        if(navbar.find('[data-cy=logout]').length > 0) {
            cy.get('[data-cy=logout').click()
        }
    })
    cy.fixture('adminUser.json').then((adminUser) => {
        fixtures.adminUser = adminUser  
    })
    cy.fixture("editGig.json").then(gig => {
		fixtures.editedGig = gig
		// deleteGig(gig)
	})
	cy.fixture("newGig.json").then(gig => {
		fixtures.newGig = gig
		// If the test gig already exists, delete it
		// deleteGig(gig)
	})
})


describe('Admin login', () => {
    it('Should login as admin', () => {
    const {username, password} = fixtures.adminUser;
    cy.get('[data-cy=login]').click()
    cy.get('[data-cy=login-form]').should('be.visible');
    cy.get('[data-cy=username]').type(username)
    cy.get('[data-cy=password]').type(password)
    cy.get('[data-cy=login-button]').click()
    cy.get('[data-cy=logout]').should('be.visible')
    })
});

describe("Add a gig", () => {
	it("should login an admin and display add a gig form", () => {
		const {username, password} = fixtures.adminUser;
		const {name, date, generalLocation, specificLocation, capacity} = fixtures.newGig
		cy.get('[data-cy=login]').click()
		cy.get('[data-cy=login-form]').should('be.visible');
		cy.get('[data-cy=username]').type(username)
		cy.get('[data-cy=password]').type(password)
		cy.get('[data-cy=login-button]').click()
		cy.get('[data-cy=addGig]').click()
		cy.get('[data-cy=addGigForm]').should('be.visible')
		cy.get('[data-cy=name]').type(name)
		cy.get('[data-cy=date]').type(date)
		cy.get('[data-cy=generalLocation]').type(generalLocation)
		cy.get('[data-cy=specificLocation]').type(specificLocation)
		cy.get('[data-cy=capacity]').type(capacity)
		cy.get('[data-cy=addGigButton]').click()
	})
})



describe("Edit a gig", () => {
	it('Should login as admin', () => {
		const {username, password} = fixtures.adminUser;
		cy.get('[data-cy=login]').click()
		cy.get('[data-cy=login-form]').should('be.visible');
		cy.get('[data-cy=username]').type(username)
		cy.get('[data-cy=password]').type(password)
		cy.get('[data-cy=login-button]').click()
		cy.get('[data-cy=logout]').should('be.visible')

		const {name, date, generalLocation, specificLocation, capacity} = fixtures.editedGig
		cy.get('[data-cy=navbar]').should('be.visible')
		cy.get('[data-cy=gigs]').click()
		cy.get('[data-cy=gigTitle]').should('be.visible')
		cy.get('[data-cy=gigTitle]').first().click()
		cy.get('[data-cy=editGigButton]').should('be.visible')
		cy.get('[data-cy=editGigButton]').click()
		cy.get('[data-cy=editGigForm]').should('be.visible')
		cy.get('[data-cy=editName]').type(name)
		cy.get('[data-cy=editDate]').type(date)
		cy.get('[data-cy=editGeneralLocation]').type(generalLocation)
		cy.get('[data-cy=editSpecificLocation]').type(specificLocation)
		cy.get('[data-cy=editCapacity]').type(capacity)
        cy.get('[data-cy=editGigButtonSubmit]').click()
	})
})

describe('Admin Logout', () => {
    it('Should logout as admin', () => {
        const {username, password} = fixtures.adminUser
        cy.get('[data-cy=login]').click()
        cy.get('[data-cy=login-form]').should('be.visible')
        cy.get('[data-cy=username]').type(username)
        cy.get('[data-cy=password]').type(password)
        cy.get('[data-cy=login-button]').click()
		cy.get('[data-cy=logout]').click()
    })
})
