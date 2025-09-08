describe("protected", () => {
  it("로그인 전에는 로그인 페이지로 리다이렉트 되어야 한다", () => {
    cy.visit("/protected");
    cy.url().should("include", "/login");
  });
  it("로그인 후에는 보호된 페이지에 접근할 수 있어야 한다", () => {
    // 로그인
    cy.login({ username: "admin", password: "admin" });

    // 보호된 페이지 접근
    cy.url().should("include", "/");
    cy.findByRole("link", { name: "admin" }).click();
    cy.url().should("include", "/protected");
    cy.findByText("Protected").should("exist");
  });
});
