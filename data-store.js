/* ===========================================================
   SLOCO–YSG — data layer
   Used by BOTH the public site (render.js) and the admin
   dashboard (admin.js). All content lives in one row of the
   `site_content` table (see supabase-setup.sql); photos live in
   the `photos` Storage bucket. Reading is open to everyone;
   writing requires a signed-in Supabase Auth session.
=========================================================== */

(function (global) {
  "use strict";

  async function load() {
    var res = await sb.from("site_content").select("data").eq("id", 1).single();
    if (res.error) throw res.error;
    return { data: res.data.data, source: "supabase" };
  }

  async function save(content) {
    var res = await sb.from("site_content").update({ data: content }).eq("id", 1);
    if (res.error) throw res.error;
  }

  async function uploadPhoto(blob, filename, contentType) {
    var path = Date.now() + "-" + Math.random().toString(36).slice(2, 8) + "-" + filename;
    var upRes = await sb.storage.from("photos").upload(path, blob, {
      contentType: contentType,
      upsert: false
    });
    if (upRes.error) throw upRes.error;
    var urlRes = sb.storage.from("photos").getPublicUrl(path);
    return urlRes.data.publicUrl;
  }

  async function signIn(email, password) {
    var res = await sb.auth.signInWithPassword({ email: email, password: password });
    if (res.error) throw res.error;
    return res.data.session;
  }

  async function signOut() {
    await sb.auth.signOut();
  }

  async function getSession() {
    var res = await sb.auth.getSession();
    return res.data.session;
  }

  function onAuthChange(cb) {
    sb.auth.onAuthStateChange(function (event, session) { cb(event, session); });
  }

  function uid(prefix) {
    return (prefix || "id") + "_" + Math.random().toString(36).slice(2, 9);
  }

  global.SlocoStore = {
    load: load,
    save: save,
    uploadPhoto: uploadPhoto,
    signIn: signIn,
    signOut: signOut,
    getSession: getSession,
    onAuthChange: onAuthChange,
    uid: uid
  };
})(window);
