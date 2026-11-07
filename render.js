(function () {
  "use strict";

  var ICONS = {
    /* Mission — target with arrow: purpose, direction, achievement */
    home: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="20" cy="20" r="15"/><circle cx="20" cy="20" r="9"/><circle cx="20" cy="20" r="3.5" fill="currentColor" stroke="none"/><line x1="34" y1="6" x2="23" y2="17"/><polyline points="28,5 34,5 34,11"/></svg>',
    /* Vision — lightbulb: ideas, foresight, clarity */
    target: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 C13.4 6 8 11.4 8 18 C8 22.6 10.5 26.6 14 28.8 L14 31 C14 32.1 14.9 33 16 33 L24 33 C25.1 33 26 32.1 26 31 L26 28.8 C29.5 26.6 32 22.6 32 18 C32 11.4 26.6 6 20 6 Z"/><line x1="16" y1="36" x2="24" y2="36"/><line x1="17" y1="33" x2="17" y2="36"/><line x1="23" y1="33" x2="23" y2="36"/></svg>',
    /* Core Values — hands holding heart: service, care, humanity */
    shield: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16 C20 13 22 11 24.5 11 C27 11 29 13 29 15.5 C29 20 24 24 20 27 C16 24 11 20 11 15.5 C11 13 13 11 15.5 11 C18 11 20 13 20 16 Z"/><path d="M6 34 C6 34 8 28 14 27 L18 29 L20 27 L22 29 L26 27 C32 28 34 34 34 34"/></svg>',
    /* heart, book, star kept as supplementary icons */
    heart: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 34 C10 27 4 20 4 13 C4 8 8 4 13 4 C16.5 4 19 6 20 9 C21 6 23.5 4 27 4 C32 4 36 8 36 13 C36 20 30 27 20 34 Z"/></svg>',
    book: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 9 C16 6 10 6 6 8 V32 C10 30 16 30 20 33 C24 30 30 30 34 32 V8 C30 6 24 6 20 9 Z"/><line x1="20" y1="9" x2="20" y2="33"/><line x1="11" y1="13" x2="17" y2="13"/><line x1="11" y1="18" x2="17" y2="18"/><line x1="11" y1="23" x2="17" y2="23"/></svg>',
    star: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4 L23.5 14.5 L35 15.5 L26.5 23 L29 34 L20 28.5 L11 34 L13.5 23 L5 15.5 L16.5 14.5 Z" stroke-linejoin="round"/></svg>'
  };

  function esc(s) {
    return (s == null ? "" : String(s)).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  }

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content;
  }

  function render(data) {
    document.title = data.site.title;
    var favicon = document.querySelector('link[rel="icon"]');
    if (favicon) favicon.href = data.site.favicon;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && data.site.description) metaDesc.setAttribute("content", data.site.description);

    renderNav(data);
    renderHero(data.hero);
    renderAbout(data.about);
    renderLedger(data.ledger);
    renderFeatured(data.featured);
    renderPrograms(data.programs);
    renderGallery(data.gallery);
    renderTeam(data.team);
    renderReport(data.report);
    renderPartners(data.partners);
    renderContact(data.contact);
    renderFooter(data.footer, data.site);

    document.getElementById("year").textContent = new Date().getFullYear();
    initInteractivity();
  }

  function renderNav(data) {
    document.getElementById("brandMark").src = data.site.logo;
    document.getElementById("brandName").textContent = data.site.brandName;
    document.getElementById("brandSub").textContent = data.site.brandSub;
  }

  function renderHero(hero) {
    var root = document.getElementById("hero");
    document.getElementById("heroBannerImg").src = hero.image;
    root.querySelector(".dossier-tag").textContent = hero.tag;
    root.querySelector(".hero-title").innerHTML =
      esc(hero.titleLine1) + "<br>" + esc(hero.titleLine2);
    root.querySelector(".hero-sub").textContent = hero.subtitle;
    var p = root.querySelector(".btn-primary");
    p.textContent = hero.ctaPrimary.label; p.href = hero.ctaPrimary.href;
    var g = root.querySelector(".btn-ghost");
    g.textContent = hero.ctaGhost.label; g.href = hero.ctaGhost.href;

    var strip = document.getElementById("heroStats");
    strip.innerHTML = hero.stats.map(function (s) {
      return '<div class="stat-item"><span class="stat-num" data-count="' + s.value +
        '" data-suffix="' + esc(s.suffix) + '">0</span><span class="stat-label">' +
        esc(s.label) + "</span></div>";
    }).join("");
  }

  function renderAbout(about) {
    var root = document.getElementById("about");
    root.querySelector(".about-copy .eyebrow").textContent = about.eyebrow;
    root.querySelector(".about-copy h2").textContent = about.heading;
    root.querySelector(".about-copy .lede").textContent = about.lede;
    root.querySelector(".about-copy .body-text").textContent = about.body;

    root.querySelector(".mvv-grid").innerHTML = about.mvv.map(function (m) {
      return '<div class="mvv-card"><span class="mvv-icon" aria-hidden="true">' +
        (ICONS[m.icon] || ICONS.star) + '</span><h3>' + esc(m.title) +
        '</h3><p>' + esc(m.text) + '</p></div>';
    }).join("");

    root.querySelector(".leaders-eyebrow").textContent = about.leadersEyebrow || "Leadership";
    root.querySelector(".leaders-heading").textContent = about.leadersHeading || "";

    var leaders = about.leaders || [];
    document.getElementById("leadersGrid").innerHTML = leaders.map(function (l, i) {
      var photo = l.image
        ? '<img src="' + esc(l.image) + '" alt="' + esc(l.name) + '">'
        : '<span class="profile-photo-fallback" aria-hidden="true">' + esc(initials(l.name)) + '</span>';
      var nameLine = esc(l.name) + (l.suffix ? ', <small>' + esc(l.suffix) + '</small>' : "");
      var quote = l.quote ? '<p class="profile-quote">\u201C' + esc(l.quote) + '\u201D</p>' : "";
      var hasBio = l.bio && l.bio.trim();
      var readMore = hasBio ? '<button type="button" class="profile-readmore">Read more &rarr;</button>' : "";
      return '<div class="profile-card' + (hasBio ? ' is-clickable' : '') + '"' +
        (hasBio ? ' data-leader-i="' + i + '"' : '') + '>' +
        '<div class="profile-photo">' + photo + '</div>' +
        '<div class="profile-caption"><h4 class="profile-name">' + nameLine + '</h4>' +
        '<p class="profile-role">' + esc(l.title) + '</p>' + quote + readMore + '</div>' +
        '</div>';
    }).join("");

    document.querySelectorAll("#leadersGrid [data-leader-i]").forEach(function (card) {
      card.addEventListener("click", function () {
        openBioDialog(leaders[Number(card.getAttribute("data-leader-i"))]);
      });
    });
  }

  function openBioDialog(leader) {
    var dialog = document.getElementById("bioDialog");
    var photoEl = document.getElementById("bioDialogPhoto");
    photoEl.innerHTML = leader.image
      ? '<img src="' + esc(leader.image) + '" alt="' + esc(leader.name) + '">'
      : '<span class="profile-photo-fallback" aria-hidden="true">' + esc(initials(leader.name)) + '</span>';
    document.getElementById("bioDialogName").innerHTML =
      esc(leader.name) + (leader.suffix ? ', <small>' + esc(leader.suffix) + '</small>' : "");
    document.getElementById("bioDialogTitle").textContent = leader.title || "";
    var paragraphs = (leader.bio || "").split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(Boolean);
    document.getElementById("bioDialogText").innerHTML = paragraphs.map(function (p) {
      return "<p>" + esc(p).replace(/\n/g, "<br>") + "</p>";
    }).join("");
    dialog.showModal();
  }

  function wireBioDialog() {
    var dialog = document.getElementById("bioDialog");
    if (!dialog) return;
    document.getElementById("bioDialogClose").addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (e) {
      var r = dialog.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
    });
  }

  function renderLedger(ledger) {
    var root = document.getElementById("impact");
    root.querySelector(".eyebrow").textContent = ledger.eyebrow;
    root.querySelector(".ledger-title").textContent = ledger.heading;
    root.querySelector(".ledger-lede").textContent = ledger.lede;
    root.querySelector(".ledger-table").innerHTML = ledger.rows.map(function (r) {
      return '<div class="ledger-row"><span class="ledger-figure">' + esc(r.figure) +
        '</span><span class="ledger-desc">' + r.desc + "</span></div>";
    }).join("");

    var visualEl = document.getElementById("ledgerVisual");
    if (visualEl) {
      var sectors = ledger.sectors || [
        { name: "Education & Human Capital", pct: 42, detail: "JAMB orientation, CBT coaching & tertiary scholarships" },
        { name: "Humanitarian Care & Relief", pct: 28, detail: "Almajiri & Tahfiz support, targeted food distribution" },
        { name: "Youth Leadership & Civic Voice", pct: 18, detail: "TEDx delegates, capacity-building & mentorship" },
        { name: "Environmental Restoration", pct: 12, detail: "Doruwa tree seedlings & community land greening" }
      ];

      var kpis = ledger.kpis || [
        { num: "87%", label: "Tertiary Admission" },
        { num: "3,500+", label: "Direct Beneficiaries" },
        { num: "Multi-LGA", label: "Grassroots Presence" },
        { num: "100%", label: "Field Documented" }
      ];

      visualEl.innerHTML =
        '<div class="impact-card">' +
          '<div class="impact-card-header">' +
            '<div class="impact-card-tagline">' +
              '<span>1-Year Impact Distribution</span>' +
              '<span class="impact-card-badge">13 Projects</span>' +
            '</div>' +
            '<h3 class="impact-card-title">Interventions by Focus Sector</h3>' +
          '</div>' +
          '<div class="sector-bars">' +
            sectors.map(function (s) {
              return '<div class="sector-item">' +
                '<div class="sector-meta">' +
                  '<span class="sector-name">' + esc(s.name) + '</span>' +
                  '<span class="sector-pct">' + s.pct + '%</span>' +
                '</div>' +
                '<div class="sector-track">' +
                  '<div class="sector-fill" data-pct="' + s.pct + '"></div>' +
                '</div>' +
                '<span class="sector-detail">' + esc(s.detail) + '</span>' +
              '</div>';
            }).join("") +
          '</div>' +
          '<div class="impact-kpis">' +
            kpis.map(function (k) {
              return '<div class="kpi-tile">' +
                '<span class="kpi-tile-num">' + esc(k.num) + '</span>' +
                '<span class="kpi-tile-label">' + esc(k.label) + '</span>' +
              '</div>';
            }).join("") +
          '</div>' +
          '<p class="impact-card-foot">Drawn from official field documentation &middot; Impact Beyond Office</p>' +
        '</div>';
    }
  }

  function renderFeatured(f) {
    var root = document.getElementById("featured");
    root.querySelector(".eyebrow").textContent = f.eyebrow;
    root.querySelector(".featured-copy h2").textContent = f.heading;
    root.querySelector(".featured-copy .lede").textContent = f.lede;
    root.querySelector(".featured-copy .body-text").innerHTML = f.body;
    root.querySelector(".callout").innerHTML = f.callout;
    var link = root.querySelector(".text-link");
    link.textContent = f.linkLabel; link.href = f.linkHref;

    var classes = ["fg-a", "fg-b", "fg-c"];
    root.querySelector(".featured-gallery").innerHTML = f.images.map(function (src, i) {
      return '<img src="' + src + '" alt="" class="' + (classes[i] || "") + '">';
    }).join("");
  }

  var currentPrograms = [];

  function renderPrograms(programs) {
    currentPrograms = programs.items || [];
    var root = document.getElementById("programs");
    root.querySelector(".eyebrow").textContent = programs.eyebrow;
    root.querySelector("h2").textContent = programs.heading;
    root.querySelector(".lede").innerHTML = programs.lede;

    var chips = ['<button class="filter-chip is-active" data-filter="all">All</button>']
      .concat(programs.categories.map(function (c) {
        return '<button class="filter-chip" data-filter="' + esc(c) + '">' + esc(c) + "</button>";
      }));
    document.getElementById("filterRow").innerHTML = chips.join("");

    document.getElementById("register").innerHTML = programs.items.map(function (item, pIdx) {
      var images = (item.images || []).filter(function (img) { return img && img.src && img.src.trim(); });
      var galleryHTML = "";
      if (images.length > 0) {
        var countAttr = images.length === 1 ? "1" : (images.length === 2 ? "2" : (images.length === 3 ? "3" : "multi"));
        var photosHTML = images.map(function (img, imgIdx) {
          var caption = (img.caption || "").trim();
          var captionHTML = caption ? '<span class="project-photo-caption">' + esc(caption) + '</span>' : '';
          return '<button type="button" class="project-photo" data-p-idx="' + pIdx + '" data-img-idx="' + imgIdx + '" aria-label="View photo: ' + esc(caption || item.title) + '">' +
            '<img src="' + esc(img.src) + '" alt="' + esc(caption || item.title) + '" loading="lazy">' +
            captionHTML +
            '</button>';
        }).join("");
        galleryHTML = '<div class="project-gallery" data-count="' + countAttr + '">' + photosHTML + '</div>';
      }

      return '<article class="reg-row" data-tags="' + esc((item.tags || [item.tag]).join(" ")) + '">' +
        '<button class="reg-head" aria-expanded="false">' +
        '<span class="reg-num">' + esc(item.num) + '</span>' +
        '<span class="reg-title">' + esc(item.title) + '</span>' +
        '<span class="reg-tag">' + esc(item.tag) + '</span>' +
        '<span class="reg-chevron" aria-hidden="true">+</span>' +
        '</button>' +
        '<div class="reg-body"><div class="reg-body-inner">' +
        '<div class="reg-text">' + item.body + '</div>' +
        galleryHTML +
        '</div></div></article>';
    }).join("");
  }

  function renderGallery(gallery) {
    var root = document.getElementById("gallery");
    root.querySelector(".eyebrow").textContent = gallery.eyebrow;
    root.querySelector(".gallery-title").textContent = gallery.heading;
    document.getElementById("galleryGrid").innerHTML = gallery.images.map(function (img) {
      return '<figure class="gallery-item"><img src="' + img.src + '" alt="' + esc(img.alt) + '" loading="lazy"></figure>';
    }).join("");
  }

  function initials(name) {
    var parts = name.replace(/,.*/, "").trim().split(/\s+/).filter(Boolean);
    var first = parts[0] ? parts[0][0] : "";
    var last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }

  function renderTeam(team) {
    var root = document.getElementById("team");
    root.querySelector(".eyebrow").textContent = team.eyebrow;
    root.querySelector("h2").textContent = team.heading;
    root.querySelector(".lede").textContent = team.lede;

    document.getElementById("teamGrid").innerHTML = team.members.map(function (m) {
      var badge = m.isLead ? '<span class="profile-badge">Office Head</span>' : "";
      var photo = m.photo
        ? '<img src="' + esc(m.photo) + '" alt="' + esc(m.name) + '">'
        : '<span class="profile-photo-fallback" aria-hidden="true">' + esc(initials(m.name)) + '</span>';
      var nameLine = esc(m.name) + (m.suffix ? ', <small>' + esc(m.suffix) + '</small>' : "");
      var contacts = "";
      if (m.phone) contacts += '<a href="tel:' + esc(m.phone) + '">' + formatPhone(m.phone) + '</a>';
      if (m.email) contacts += '<a href="mailto:' + esc(m.email) + '">' + esc(m.email) + '</a>';
      return '<div class="profile-card">' +
        '<div class="profile-photo">' + badge + photo + '</div>' +
        '<div class="profile-caption"><h4 class="profile-name">' + nameLine + '</h4>' +
        '<p class="profile-role">' + esc(m.role) + '</p>' +
        (contacts ? '<div class="profile-contacts">' + contacts + '</div>' : "") + '</div>' +
        '</div>';
    }).join("");
  }

  function formatPhone(p) {
    var digits = p.replace(/^\+234/, "0");
    return digits.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3");
  }

  function renderReport(report) {
    var root = document.getElementById("report");
    root.querySelector(".eyebrow").textContent = report.eyebrow;
    root.querySelector("h2").textContent = report.heading;
    root.querySelector(".lede").textContent = report.lede;
    root.querySelector(".report-copy .body-text").textContent = report.body;
    var link = root.querySelector(".btn-primary");
    link.textContent = report.linkLabel; link.href = report.linkHref;
    root.querySelector(".report-link-text").textContent = report.linkText;
    root.querySelector(".report-visual img").src = report.image;
  }

  function renderPartners(partners) {
    var root = document.querySelector(".partners");
    root.querySelector(".partners-label").textContent = partners.label;
    root.querySelector(".partners-strip").innerHTML = partners.items.map(function (p) {
      return "<span>" + esc(p) + "</span>";
    }).join("");
  }

  function renderContact(contact) {
    var root = document.getElementById("contact");
    root.querySelector(".eyebrow").textContent = contact.eyebrow;
    root.querySelector("h2").textContent = contact.heading;
    root.querySelector(".lede").textContent = contact.lede;
    document.getElementById("contactList").innerHTML =
      '<li><span>Email</span><a href="mailto:' + esc(contact.email) + '">' + esc(contact.email) + '</a></li>' +
      '<li><span>Phone</span>' + contact.phones.map(function (ph) {
        return '<a href="tel:' + esc(ph.replace(/\s/g, "")) + '">' + esc(ph) + '</a>';
      }).join(" &middot; ") + '</li>' +
      '<li><span>Web</span><a href="' + esc(contact.website) + '" target="_blank" rel="noopener">' + esc(contact.websiteLabel) + '</a></li>';
  }

  function renderFooter(footer, site) {
    document.getElementById("footerBrandName").textContent = site.brandName;
    document.getElementById("footerTagline").textContent = footer.tagline;
    document.getElementById("footerNote").textContent = footer.note;
  }

  /* ================= interactivity (re-runs after each render) ================= */
  function initInteractivity() {
    var header = document.getElementById("siteHeader");
    function onScroll() {
      if (window.scrollY > 40) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    }
    document.removeEventListener("scroll", window.__slocoScroll || function () {});
    window.__slocoScroll = onScroll;
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    toggle.onclick = function () {
      var open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    nav.querySelectorAll("a").forEach(function (a) {
      a.onclick = function () {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      };
    });

    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealEls.forEach(function (elx) { io.observe(elx); });
    } else {
      revealEls.forEach(function (elx) { elx.classList.add("is-visible"); });
    }

    var statNums = document.querySelectorAll(".stat-num");
    function animateCount(elx) {
      var target = parseInt(elx.getAttribute("data-count"), 10) || 0;
      var suffix = elx.getAttribute("data-suffix") || "";
      var duration = 1400, start = null;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        elx.textContent = Math.round(eased * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if (statNums.length) {
      if ("IntersectionObserver" in window) {
        var statIO = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) { animateCount(entry.target); statIO.unobserve(entry.target); }
          });
        }, { threshold: 0.4 });
        statNums.forEach(function (elx) { statIO.observe(elx); });
      } else { statNums.forEach(animateCount); }
    }

    var regRows = document.querySelectorAll(".reg-row");
    regRows.forEach(function (row) {
      var head = row.querySelector(".reg-head");
      head.onclick = function () {
        var isOpen = row.classList.contains("is-open");
        regRows.forEach(function (r) {
          if (r !== row) {
            r.classList.remove("is-open");
            r.querySelector(".reg-head").setAttribute("aria-expanded", "false");
          }
        });
        if (isOpen) {
          row.classList.remove("is-open");
          head.setAttribute("aria-expanded", "false");
        } else {
          row.classList.add("is-open");
          head.setAttribute("aria-expanded", "true");
        }
      };
    });

    var chips = document.querySelectorAll(".filter-chip");
    chips.forEach(function (chip) {
      chip.onclick = function () {
        chips.forEach(function (c) { c.classList.remove("is-active"); });
        chip.classList.add("is-active");
        var filter = chip.getAttribute("data-filter");
        regRows.forEach(function (row) {
          var tags = row.getAttribute("data-tags") || "";
          var match = filter === "all" || tags.indexOf(filter) !== -1;
          row.classList.toggle("is-hidden", !match);
        });
      };
    });

    var form = document.getElementById("contactForm");
    var note = document.getElementById("formNote");
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        note.textContent = "Thank you — your message has been noted. The office will reach out to " +
          document.getElementById("femail").value + " shortly.";
        form.reset();
      };
    }

    // card tilt / magnetic hover on interactive cards
    initTilt();
    
    document.querySelectorAll(".project-photo").forEach(function (btn) {
      btn.onclick = function (e) {
        e.stopPropagation();
        var pIdx = Number(btn.getAttribute("data-p-idx"));
        var imgIdx = Number(btn.getAttribute("data-img-idx"));
        var item = currentPrograms[pIdx];
        if (item && item.images) {
          var imgs = item.images.filter(function (img) { return img && img.src && img.src.trim(); });
          openLightbox(imgs, imgIdx);
        }
      };
    });
    wireLightboxDialog();
    
    var sectorFills = document.querySelectorAll(".sector-fill");
    function animateSectorBars() {
      sectorFills.forEach(function (fill) {
        var pct = fill.getAttribute("data-pct") || "0";
        fill.style.width = pct + "%";
      });
    }
    if (sectorFills.length) {
      if ("IntersectionObserver" in window) {
        var sectorIO = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateSectorBars();
              sectorIO.unobserve(entry.target);
            }
          });
        }, { threshold: 0.2 });
        var visualCard = document.getElementById("ledgerVisual");
        if (visualCard) sectorIO.observe(visualCard);
      } else {
        animateSectorBars();
      }
    }
    wireBioDialog();
  }

  function initTilt() {
    var cards = document.querySelectorAll(".mvv-card, .gallery-item, .partners-strip span");
    cards.forEach(function (card) {
      if (card.__tiltBound) return;
      card.__tiltBound = true;
      card.addEventListener("pointermove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--tilt-x", (y * -6).toFixed(2) + "deg");
        card.style.setProperty("--tilt-y", (x * 6).toFixed(2) + "deg");
        card.style.setProperty("--glow-x", (e.clientX - rect.left) + "px");
        card.style.setProperty("--glow-y", (e.clientY - rect.top) + "px");
      });
      card.addEventListener("pointerleave", function () {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      });
    });
  }

  
  /* ================= lightbox dialog ================= */
  var currentGalleryPhotos = [];
  var currentPhotoIdx = 0;

  function openLightbox(photos, startIndex) {
    if (!photos || !photos.length) return;
    currentGalleryPhotos = photos;
    currentPhotoIdx = startIndex >= 0 && startIndex < photos.length ? startIndex : 0;
    updateLightboxUI();
    var dialog = document.getElementById("lightboxDialog");
    if (dialog && typeof dialog.showModal === "function") {
      dialog.showModal();
    }
  }

  function updateLightboxUI() {
    var photo = currentGalleryPhotos[currentPhotoIdx];
    if (!photo) return;
    var imgEl = document.getElementById("lightboxImg");
    var capEl = document.getElementById("lightboxCaption");
    var counterEl = document.getElementById("lightboxCounter");
    var prevBtn = document.getElementById("lightboxPrev");
    var nextBtn = document.getElementById("lightboxNext");

    if (imgEl) {
      imgEl.src = photo.src;
      imgEl.alt = photo.caption || "Project photo";
    }
    if (capEl) {
      capEl.textContent = photo.caption || "";
      capEl.style.display = photo.caption ? "" : "none";
    }
    if (counterEl) {
      counterEl.textContent = (currentPhotoIdx + 1) + " / " + currentGalleryPhotos.length;
    }
    var multi = currentGalleryPhotos.length > 1;
    if (prevBtn) prevBtn.style.display = multi ? "" : "none";
    if (nextBtn) nextBtn.style.display = multi ? "" : "none";
  }

  function stepLightbox(dir) {
    if (!currentGalleryPhotos.length) return;
    currentPhotoIdx = (currentPhotoIdx + dir + currentGalleryPhotos.length) % currentGalleryPhotos.length;
    updateLightboxUI();
  }

  function wireLightboxDialog() {
    var dialog = document.getElementById("lightboxDialog");
    if (!dialog || dialog.__slocoLightboxBound) return;
    dialog.__slocoLightboxBound = true;

    var closeBtn = document.getElementById("lightboxClose");
    if (closeBtn) closeBtn.onclick = function () { dialog.close(); };

    var prevBtn = document.getElementById("lightboxPrev");
    if (prevBtn) prevBtn.onclick = function (e) { e.stopPropagation(); stepLightbox(-1); };

    var nextBtn = document.getElementById("lightboxNext");
    if (nextBtn) nextBtn.onclick = function (e) { e.stopPropagation(); stepLightbox(1); };

    dialog.addEventListener("click", function (e) {
      var r = dialog.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
        dialog.close();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (!dialog.open) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        stepLightbox(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        stepLightbox(1);
      } else if (e.key === "Escape") {
        dialog.close();
      }
    });
  }

  async function boot() {
    try {
      var result = await SlocoStore.load();
      render(result.data);
    } catch (err) {
      console.error(err);
      document.body.innerHTML = '<p style="padding:80px;font-family:sans-serif">Could not load site content right now. Please try refreshing in a moment.</p>';
    }
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
