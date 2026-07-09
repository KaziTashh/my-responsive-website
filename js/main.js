/* =========================================================
   Nizam’s Chronicle — Site Scripts
   Attraction data + modal, category filters, gallery
   lightbox, scroll reveal, animated stat counters,
   sticky header shadow.
   ========================================================= */

(function () {
    "use strict";

    /* ---------------------------------------------------
       1. Attraction data — single source of truth used by
          every "Learn More" modal on both index.html and
          explore.html.
       --------------------------------------------------- */
    var ATTRACTIONS = {
        "charminar": {
            name: "Charminar",
            categoryLabel: "Heritage & Forts",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Charminar%20-%20Hyderabad%20-%20Telangana.jpg?width=1200",
            alt: "Charminar monument in the Old City of Hyderabad",
            description: "Built in 1591 by Sultan Muhammad Quli Qutb Shah to mark the founding of Hyderabad, Charminar's four 56-metre minarets and rooftop mosque have anchored the Old City for more than four centuries. Come at dusk to see it lit against the sky, then wander into Laad Bazaar next door for bangles and pearls.",
            hours: "9:30 AM \u2013 5:30 PM, daily",
            fee: "\u20B925 (Indians) \u00B7 \u20B9300 (foreign nationals)",
            location: "Charminar Rd, Ghansi Bazaar, Old City",
            mapQuery: "Charminar Hyderabad",
            highlights: [
                "149 steps lead to a rooftop mosque with panoramic Old City views",
                "Illuminated nightly \u2014 best photographed from the street between 7\u20139 PM",
                "Steps from Laad Bazaar's bangle and pearl stalls and the Mecca Masjid"
            ]
        },
        "golconda-fort": {
            name: "Golconda Fort",
            categoryLabel: "Heritage & Forts",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Aerial%20view%20of%20the%20Golconda%20Fort,%20Hyderabad,%20Telangana%20(2014).jpg?width=1200",
            alt: "Aerial view of Golconda Fort on its granite hill",
            description: "Once the seat of the Qutb Shahi dynasty and a hub of the historic diamond trade, Golconda is a granite citadel of eight gates and 87 bastions, engineered so a hand-clap at the entrance carries clearly to the highest pavilion, nearly a kilometre away. Climb to the summit for a sweeping view of the city, then stay for the evening sound-and-light show.",
            hours: "9:00 AM \u2013 5:30 PM, daily \u00B7 Light show ~6:30/7:45 PM (seasonal)",
            fee: "\u20B915 (Indians) \u00B7 \u20B9200 (foreign nationals) \u00B7 Light show ~\u20B980\u2013140",
            location: "Khair Complex, Ibrahim Bagh",
            mapQuery: "Golconda Fort Hyderabad",
            highlights: [
                "Famous acoustic system \u2014 a hand clap at the entrance echoes at the top pavilion",
                "Once a global centre of the diamond trade, linked to gems such as the Koh-i-Noor",
                "Evening sound-and-light show narrates the fort's history in English, Hindi & Telugu"
            ]
        },
        "ramoji-film-city": {
            name: "Ramoji Film City",
            categoryLabel: "Leisure & Family",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ramoji%20Film%20City%20-%20A%20view%20from%20main%20fun%20area%203231.JPG?width=1200",
            alt: "Landscaped grounds and film sets at Ramoji Film City",
            description: "Spread across roughly 1,650 acres on the city's outskirts, Ramoji Film City is a working studio and a full-day theme park in one \u2014 recreated streets, palace facades, and gardens sit alongside live shows, stunt sequences, and cultural performances. Tickets are sold as day packages rather than a simple gate fee, so it's worth arriving early to make the most of it.",
            hours: "9:00 AM \u2013 5:30 PM, daily (tour timings vary by package)",
            fee: "From approx. \u20B91,500 per adult (general day package)",
            location: "Anaspur Village, Hayathnagar Mandal (~25 km from the city centre)",
            mapQuery: "Ramoji Film City Hyderabad",
            highlights: [
                "Guinness World Record holder for the largest film studio complex",
                "Recreated sets used in Baahubali and hundreds of other productions",
                "Live shows include Wild West stunts, cultural performances, and an eco/butterfly park"
            ]
        },
        "hussain-sagar": {
            name: "Hussain Sagar Lake",
            categoryLabel: "Leisure & Family",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Hussain%20Sagar%20Lake%20-%20Necklace%20Road,%20Hydrabad%2007.jpg?width=1200",
            alt: "Hussain Sagar Lake with the Buddha statue and city skyline",
            description: "Built in 1563 to supply water to the growing city, Hussain Sagar now anchors Hyderabad's evening life \u2014 joggers and food stalls line Necklace Road, and ferries run out to the 16-metre granite Buddha statue standing on the Rock of Gibraltar at the lake's centre. It's at its best around sunset, when the statue and skyline light up.",
            hours: "Promenade open all day \u00B7 Boating 8:00 AM \u2013 10:00 PM",
            fee: "Free to view \u00B7 Boating from ~\u20B955 per adult",
            location: "Tank Bund, between Hyderabad & Secunderabad",
            mapQuery: "Hussain Sagar Lake Hyderabad",
            highlights: [
                "One of Asia's largest artificial lakes, connecting the twin cities",
                "The centrepiece Buddha statue is among the world's tallest monolithic Buddha statues",
                "Necklace Road and Lumbini Park nearby make it an easy evening add-on"
            ]
        },
        "salar-jung-museum": {
            name: "Salar Jung Museum",
            categoryLabel: "Palaces & Museums",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Salarjung%20Musium.JPG?width=1200",
            alt: "Salar Jung Museum building facade in Hyderabad",
            description: "Spread across 38 galleries on the banks of the Musi River, this museum holds tens of thousands of manuscripts, sculptures, and artefacts gathered from Europe, the Middle East, and the Far East \u2014 including the famed Veiled Rebecca marble sculpture and a mechanical musical clock that still chimes on the hour.",
            hours: "10:00 AM \u2013 5:00 PM \u00B7 Closed Fridays",
            fee: "\u20B920 (Indians) \u00B7 \u20B9500 (foreign nationals)",
            location: "Salar Jung Road, Darul Shifa",
            mapQuery: "Salar Jung Museum Hyderabad",
            highlights: [
                "Third-largest museum in India, opened by Jawaharlal Nehru in 1951",
                "Don't miss the musical clock \u2014 a mechanical bird chimes on the hour",
                "Photography requires a separate ticket; smartphones need one too"
            ]
        },
        "chowmahalla-palace": {
            name: "Chowmahalla Palace",
            categoryLabel: "Palaces & Museums",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Chowmahalla%20Palace%20Hyderabad.JPG?width=1200",
            alt: "Courtyard of Chowmahalla Palace in Hyderabad",
            description: "Chowmahalla, meaning \u201Cfour palaces,\u201D was the ceremonial seat of the Nizams of Hyderabad and the Asaf Jahi dynasty. Its Khilwat Mubarak durbar hall glitters with Belgian crystal chandeliers, and the southern courtyard holds a 1912 Rolls-Royce once used by the royal family.",
            hours: "10:00 AM \u2013 5:00 PM \u00B7 Closed Fridays",
            fee: "\u20B950 (Indians) \u00B7 \u20B9200 (foreign nationals)",
            location: "Motigalli, Khilwat, Old City",
            mapQuery: "Chowmahalla Palace Hyderabad",
            highlights: [
                "Khilwat Mubarak's Durbar Hall holds 19 Belgian crystal chandeliers",
                "Vintage royal cars on display, including a 1912 Rolls-Royce Silver Ghost",
                "A short walk from Charminar and Laad Bazaar"
            ]
        },
        "birla-mandir": {
            name: "Birla Mandir",
            categoryLabel: "Heritage & Forts",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Birla%20Mandir%20in%20Hyderabad,%202015.JPG?width=1200",
            alt: "White marble Birla Mandir temple on Naubat Pahad hill",
            description: "Perched atop the 280-foot Naubat Pahad hill, Birla Mandir was built over roughly a decade using about 2,000 tonnes of white Rajasthani marble. Dedicated to Lord Venkateswara, the temple deliberately has no bells, making it as much a quiet viewpoint over the city as a place of worship.",
            hours: "7:00 AM \u2013 12:00 PM & 3:00 PM \u2013 9:00 PM, daily",
            fee: "Free entry",
            location: "Naubat Pahad, Khairatabad",
            mapQuery: "Birla Mandir Hyderabad",
            highlights: [
                "Built entirely from white Rajasthani marble over roughly ten years",
                "No temple bells \u2014 designed as a space for quiet reflection",
                "Phones, cameras, and footwear are left at a free locker counter"
            ]
        },
        "nehru-zoological-park": {
            name: "Nehru Zoological Park",
            categoryLabel: "Leisure & Family",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Nehuru%20zoological%20park%20Hyderabad%20India%20Entrance.jpg?width=1200",
            alt: "Entrance to Nehru Zoological Park in Hyderabad",
            description: "Spread over roughly 380 acres near Mir Alam Tank, Nehru Zoological Park is home to more than 1,500 animals across open, naturalistic enclosures. Lion, tiger, and bear safaris run through the day, alongside a children's toy train and one of India's first dedicated butterfly parks.",
            hours: "8:00 AM \u2013 5:30 PM \u00B7 Closed Mondays",
            fee: "\u20B930 (adult) \u00B7 Safaris & toy train priced separately",
            location: "Bahadurpura, near Mir Alam Tank",
            mapQuery: "Nehru Zoological Park Hyderabad",
            highlights: [
                "Home to over 1,500 animals, including Bengal tigers and Asiatic lions",
                "Lion, tiger, and bear safaris run at regular intervals through the day",
                "Boating available on the historic Mir Alam Tank within the park"
            ]
        },
        "qutb-shahi-tombs": {
            name: "Qutb Shahi Tombs",
            categoryLabel: "Heritage & Forts",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Qutb%20Shahi%20Tombs,%20Hyderabad,%20India.jpg?width=1200",
            alt: "Domed tombs of the Qutb Shahi dynasty near Golconda Fort",
            description: "A short walk from Golconda Fort, this necropolis holds the tombs of seven Qutb Shahi sultans within a walled garden, their onion domes blending Persian, Deccan, and Hindu architectural details. Recent restoration work has brought back much of the original stucco and stonework, and it's markedly quieter than Golconda itself.",
            hours: "9:30 AM \u2013 5:30 PM, daily",
            fee: "\u20B910 (Indians)",
            location: "Ibrahim Bagh, near Golconda Fort",
            mapQuery: "Qutb Shahi Tombs Hyderabad",
            highlights: [
                "Resting place of seven Qutb Shahi sultans within one walled complex",
                "The tomb of Muhammad Quli Qutb Shah, Charminar's builder, is the largest here",
                "Best paired with a Golconda Fort visit \u2014 the two sites sit under a kilometre apart"
            ]
        }
    };

    /* ---------------------------------------------------
       2. Sticky header shadow on scroll
       --------------------------------------------------- */
    var header = document.querySelector(".main-header");
    if (header) {
        var onScrollHeader = function () {
            if (window.scrollY > 8) {
                header.classList.add("is-scrolled");
            } else {
                header.classList.remove("is-scrolled");
            }
        };
        window.addEventListener("scroll", onScrollHeader, { passive: true });
        onScrollHeader();
    }

    /* ---------------------------------------------------
       3. Attraction "Learn More" modal
       --------------------------------------------------- */
    var modalOverlay = document.querySelector("[data-modal-overlay]");

    function buildModalMarkup(data) {
        var highlightItems = data.highlights.map(function (h) {
            return "<li>" + h + "</li>";
        }).join("");

        var mapsHref = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(data.mapQuery);

        return (
            '<div class="modal-media">' +
                '<img src="' + data.image + '" alt="' + data.alt + '" loading="lazy">' +
                '<button type="button" class="modal-close" data-modal-close aria-label="Close details">&times;</button>' +
            "</div>" +
            '<div class="modal-body">' +
                '<p class="modal-eyebrow">' + data.categoryLabel + "</p>" +
                '<h2 class="modal-title">' + data.name + "</h2>" +
                '<p class="modal-description">' + data.description + "</p>" +
                '<dl class="modal-plaque">' +
                    "<div><dt>Opening Hours</dt><dd>" + data.hours + "</dd></div>" +
                    "<div><dt>Entry Fee</dt><dd>" + data.fee + "</dd></div>" +
                    "<div><dt>Location</dt><dd>" + data.location + "</dd></div>" +
                "</dl>" +
                '<div class="modal-highlights">' +
                    "<h4>Good to know</h4>" +
                    "<ul>" + highlightItems + "</ul>" +
                "</div>" +
                '<p style="margin-top:24px;">' +
                    '<a class="btn-text" href="' + mapsHref + '" target="_blank" rel="noopener">Open in Google Maps &rarr;</a>' +
                "</p>" +
            "</div>"
        );
    }

    function openModal(id) {
        var data = ATTRACTIONS[id];
        if (!data || !modalOverlay) { return; }
        modalOverlay.innerHTML = '<div class="modal-dialog" role="dialog" aria-modal="true" aria-label="' + data.name + ' details">' + buildModalMarkup(data) + "</div>";
        modalOverlay.classList.add("is-open");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if (!modalOverlay) { return; }
        modalOverlay.classList.remove("is-open");
        document.body.style.overflow = "";
    }

    document.addEventListener("click", function (event) {
        var trigger = event.target.closest("[data-attraction]");
        if (trigger) {
            event.preventDefault();
            openModal(trigger.getAttribute("data-attraction"));
            return;
        }
        if (event.target.closest("[data-modal-close]")) {
            closeModal();
            return;
        }
        if (modalOverlay && event.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeModal();
            closeLightbox();
        }
    });

    /* ---------------------------------------------------
       4. Category filter tabs (Explore Hyderabad grids)
       --------------------------------------------------- */
    var tabRows = document.querySelectorAll("[data-filter-tabs]");
    tabRows.forEach(function (row) {
        var targetSelector = row.getAttribute("data-filter-tabs");
        var grid = document.querySelector(targetSelector);
        if (!grid) { return; }
        var cards = grid.querySelectorAll("[data-category]");

        row.addEventListener("click", function (event) {
            var btn = event.target.closest(".tab-pill");
            if (!btn) { return; }
            row.querySelectorAll(".tab-pill").forEach(function (p) {
                p.classList.remove("is-active");
                p.setAttribute("aria-pressed", "false");
            });
            btn.classList.add("is-active");
            btn.setAttribute("aria-pressed", "true");

            var filter = btn.getAttribute("data-filter");
            cards.forEach(function (card) {
                var show = filter === "all" || card.getAttribute("data-category") === filter;
                card.style.display = show ? "" : "none";
            });
        });
    });

    /* ---------------------------------------------------
       5. Gallery lightbox
       --------------------------------------------------- */
    var lightboxOverlay = document.querySelector("[data-lightbox-overlay]");

    function openLightbox(src, alt, caption) {
        if (!lightboxOverlay) { return; }
        lightboxOverlay.innerHTML =
            '<button type="button" class="lightbox-close" data-lightbox-close aria-label="Close image">&times;</button>' +
            '<figure class="lightbox-figure">' +
                '<img src="' + src + '" alt="' + alt + '">' +
                (caption ? '<figcaption class="lightbox-caption">' + caption + "</figcaption>" : "") +
            "</figure>";
        lightboxOverlay.classList.add("is-open");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        if (!lightboxOverlay) { return; }
        lightboxOverlay.classList.remove("is-open");
        document.body.style.overflow = modalOverlay && modalOverlay.classList.contains("is-open") ? "hidden" : "";
    }

    document.addEventListener("click", function (event) {
        var item = event.target.closest("[data-gallery-item]");
        if (item) {
            var img = item.querySelector("img");
            var captionEl = item.querySelector(".gallery-caption");
            openLightbox(
                img.getAttribute("src").replace(/width=\d+/, "width=1600"),
                img.getAttribute("alt"),
                captionEl ? captionEl.textContent : ""
            );
            return;
        }
        if (event.target.closest("[data-lightbox-close]")) {
            closeLightbox();
            return;
        }
        if (lightboxOverlay && event.target === lightboxOverlay) {
            closeLightbox();
        }
    });

    /* ---------------------------------------------------
       6. Scroll reveal
       --------------------------------------------------- */
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

        revealEls.forEach(function (el, index) {
            el.style.transitionDelay = (index % 4) * 70 + "ms";
            revealObserver.observe(el);
        });
    } else {
        revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }

    /* ---------------------------------------------------
       7. Animated stat counters
       --------------------------------------------------- */
    var counters = document.querySelectorAll("[data-count-to]");
    function animateCounter(el) {
        var target = parseFloat(el.getAttribute("data-count-to"));
        var suffix = el.getAttribute("data-count-suffix") || "";
        var duration = 1400;
        var start = null;

        function step(timestamp) {
            if (!start) { start = timestamp; }
            var progress = Math.min((timestamp - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var value = Math.round(target * eased);
            el.textContent = value.toLocaleString("en-IN") + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        }
        window.requestAnimationFrame(step);
    }

    if ("IntersectionObserver" in window && counters.length) {
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(function (el) { counterObserver.observe(el); });
    } else {
        counters.forEach(function (el) {
            el.textContent = el.getAttribute("data-count-to") + (el.getAttribute("data-count-suffix") || "");
        });
    }

    /* ---------------------------------------------------
       8. Current year in footer (if present)
       --------------------------------------------------- */
    var yearEl = document.querySelector("[data-current-year]");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
})();
