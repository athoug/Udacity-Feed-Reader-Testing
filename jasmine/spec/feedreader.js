/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe("RSS Feeds", function() {
      /* This is our first test - it tests to make sure that the
       * allFeeds variable has been defined and that it is not
       * empty. Experiment with this before you get started on
       * the rest of this project. What happens when you change
       * allFeeds in app.js to be an empty array and refresh the
       * page?
       */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* TODO: Write a test that loops through each feed
       * in the allFeeds object and ensures it has a URL defined
       * and that the URL is not empty.
       */
      it("property URL defined and not empty", function() {
        // test by first looping through each item in the allFeeds array
        allFeeds.forEach(function(feed) {
          // use the matcher toBeDefined to check our expecation of the feed [URL being defind]
          expect(feed.url).toBeDefined();
          // use the matcher toBe and append it with the negation not to check our expecation of the feed [URL not empty]
          expect(feed.url).not.toBe("");
        });
      });

      /* TODO: Write a test that loops through each feed
       * in the allFeeds object and ensures it has a name defined
       * and that the name is not empty.
       */
      it("property Name defined and not empty", function() {
        // test by first looping through each item in the allFeeds array
        allFeeds.forEach(function(feed) {
          // use the matcher toBeDefined to check our expecation of the feed [Name being defind]
          expect(feed.name).toBeDefined();
          // use the matcher toBe and append it with the negation not to check our expecation of the feed [Name not empty]
          expect(feed.name).not.toBe("");
        });
      });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function() {
      const body = document.querySelector("body");
      const menuIcon = document.querySelector(".menu-icon-link");

      beforeEach(function() {});

      /* TODO: Write a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
      it("menu hidden by default", function() {
        // use the query selector to select the body element
        // then access it's class list that has the css class name
        // with the rule to hide the menu [in this case "menu-hidden"]
        // and then use the matcher toBe to check
        expect(body.classList[0]).toBe("menu-hidden");
      });
      /* TODO: Write a test that ensures the menu changes
       * visibility when the menu icon is clicked. This test
       * should have two expectations: does the menu display when
       * clicked and does it hide when clicked again.
       */
      it("menu toogles on click", function() {
        // declare a menu variable that will hold the class name of the body [which is responsable for hidding and showing the menu]
        let menu;
        // set up the spy and chain it to a callThrough
        spyOn(menuIcon, "click").and.callThrough();

        // first click [ expected result menu visable ]
        menuIcon.click();
        menu = document.querySelector("body").classList[0]; // get the first item of teh body class list
        expect(menuIcon.click).toHaveBeenCalled(); // check that the click function fired
        expect(menu).not.toBe("menu-hidden"); // check that the body doesn't have the class "menu-hidden" any more

        // second click [ expected result menu hidden ] ( same steps as the above evaluation just tweaking the final expecatation for body to have teh class)
        menuIcon.click();
        menu = document.querySelector("body").classList[0];
        expect(menuIcon.click).toHaveBeenCalled();
        expect(menu).toBe("menu-hidden");
      });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function() {
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });
      /* TODO: Write a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
      it("loadFeed works and loads data", function(done) {
        // after the beforeEach method runs and feeds are loadded in
        // we check the select all the entries and make sure that
        // they're not empty by checkinmg their length
        expect(document.querySelectorAll(".entry").length).toBeGreaterThan(0);
        done();
      });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {
      // declare variables that hold the first entry of the feed
      let entry1, entry2;

      beforeEach(function(done) {
        // load the async method [ first call with index being 0]
        loadFeed(0, function() {
          // grab a refrence of the first entry
          entry1 = document.querySelectorAll(".entry")[0].querySelector("h2")
            .textContent;
        });
        // load the async method one more time but with a diffrent index
        loadFeed(1, function() {
          // grab a refrence of the first entry
          entry2 = document.querySelectorAll(".entry")[0].querySelector("h2")
            .textContent;
          done();
        });
      });

      /* TODO: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
      it("loadFeed works and loads data", function(done) {
        // changing the container twice [ from the call to load feed with diffren index's]
        // before the test suite and grabing a refrence to first entries
        // start your test: make sure that both entries aren't equal
        expect(entry1).not.toBe(entry2);
        done();
      });
    });
  })()
);
