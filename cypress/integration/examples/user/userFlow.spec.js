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
        // cy.get('#root').then((root) => {
        //     if (root.find('[data-cy=side-navbar]').length > 0) {
        //         cy.get('[data-cy=logout]').click();
        //     }
        // })

        cy.fixture('registeredUser.json').then((user) => {
            fixtures.registeredUser = user  
        })
        cy.fixture("appliedGig.json").then(gig => {
            fixtures.appliedGig = gig
        })
    })

describe('User login', () => {  
    it('should go to /auth/login', () => {
        cy.get('[data-cy=login]').click()
        cy.url().should('contains', 'auth/login')
    })
    it('should render Register component', () => {
        cy.get('[data-cy=login]').click()
        cy.get('[data-cy=login-form]').should('be.visible')
      })
    it('should succesfully login a user', () => {
        const {username, password} = fixtures.registeredUser;
        cy.get('[data-cy=login]').click()
        cy.get('[data-cy=login-form]').should('be.visible');
        cy.get('[data-cy=username]').type(username)
        cy.get('[data-cy=password]').type(password)
        cy.get('[data-cy=login-button]').click()
        cy.get('[data-cy=logout]').should('be.visible')
        
    })
});


describe('User applies for an event', () => {
    it('should let user to the event of their choice', () => {
        const {username, password} = fixtures.registeredUser
        cy.get('[data-cy=login]').click()
        cy.get('[data-cy=login-form]').should('be.visible')
        cy.get('[data-cy=username]').type(username)
        cy.get('[data-cy=password]').type(password)
        cy.get('[data-cy=login-button]').click()
        cy.get('[data-cy=gigs]').click()
        cy.contains(fixtures.appliedGig.name).click({ force: true })
		cy.get("[data-cy=apply-button").click()
    })
})

describe('User Logout', () => {
    it('should succesfully logout a user', () => {
        const {username, password} = fixtures.registeredUser
        cy.get('[data-cy=login]').click()
        cy.get('[data-cy=login-form]').should('be.visible')
        cy.get('[data-cy=username]').type(username)
        cy.get('[data-cy=password]').type(password)
        cy.get('[data-cy=login-button]').click()
		   cy.get('[data-cy=logout]').click()
    });
});