-- ============================================================
-- SLOCO–YSG — About section upgrade: Governor + Senior Liaison
-- Officer, both under Leadership.
--
-- Run this ONCE in Supabase → SQL Editor if your site was already
-- live before this update (i.e. you already ran supabase-setup.sql
-- previously). It rewrites the "about" section of your existing
-- content row, keeping everything else untouched, and preserves
-- the Senior Liaison Officer's existing real photo/quote.
--
-- Safe to run more than once — it always rebuilds the same result
-- from the current data rather than appending.
-- ============================================================

update site_content
set data = jsonb_set(
  data,
  '{about}',
  (data->'about')
    - 'figure'
    || jsonb_build_object(
      'leadersEyebrow', 'Leadership',
      'leadersHeading', 'Guided from the top, delivered on the ground.',
      'leaders', jsonb_build_array(
        jsonb_build_object(
          'name', 'Hon. (Dr.) Mai Mala Buni',
          'suffix', 'CON',
          'title', 'Executive Governor of Yobe State',
          'image', coalesce(data->'about'->'leaders'->0->>'image', ''),
          'quote', coalesce(data->'about'->'leaders'->0->>'quote', '')
        ),
        jsonb_build_object(
          'name', coalesce(data->'about'->'figure'->>'name', data->'about'->'leaders'->1->>'name'),
          'suffix', coalesce(data->'about'->'figure'->>'suffix', data->'about'->'leaders'->1->>'suffix'),
          'title', coalesce(data->'about'->'figure'->>'role', data->'about'->'leaders'->1->>'title'),
          'image', coalesce(data->'about'->'figure'->>'image', data->'about'->'leaders'->1->>'image'),
          'quote', coalesce(data->'about'->'figure'->>'quote', data->'about'->'leaders'->1->>'quote')
        )
      )
    )
)
where id = 1;

-- Verify it worked — should show 2 leaders, the second one with the
-- Senior Liaison Officer's real name/photo already filled in.
select
  jsonb_pretty(data->'about'->'leaders') as leaders,
  data->'about' ? 'figure' as still_has_old_figure_key
from site_content where id = 1;
