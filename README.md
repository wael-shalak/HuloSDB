# Hulo Supplier Database

A directory of 148 suppliers to Hulo Coop across Lebanon: searchable, mapped,
filterable by ESG/verification status. There are two separate logins:

- **Viewing** the whole site requires signing in with one shared
  email/password account (Hulo staff and partners all use the same one).
- **Editing** (add/edit/delete a supplier) additionally requires
  `wael.chalak1@gmail.com`, signed in with Google. Someone signed in with
  the shared viewer account can browse and search everything but cannot
  write.

This started as a Claude-generated single-file artifact. It's been unpacked
into a normal static site (`index.html` + `assets/`) with Firebase added:
Firestore for the data, a shared Email/Password account gating viewing, and
Google Sign-In for the one editor account.

Nothing here works yet out of the box — one placeholder needs filling in
before it's live. Follow the steps in order.

## 1. Put it on GitHub

1. Go to github.com/new and create a repository (public is fine, e.g.
   `hulo-supplier-database`).
2. On the new repo's page, click "uploading an existing file" (or use
   "Add file → Upload files") and drag in every file and folder from this
   zip, keeping the folder structure (`assets/` and the loose files at the
   top level).
3. Commit directly to `main`.
4. In the repo, go to **Settings → Pages**. Under "Build and deployment",
   set Source to "Deploy from a branch", branch `main`, folder `/ (root)`,
   then Save.
5. GitHub will publish the site at `https://wael-shalak.github.io/<repo-name>/`
   (takes a minute or two the first time). Note this URL — you'll need it
   in step 2 below.

## 2. Finish the Firebase project

1. In the [Firebase console](https://console.firebase.google.com), open
   your project.
2. **Build → Firestore Database → Create database.** Any nearby region is
   fine. Start in production mode (the rules in `firestore.rules` handle
   access control — deploy those in step 3).
3. **Build → Authentication → Sign-in method → Add new provider → Google.**
   Enable it and save. This is the editor account.
4. **Build → Authentication → Sign-in method → Add new provider →
   Email/Password.** Enable it and save. This is the shared login everyone
   uses just to view the site.
5. **Authentication → Users → Add user.** Enter the one shared email and
   password you want staff and partners to use to view the site, and click
   "Add user". This is the only place that password should ever be typed —
   don't put it in this repo or in any chat.
6. **Authentication → Settings → Authorized domains → Add domain.** Add the
   `github.io` domain from step 1 (just the domain, e.g.
   `wael-shalak.github.io` — not the full path).
7. Still in the console, click the gear icon → **Project settings**. Under
   "Your apps", click the web icon (`</>`) to register a web app if you
   haven't already (any nickname is fine, you don't need Firebase Hosting).
   Copy the `firebaseConfig` object it shows you.
8. Open `firebase-config.js` in your new GitHub repo (use GitHub's web
   editor — click the pencil icon on the file) and paste your real values
   over the six `PASTE_YOUR_..._HERE` placeholders. Commit the change.

That config object is safe to commit — it's not a secret, it just tells the
browser which Firebase project to talk to.

## 3. Deploy the security rules

This needs the Firebase CLI, run once from your own computer (not GitHub).
You'll need [Node.js](https://nodejs.org) installed.

```bash
npm install -g firebase-tools
firebase login

# from inside the folder where you downloaded/cloned this repo:
firebase use --add          # pick your Firebase project when prompted
firebase deploy --only firestore:rules
```

## 4. Load the starting data

Open your live GitHub Pages URL. You'll land on the sign-in screen first —
sign in with the shared email/password you created in step 5 above to get
into the site at all. Then go to the "Register" tab and sign in with Google
using `wael.chalak1@gmail.com`. The first time that account signs in, the
site automatically copies the 148 suppliers already in the file into
Firestore (a one-time seed — it checks a flag doc so it won't run twice).
After that, every add/edit/delete you make through the site is saved for
everyone who visits, immediately.

## What changed from the original file

- **Login**: the `test123` passphrase is gone, and there are now two
  separate logins. First, a full-site gate: nobody sees anything — not
  even the directory or map — until they sign in with the one shared
  email/password account. Second, the "Register" tab still shows its own
  "Sign in with Google" button for editing; only `wael.chalak1@gmail.com`
  is treated as signed in for editing purposes. Both are enforced in the
  UI and, more importantly, in `firestore.rules` — so neither can be
  bypassed by editing the page's JavaScript.
- **Data**: previously the 148 suppliers were hardcoded in the page and any
  additions/edits/deletes lived only in that browser tab's memory — a
  refresh discarded them. They now live in Firestore, sync in real time to
  every visitor, and persist.
- **Chat assistant removed**: the original "Ask me anything" box called
  `window.claude.complete(...)`, an API that only exists inside Claude's
  own artifact preview. It wouldn't have worked once deployed, so it's
  been removed rather than shipped broken. The directory's own
  search/filter/⌘K tools cover the same need.

## Files

```
index.html            The site. All markup/styling is unchanged from the
                       original design; only the login panel and the
                       inline data logic changed (see above).
firebase-config.js     Your Firebase project config — fill in step 2.
firestore.rules        Signed-in-only read, owner-only write. Deploy in
                       step 3.
firebase.json          Tells the Firebase CLI where the rules are.
assets/                Vendored JS (the component runtime, Leaflet),
                       fonts, images, and marker icons the original
                       artifact bundle carried inline.
```

## Bulk-loading a spreadsheet of suppliers

`bulk-import.html` is a one-time tool for loading a large batch of suppliers at
once (used to load ~3,559 cleaned rows from a larger spreadsheet). To use it
for a future batch:

1. Upload the file to this repo alongside `index.html` (same folder).
2. Open it at `https://<your-pages-url>/bulk-import.html` and sign in with
   Google using `wael.chalak1@gmail.com` — it uses the same owner check as
   the Register tab, so nobody else can run it.
3. Review the counts shown, then click "Start import". Progress and any
   errors are shown on the page as it runs.
4. Each record writes to a fixed document ID tied to its row number, so
   re-running the same file is safe — it overwrites the same records rather
   than duplicating them.
5. You can delete `bulk-import.html` from the repo afterward, or leave it —
   it can't be triggered by anyone but the owner account either way.

## Costs to be aware of

Firestore and Authentication both have generous free tiers. For a
directory this size (148-ish records, occasional edits, a website's worth
of visitors) you're very unlikely to be charged anything.
