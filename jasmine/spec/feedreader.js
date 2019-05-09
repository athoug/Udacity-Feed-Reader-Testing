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
    describe("RSS Feeds", function() {
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      it("property URL defined and not empty", function() {
        // validating URL string. function source: https://stackoverflow.com/a/5717133
        function validURL(str) {
          var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
          return !!pattern.test(str);
        }

        // test by first looping through each item in the allFeeds array
        allFeeds.forEach(function(feed) {
          // use the matcher toBeDefined to check our expecation of the feed [URL being defind]
          expect(feed.url).toBeDefined();
          // use the matcher toBe and append it with the negation not to check our expecation of the feed [URL not empty]
          expect(feed.url).not.toBe("");
          // valid URL string
          expect(validURL(feed.url)).toBe(true);
        });
      });

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

    describe("The menu", function() {
      const body = document.querySelector("body");
      const menuIcon = document.querySelector(".menu-icon-link");

      beforeEach(function() {});

      it("menu hidden by default", function() {
        expect(body.classList).toContain("menu-hidden");
      });

      it("menu toogles on click", function() {
        // declare a menu variable that will hold the class name of the body [which is responsable for hidding and showing the menu]
        let menu;
        // set up the spy and chain it to a callThrough
        spyOn(menuIcon, "click").and.callThrough();

        // first click [ expected result menu visable ]
        menuIcon.click();
        menu = document.querySelector("body").classList;
        expect(menuIcon.click).toHaveBeenCalled();
        expect(menu).not.toContain("menu-hidden");

        // second click [ expected result menu hidden ] ( same steps as the above evaluation just tweaking the final expecatation for body to have teh class)
        menuIcon.click();
        menu = document.querySelector("body").classList;
        expect(menuIcon.click).toHaveBeenCalled();
        expect(menu).toContain("menu-hidden");
      });
    });

    describe("Initial Entries", function() {
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });

      it("loadFeed works and loads data", function(done) {
        // check it's loaded by making sure their are entries in the feed container
        expect(document.querySelectorAll(".feed .entry").length).toBeGreaterThan(0);
        done();
      });
    });

    describe("New Feed Selection", function() {
      // declare variables that hold the first entry of the feed
      let entry1, entry2;

      beforeEach(function(done) {
        // load the async method [ first call with index being 0]
        loadFeed(0, function() {
          // grab a refrence of the first entry
          entry1 = document.querySelectorAll(".entry")[0].querySelector("h2").textContent;

          // load the async method one more time but with a diffrent index
          loadFeed(1, function () {
            // grab a refrence of the first entry
            entry2 = document.querySelectorAll(".entry")[0].querySelector("h2").textContent;
            done();
          });
        });

      });

      it("loadFeed works and loads data", function(done) {
        expect(entry1).not.toBe(entry2);
        done();
      });
    });
  })()
);
