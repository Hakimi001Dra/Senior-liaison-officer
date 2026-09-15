# SLOCO–YSG Website

Website for the Office of the Senior Liaison Officer to the Executive Governor of
Yobe State on Community Outreach (SLOCO–YSG).

The **pages** (`index.html`, `admin.html` and their CSS/JS) are static files —
host them anywhere, including GitHub Pages. The **content** (programs, team,
gallery, stats, etc.) and **photos** live in a real backend: a free
[Supabase](https://supabase.com) project (Postgres database + file storage +
login). That's what makes the admin dashboard's Save and Upload buttons
actually publish for every visitor, instantly, from any device.

```
index.html            the public website
admin.html              the admin dashboard — open this to edit content
admin.js
admin.css
supabase-client.js     your Supabase project's URL + public key
data-store.js           shared logic for loading/saving content & photos
render.js                renders index.html from the database
styles.css
supabase-setup.sql     run this once in Supabase to set everything up
content.json            a point-in-time backup/reference, not loaded at runtime
README.md
.gitignore
*.jpg / *.png            the site's original photos (still used as-is)
```

## One-time setup

1. **Create a free Supabase project** at [supabase.com](https://supabase.com) —
   no credit card required. (If you're reading this, this step is likely
   already done — `supabase-client.js` already has this project's URL and
   public key filled in.)
2. Open your project → **SQL Editor** → **New query**, paste in the entire
   contents of [`supabase-setup.sql`](./supabase-setup.sql), and click **Run**.
   This creates the database table, the security rules, the photo storage
   bucket, and seeds it with the site's current content — safe to run once.

   **Already ran this before, on an earlier version of the site?** Also run
   [`migrate-about-leaders.sql`](./migrate-about-leaders.sql) once — it
   updates the About section to the new Governor + Senior Liaison Officer
   leadership layout without touching anything else, and safely preserves
   whatever was already saved there. Safe to run more than once.
3. Create your admin login: in Supabase, go to **Authentication → Users →
   Add user**, and set an email + password for yourself (and anyone else who
   should be able to edit the site). That's the account you'll sign in with
   at `admin.html` — there's no separate site passcode anymore.
4. Deploy the files in this folder anywhere that serves static files (GitHub
   Pages, Netlify, or any web host) — see below.

## Deploying the pages (GitHub Pages)

1. Create a new repository on GitHub.
2. Upload every file in this folder into the repository root (there are no
   subfolders to worry about — drag them all in at once).
3. Commit.
4. Go to **Settings → Pages**. Under **Source**, choose **Deploy from a
   branch**, pick `main` and `/ (root)`, then **Save**.
5. Wait a minute, refresh that page — GitHub will show your live URL, e.g.
   `https://<username>.github.io/<repo>/`.

The site and dashboard work the same wherever the files are hosted — Supabase
holds the actual data, independent of where the pages themselves live.

## Using the admin dashboard

Open `admin.html` on your deployed site, sign in with the email/password you
created in Supabase, and edit away — hero text, About/Mission, the Impact
Ledger, the 13-item Programs register (add/edit/delete/reorder), the Photo
Gallery, Team & Contacts, Partners, the Impact Report CTA, Contact section,
Footer, and Site Identity (logo, favicon, browser tab title).

- **Save changes** writes straight to the database — live for every visitor
  immediately, no extra step.
- **Upload photo** on any image field uploads the real file to Supabase
  Storage and uses it right away.
- **Reload from server** discards any edits you haven't saved yet and pulls
  the current live version back in — handy if you want to back out of changes.
- **Export content.json** downloads the current content as a backup file.
  **Import JSON** loads a backup file back into the editor for review (click
  Save changes afterwards to actually publish it).
- Only accounts you've added in Supabase's Authentication tab can sign in and
  save. Anyone without an account can still view the public site, same as always.

### Adding more admin users
Repeat step 3 above (**Authentication → Users → Add user**) for anyone else
in the office who should be able to edit the site. There's no code change
needed — they just sign in at `admin.html` with their own email/password.

### If you ever need to change hosting or rebuild the frontend
The two values in `supabase-client.js` (the Project URL and the anon/public
key) are all any new frontend needs to connect to the same data — they're
meant to be public and safe to include in client-side code; access control
comes from the database's security rules (Row Level Security), not from
keeping these secret. Never put your `service_role` key (visible on the same
Supabase settings page) into any website code — that one bypasses all
security rules and must stay private.

## Running locally

No build tools needed — just serve the folder over HTTP (opening `index.html`
directly via `file://` won't work, because the browser blocks the network
calls to Supabase).

```bash
python3 -m http.server 8000
# then open http://localhost:8000/index.html and http://localhost:8000/admin.html
```

## Content & credits

Text and photographs are drawn from the Office's own outreach flyers and the
*Impact Beyond Office* documentary report. The full report is linked from the
site's Report section: https://bit.ly/SlocoimpactReport2025
